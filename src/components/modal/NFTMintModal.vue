<script setup lang="ts">
import IconClose from '@components/icons/IconClose.vue'
import { computed } from 'vue'

import { ExplorerDataType, getExplorerLink, getImageSet, getIMXMarketInventoryLink } from '@/utils'

import BaseModal from './BaseModal.vue'
import NFTMintModalTrait from './NFTMintModalTrait.vue'

export type NFTModalData = {
  name: string
  tokenId: string | number
  address: string
  // transaction: string
  images: string | string[]
  video?: string
}

interface Props {
  open: boolean
  data: NFTModalData
  onModalClose: () => void
}

const props = defineProps<Props>()
const image = computed(() => {
  if (Array.isArray(props.data.images)) return props.data.images[0]
  return props.data.images
})
const imageSet = computed(() => {
  if (Array.isArray(props.data.images)) return getImageSet(props.data.images)
  return undefined
})
const addressLink = computed(() => getExplorerLink(props.data.address, ExplorerDataType.ADDRESS))
// const transactionLink = computed(() =>
//   getExplorerLink(props.data.transaction, ExplorerDataType.TRANSACTION)
// )
const imxMarketLink = computed(() =>
  getIMXMarketInventoryLink(props.data.address, props.data.tokenId)
)
</script>

<template>
  <BaseModal id="nft-mint-modal" :open="open">
    <div class="flex flex-col drop-shadow-nft-modal w-full xl:w-1264px xl:mx-auto">
      <div
        class="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80"
      >
        <h4 class="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">
          Minting Complete!
        </h4>
        <IconClose
          class="w-16px h-16px xl:w-30px xl:h-30px cursor-pointer"
          @click.stop.prevent="onModalClose"
        />
      </div>
      <div class="flex flex-col xl:flex-row xl:flex-nowrap xl:justify-between bg-white/80">
        <video
          v-if="data.video"
          class="box-border w-full h-auto xl:w-600px xl:h-600px border-4px border-white/90 select-none"
          id="background-video"
          autoplay
          loop
          muted
          disablepictureinpicture
          disableRemotePlayback
          preload="auto"
          oncontextmenu="return false;"
          :poster="image"
        >
          <source :src="data.video" type="video/mp4" />
        </video>
        <img
          v-else
          class="box-border w-full h-auto xl:w-600px xl:h-600px border-4px border-white/90 select-none"
          :src="image"
          :srcset="imageSet"
          alt="NFT Image"
          loading="lazy"
          oncontextmenu="return false;"
        />
        <div class="flex flex-col flex-1 gap-12px xl:gap-24px p-24px xl:p-36px backdrop-blur-20px">
          <NFTMintModalTrait title="NFT ID">{{ data.name }} #{{ data.tokenId }}</NFTMintModalTrait>
          <NFTMintModalTrait title="Smart Contract Address" :link="addressLink">
            {{ data.address }}
          </NFTMintModalTrait>
          <!-- <NFTMintModalTrait title="Transaction Hash" :link="transactionLink">
            {{ data.transaction }}
          </NFTMintModalTrait> -->
          <NFTMintModalTrait title="Immutable X Marketplace" :link="imxMarketLink">
            Click to view {{ data.name }} #{{ data.tokenId }} on Immutable X Marketplace
          </NFTMintModalTrait>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
