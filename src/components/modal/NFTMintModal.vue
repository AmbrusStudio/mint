<script setup lang="ts">
import { computed } from 'vue'
import { getImageSet } from '@/utils'
import IconClose from '@components/icons/IconClose.vue'
import BaseModal from './BaseModal.vue'
import NFTMintModalTrait from './NFTMintModalTrait.vue'

export type NFTModalData = {
  images: string | string[]
  name: string
  address: string
  transaction: string
}

interface Props {
  open: boolean
  images: string | string[]
  name: string
  address: string
  transaction: string
  onModalClose: () => void
}

const props = defineProps<Props>()
const image = computed(() => {
  if (Array.isArray(props.images)) return props.images[0]
  return props.images
})
const imageSet = computed(() => {
  if (Array.isArray(props.images)) return getImageSet(props.images)
  return undefined
})
</script>

<template>
  <BaseModal :open="open">
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
        <img
          class="box-border w-full h-auto xl:w-600px xl:h-600px border-4px border-white/90"
          :src="image"
          :srcset="imageSet"
          alt="NFT Image"
          loading="lazy"
        />
        <div class="flex flex-col flex-1 gap-12px xl:gap-24px p-24px xl:p-36px backdrop-blur-20px">
          <NFTMintModalTrait title="NFT ID">{{ name }}</NFTMintModalTrait>
          <NFTMintModalTrait title="Smart Contract Address">{{ address }}</NFTMintModalTrait>
          <NFTMintModalTrait title="Transaction Hash">{{ transaction }}</NFTMintModalTrait>
        </div>
      </div>
    </div>
  </BaseModal>
</template>