<script setup lang="ts">
import IconFaceHappy from '@components/icons/IconFaceHappy.vue'
import IconFaceStar from '@components/icons/IconFaceStar.vue'
import { computed, ref, watchEffect } from 'vue'

import { getMintAccessModalInfo } from '@/api'
import type { MintAccessModal, MintAccessModalData } from '@/types'

import BaseModal from './BaseModal.vue'
import MintAccessModalEdition from './MintAccessModalEdition.vue'

export type NFTModalData = {
  name: string
  address: string
  transaction: string
  images: string | string[]
  video?: string
}

interface Props {
  open: boolean
  permit: boolean
  whitelist: boolean
  onModalClose: () => void
}

const props = defineProps<Props>()

const modalInfo = ref<MintAccessModal>()

watchEffect(async () => {
  const data = await getMintAccessModalInfo()
  modalInfo.value = data
})

const modalData = computed<MintAccessModalData | undefined>(() => {
  if (!modalInfo.value) return undefined
  else if (props.permit) return modalInfo.value.permit
  else if (!props.permit && props.whitelist) return modalInfo.value.whitelist
  else return modalInfo.value.public
})
</script>

<template>
  <BaseModal
    :open="open"
    v-if="modalData"
    modalMainClass="h-full xl:h-auto"
    modalContentClass="h-full"
  >
    <div class="flex flex-col drop-shadow-nft-modal w-full h-full xl:w-720px xl:mx-auto">
      <div
        class="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80"
      >
        <h4 class="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">
          {{ modalData.title }}
        </h4>
      </div>
      <div class="flex-1 bg-white/80">
        <div class="flex flex-col backdrop-blur-10px h-full xl:px-96px xl:pt-48px xl:pb-36px">
          <div class="flex flex-col flex-1 justify-center items-center px-24px xl:px-0">
            <IconFaceHappy class="mb-48px" v-if="modalData.face === 'happy'" />
            <IconFaceStar class="mb-48px" v-if="modalData.face === 'star'" />
            <p
              class="text-16px leading-30px text-center mb-8px"
              :class="{
                'font-normal text-black-bg': modalData.face === 'happy',
                'font-semibold text-black uppercase': modalData.face === 'star'
              }"
            >
              {{ modalData.subtitle }}
            </p>
            <div class="flex flex-col gap-10px mb-26px">
              <MintAccessModalEdition
                labelClass="bg-#FFB600"
                name="Gold Edition"
                :time="modalData.time.gold"
              />
              <MintAccessModalEdition
                labelClass="bg-#7024C4"
                name="Rangers Edition"
                :time="modalData.time.rangers"
              />
            </div>
          </div>
          <button
            class="w-full py-20px bg-rust text-white font-semibold text-16px leading-20px text-center uppercase hover:bg-rust/90 disabled:bg-grey-medium disabled:text-white disabled:hover:text-white"
            @click.stop="onModalClose"
          >
            Gotcha!
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
