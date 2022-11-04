<script setup lang="ts">
import IconClose from '@components/icons/IconClose.vue'

import BaseModal from './BaseModal.vue'

interface Props {
  open: boolean
  disabled?: boolean
}

interface Emits {
  (e: 'onModalClose'): void
  (e: 'onConnectClick'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleModalClose = () => {
  if (!props.open) return
  emit('onModalClose')
}

const handleConnectClick = () => {
  emit('onConnectClick')
}
</script>

<template>
  <BaseModal
    id="connect-imx-modal"
    :open="open"
    modalMainClass="h-full xl:h-auto"
    modalContentClass="h-full"
  >
    <div class="flex flex-col drop-shadow-nft-modal w-full h-full xl:w-600px xl:mx-auto">
      <div
        class="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80"
      >
        <h4 class="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">
          Connecting IMX
        </h4>
        <IconClose
          class="w-16px h-16px xl:w-30px xl:h-30px cursor-pointer"
          @click.stop.prevent="handleModalClose"
        />
      </div>
      <div class="flex-1 bg-white/80">
        <div class="flex flex-col backdrop-blur-10px h-full p-24px xl:p-36px gap-24px">
          <p class="font-medium text-16px leading-30px text-tips">
            E4C is built on ImmutableX, one of the largest blockchains for Web3 games. When
            connecting to your ETH wallet, you will also be connecting to IMX. This process is
            secure, simple and free.
          </p>
          <button
            type="button"
            class="box-border uppercase w-full px-24px py-20px font-semibold text-16px leading-20px text-center disabled:!bg-grey-medium disabled:text-white disabled:hover:!bg-grey-medium disabled:hover:text-white disabled:cursor-not-allowed !bg-rust text-white hover:!bg-rust/85"
            :disabled="disabled"
            @click.stop.prevent="handleConnectClick"
          >
            Connect to IMX
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
