<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { getWhitelistSignature } from '@/api'
import type { AmbrusStudioSaler } from '@/contracts'
import { useNFTModal, useSalerContract, useSalerData, useWallet } from '@/hooks'
import type { MintEdition, MintInfo, MintPublicSale } from '@/types'
import { alertErrorMessage, isHistorical } from '@/utils'

import HTMLView from '../html/HTMLView.vue'
import ExternalLink from '../link/ExternalLink.vue'
import NFTEditionInfo from './NFTEditionInfo.vue'
import NFTEditionRadio from './NFTEditionRadio.vue'
import NFTInformation from './NFTInformation.vue'
import NFTSaleButton from './NFTSaleButton.vue'

interface Props {
  className?: string
  info: MintInfo
  publicSale: MintPublicSale
  editions: MintEdition[]
}

const props = defineProps<Props>()

const { account, ethereum, connect, isConnected } = useWallet()
const { openNFTModal } = useNFTModal()

const publicSaleStart = computed(
  () => props.publicSale?.start && isHistorical(props.publicSale.start)
)

const salerContract = ref<AmbrusStudioSaler>()
const { price, amount, startTime, isWhitelistSaleStart, isPublicSaleStart } =
  useSalerData(salerContract)
const edition = ref<string>('')
const isMinting = ref(false)
const nftAddress = ref<string>('')
const connected = computed(() => isConnected())
const saleStart = computed(() => isWhitelistSaleStart() || isPublicSaleStart())
const disabled = computed(
  () =>
    !(
      props.editions.length &&
      edition.value &&
      salerContract.value &&
      amount.value &&
      saleStart.value
    )
)
const buttonText = computed(() => {
  if (!props.editions.length) return 'Coming Soon'
  if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!amount.value) return 'Sold Out'
  if (isWhitelistSaleStart()) return 'Whitelist Mint'
  if (isPublicSaleStart()) return 'Mint Now'
  return 'Coming Soon'
})

const handleMintClick = async () => {
  if (!salerContract.value) return
  try {
    isMinting.value = true

    const price = await salerContract.value.price()
    const _nftAddress = nftAddress.value

    if (isWhitelistSaleStart()) {
      if (!account.value) return
      const signature = await getWhitelistSignature(account.value)
      const tx = await salerContract.value.whitelistSale(signature, { value: price })
      await openNFTModal(_nftAddress, tx)
    }
    if (isPublicSaleStart()) {
      const tx = await salerContract.value.publicSale({ value: price })
      await openNFTModal(_nftAddress, tx)
    }
  } catch (error) {
    alertErrorMessage('Mint faild', error)
  } finally {
    isMinting.value = false
  }
}
const handleWalletConnect = () => {
  connect()
}

watch(
  edition,
  async (value: string) => {
    const selected = props.editions.find((e) => e.value === value)
    if (!selected) return
    const _salerContract = useSalerContract(ethereum, selected.contract)
    if (_salerContract.value) {
      salerContract.value = _salerContract.value
      nftAddress.value = selected.nftContract
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="p-24px xl:p-36px bg-black/80 shadow-nft-sale backdrop-blur-20px" :class="[className]">
    <NFTInformation :info="info" />
    <form class="flex flex-col" action="#" v-if="!publicSaleStart">
      <div class="flex flex-col gap-12px mb-24px xl:mb-36px" v-if="editions.length">
        <NFTEditionRadio
          v-for="edi in editions"
          :key="`edition-radio-${edi.value}`"
          :id="`edition-radio-${edi.value}`"
          :name="edi.name"
          :value="edi.value"
          :contract="edi.contract"
          :style="edi.style"
          v-model:edition="edition"
        />
      </div>
      <NFTEditionInfo
        v-if="!disabled"
        timeType="start"
        :start="startTime"
        :end="startTime"
        :price="price"
      />
      <NFTSaleButton
        @click.stop.prevent="handleMintClick"
        :disabled="disabled || isMinting"
        v-if="!props.editions.length || connected"
      >
        {{ buttonText }}
      </NFTSaleButton>
      <NFTSaleButton @click.stop.prevent="handleWalletConnect" v-else>
        Connect Wallet
      </NFTSaleButton>
      <HTMLView
        v-if="!!info.note"
        class="text-white font-bold text-14px leading-20px mt-24px"
        :src="info.note"
      />
    </form>
    <ExternalLink
      class="block w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust"
      :to="publicSale.link"
      v-if="publicSaleStart"
    >
      {{ publicSale.text }}
    </ExternalLink>
  </div>
</template>
