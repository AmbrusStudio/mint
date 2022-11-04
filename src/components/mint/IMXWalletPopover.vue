<script setup lang="ts">
import { Popover, PopoverPanel } from '@headlessui/vue'
import { ref } from 'vue'

interface Props {
  disabled?: boolean
}

const props = defineProps<Props>()

const open = ref(false)
const handleMouseEnter = () => {
  if (props.disabled) return
  open.value = true
}
const handleMouseLeave = () => {
  if (props.disabled) return
  open.value = false
}
</script>

<template>
  <Popover class="relative w-full">
    <div
      class="flex flex-row flex-nowrap items-center"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
    <PopoverPanel class="absolute z-10 bottom-full w-full" static v-if="open">
      <div class="flex flex-col justify-center items-center drop-shadow-wallet-popover">
        <div
          class="p-24px box-border rounded-12px font-medium text-14px leading-24px bg-black/80 text-white max-w-500px backdrop-blur-6px"
        >
          E4C is built on ImmutableX, one of the largest blockchains for Web3 games. When connecting
          to your ETH wallet, you will also be connecting to IMX.
          <br />
          This process is secure, simple and free.
        </div>
        <div
          class="mb-4px w-0 h-0 border-solid border-x-8px border-t-6px border-x-transparent border-t-black/80"
        />
      </div>
    </PopoverPanel>
  </Popover>
</template>
