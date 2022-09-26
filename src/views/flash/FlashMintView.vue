<script setup lang="ts">
import PageMain from '@components/layout/PageMain.vue'
import NFTBanner from '@components/mint/NFTBanner.vue'
import NFTDisclaimer from '@components/mint/NFTDisclaimer.vue'
import NFTEditionInfo from '@components/mint/NFTEditionInfo.vue'
import NFTEditionRadio from '@components/mint/NFTEditionRadio.vue'
import NFTIntroCard from '@components/mint/NFTIntroCard.vue'
import NFTPropertyCard from '@components/mint/NFTPropertyCard.vue'
import NFTSaleButton from '@components/mint/NFTSaleButton.vue'
import NFTSaleCard from '@components/mint/NFTSaleCard.vue'
import NFTMintModal from '@components/modal/NFTMintModal.vue'
import { computed, ref, watch, watchEffect } from 'vue'

import { getFlashMintInfo, getWhitelistSignature } from '@/api'
import type { AmbrusStudioSaler } from '@/contracts'
import { initialMint } from '@/data'
import { useNFTModal, useSalerContract, useSalerData, useWallet } from '@/hooks'
import type { Mint } from '@/types'
import { alertErrorMessage } from '@/utils'

const { account, ethereum, connect } = useWallet()
const { modalOpen, modalData, openNFTModal, closeNFTModal } = useNFTModal()

const nftData = ref<Mint>(initialMint)
const edition = ref<string>('')
const salerContract = ref<AmbrusStudioSaler>()
const nftAddress = ref<string>('')
const isMinting = ref(false)

const saleStart = computed(() => isWhitelistSaleStart() || isPublicSaleStart())
const disabled = computed(
  () =>
    !(
      nftData.value.editions.length &&
      edition.value &&
      salerContract.value &&
      amount.value &&
      saleStart.value
    )
)
const buttonText = computed(() => {
  if (!nftData.value.editions.length) return 'Coming Soon'
  if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!amount.value) return 'Sold Out'
  if (isWhitelistSaleStart()) return 'Whitelist Mint'
  if (isPublicSaleStart()) return 'Mint Now'
  return 'Coming Soon'
})

const { price, amount, startTime, isWhitelistSaleStart, isPublicSaleStart } =
  useSalerData(salerContract)

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
const handleWalletConnect = async () => {
  await connect()
}
const handleModalClose = () => {
  closeNFTModal()
}

watchEffect(async () => {
  nftData.value = await getFlashMintInfo()
})

watch(account, () => {
  if (Array.isArray(nftData.value.editions) && nftData.value.editions.length) {
    const selected = nftData.value.editions[0]
    edition.value = selected.value
  }
})

watch(
  edition,
  (value: string) => {
    const selected = nftData.value.editions.find((e) => e.value === value)
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
  <PageMain>
    <div
      class="grid grid-cols-1 xl:grid-cols-2 xl:gap-y-36px xl:pt-60px pb-100px xl:pb-114px xl:relative"
    >
      <NFTBanner className="xl:col-span-2" :images="nftData.information.images" />
      <NFTDisclaimer
        className="hidden xl:flex"
        :images="nftData.disclaimer.images"
        :content="nftData.disclaimer.content"
      />
      <div class="grid grid-cols-1 xl:gap-y-36px xl:w-540px xl:-mt-480px xl:ml-56px">
        <NFTSaleCard
          :info="nftData.information"
          :publicSale="nftData.publicSale"
          :editions="nftData.editions"
        >
          <form class="flex flex-col" action="#">
            <section
              class="flex flex-col gap-12px mb-24px xl:mb-36px"
              v-if="nftData.editions.length"
            >
              <NFTEditionRadio
                v-for="edi in nftData.editions"
                :key="`edition-radio-${edi.value}`"
                :id="`edition-radio-${edi.value}`"
                :name="edi.name"
                :value="edi.value"
                :contract="edi.contract"
                :style="edi.style"
                v-model:edition="edition"
              />
            </section>
            <NFTEditionInfo
              v-if="!disabled"
              timeType="end"
              :start="startTime"
              :end="startTime"
              :price="price"
            />
            <NFTSaleButton
              @click.stop.prevent="handleMintClick"
              :disabled="disabled || isMinting"
              v-if="!nftData.editions.length || account"
            >
              {{ buttonText }}
            </NFTSaleButton>
            <NFTSaleButton @click.stop.prevent="handleWalletConnect" v-else>
              Connect Wallet
            </NFTSaleButton>
          </form>
        </NFTSaleCard>
        <NFTDisclaimer
          className="xl:hidden"
          :images="nftData.disclaimer.images"
          :content="nftData.disclaimer.content"
        />
        <NFTIntroCard class="m-24px xl:m-0" :intros="nftData.introduction" />
        <NFTPropertyCard class="mx-24px xl:m-0" :properties="nftData.properties" />
      </div>
    </div>
    <NFTMintModal
      :open="modalOpen"
      :onModalClose="handleModalClose"
      :images="modalData.images"
      :video="modalData.video"
      :name="modalData.name"
      :address="modalData.address"
      :transaction="modalData.transaction"
    />
  </PageMain>
</template>
