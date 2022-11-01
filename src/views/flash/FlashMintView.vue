<script setup lang="ts">
import PageMain from '@components/layout/PageMain.vue'
import IMXWalletPopover from '@components/mint/IMXWalletPopover.vue'
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

import { getFlashMintInfo } from '@/api'
import { initialMint } from '@/data'
import { useNFTModal, useReadonlySalerData, useSalerContract, useWeb3Wallet } from '@/hooks'
import type { Mint, MintEdition, MintEditionValue } from '@/types'
import { alertErrorMessage } from '@/utils'

const { ethereum, connect, isConnected } = useWeb3Wallet()
const { modalOpen, modalData, openNFTModal, closeNFTModal } = useNFTModal()

const nftData = ref<Mint>(initialMint)
const edition = ref<MintEditionValue>()
const selected = ref<MintEdition>()
const salerAddress = ref<string>('')
const isMinting = ref(false)

const salerContract = useSalerContract(ethereum, salerAddress)
const { amount, isSaleStart, isSaleEnd, getSaleData } = useReadonlySalerData(salerAddress)

const flashStart = isSaleStart('flash')
const flashEnd = isSaleEnd('flash')
const flashData = getSaleData('flash')

const canFlash = computed(() => flashStart.value && !flashEnd.value)

const connected = computed(() => isConnected())
const disabled = computed(
  () =>
    !(
      nftData.value.editions.length &&
      edition.value &&
      salerContract.value &&
      amount.value &&
      connected.value
    )
)
const buttonText = computed(() => {
  if (!nftData.value.editions.length) return 'Coming Soon'
  if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!amount.value) return 'Sold Out'
  if (canFlash.value) return 'Mint Now'
  return 'Coming Soon'
})

const handleMintClick = async () => {
  if (!salerContract.value) return
  try {
    isMinting.value = true
    if (canFlash.value) {
      const price = await salerContract.value.flashSalePrice()
      const nftAddress = await salerContract.value.nft()
      const tx = await salerContract.value.flashSale({ value: price })
      await openNFTModal(nftAddress, tx)
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
  const data = await getFlashMintInfo()
  nftData.value = data
  if (Array.isArray(data.editions)) {
    edition.value = data.editions[0]?.value
  }
})

watch(
  edition,
  (value) => {
    const _selected = nftData.value.editions.find((e) => e.value === value)
    if (!_selected) return
    selected.value = _selected
    salerAddress.value = _selected.contract
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
        <NFTSaleCard :info="nftData.information" :editions="nftData.editions">
          <form class="flex flex-col" action="#">
            <section
              class="flex flex-col gap-12px mb-24px xl:mb-36px"
              v-if="nftData.editions.length"
            >
              <NFTEditionRadio
                v-for="edi in nftData.editions"
                :key="`edition-radio-${edi.value}`"
                :data="edi"
                :price="flashData.price"
                v-model:edition="edition"
              />
            </section>
            <NFTEditionInfo
              v-if="canFlash"
              timeType="end"
              :start="flashData.start"
              :end="flashData.end"
              :price="flashData.price"
            />
            <NFTSaleButton
              @click.stop.prevent="handleMintClick"
              :disabled="disabled || isMinting"
              v-if="connected"
            >
              {{ buttonText }}
            </NFTSaleButton>
            <IMXWalletPopover disabled v-else>
              <NFTSaleButton @click.stop.prevent="handleWalletConnect">
                Connect Wallet
              </NFTSaleButton>
            </IMXWalletPopover>
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
