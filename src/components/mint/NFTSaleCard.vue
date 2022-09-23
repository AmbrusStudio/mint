<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { getWhitelistSignature } from '@/api'
import type { AmbrusStudioSaler } from '@/contracts'
import { useNFTModal, useSalerContract, useSalerData, useWallet } from '@/hooks'
import type { MintEdition, MintInfo, MintPublicSale } from '@/types'
import { alertErrorMessage, formatDatetime, isHistorical } from '@/utils'

import HTMLView from '../html/HTMLView.vue'
import ExternalLink from '../link/ExternalLink.vue'
import NFTCurrency from '../nft/NFTCurrency.vue'
import NFTEditionRadio from './NFTEditionRadio.vue'

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
const { price, amount, total, startTime, isWhitelistSaleStart, isPublicSaleStart } =
  useSalerData(salerContract)
const edition = ref<string>('')
const isMinting = ref(false)
const nftAddress = ref<string>('')
const connected = computed(() => isConnected())
const selectedDate = computed(() => formatDatetime(startTime.value))
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
    <section class="flex flex-col gap-4px mb-24px xl:mb-36px">
      <h4 class="uppercase text-rust font-semibold text-14px leading-18px">{{ info.type }}</h4>
      <h3 class="text-white font-semibold text-20px leading-24px">{{ info.name }}</h3>
      <HTMLView class="text-white font-medium text-14px leading-24px" :src="info.content" />
    </section>
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
          v-model="edition"
        />
      </div>
      <div class="flex flex-col gap-2px mb-12px text-grey-medium" v-if="!disabled">
        <p class="font-semibold text-12px leading-16px uppercase">PRICE</p>
        <NFTCurrency className="font-semibold text-32px leading-40px text-white" :price="price" />
        <div
          class="flex flex-row flex-nowrap justify-between items-center font-normal text-14px leading-18px"
        >
          <p>Available through {{ selectedDate }}</p>
          <p>{{ amount }} / {{ total }} Left</p>
        </div>
      </div>
      <button
        class="w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust disabled:bg-grey-medium disabled:text-white disabled:hover:text-white"
        :disabled="disabled || isMinting"
        @click.stop.prevent="handleMintClick"
        v-if="!props.editions.length || connected"
      >
        {{ buttonText }}
      </button>
      <button
        class="w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust disabled:bg-grey-medium disabled:text-white disabled:hover:text-white"
        @click.stop.prevent="handleWalletConnect"
        v-else
      >
        Connect Wallet
      </button>
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
