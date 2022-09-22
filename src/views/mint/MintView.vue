<script setup lang="ts">
import PageMain from '@components/layout/PageMain.vue'
import NFTBanner from '@components/mint/NFTBanner.vue'
import NFTDisclaimer from '@components/mint/NFTDisclaimer.vue'
import NFTIntroCard from '@components/mint/NFTIntroCard.vue'
import NFTPropertyCard from '@components/mint/NFTPropertyCard.vue'
import NFTSaleCard from '@components/mint/NFTSaleCard.vue'
import NFTMintModal, { type NFTModalData } from '@components/modal/NFTMintModal.vue'
import { ref, watchEffect } from 'vue'

import { getMintInfo } from '@/api'
import type { Mint } from '@/types'

const initData: Mint = {
  information: { images: [], type: '', name: '', content: '' },
  disclaimer: { images: [], content: '' },
  publicSale: { start: 0, text: '', link: '' },
  editions: [],
  introduction: [],
  properties: []
}
const nftData = ref<Mint>(initData)
const modalOpen = ref(false)
const modalData = ref<NFTModalData>({
  name: '',
  images: '',
  address: '',
  transaction: ''
})
const handleModalOpen = (data?: NFTModalData) => {
  if (!data) return
  modalData.value = { ...data }
  modalOpen.value = true
}
const handleModalClose = () => {
  modalOpen.value = false
}

watchEffect(async () => {
  nftData.value = await getMintInfo()
})
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
          :editions="nftData.editions"
          @onMintComplete="handleModalOpen"
        />
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
