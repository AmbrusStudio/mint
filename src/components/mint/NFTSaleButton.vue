<script setup lang="ts">
interface Props {
  className?: string
  disabled?: boolean
}
interface Emits {
  (e: 'click', payload: MouseEvent): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
const handleButtonClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button
    class="w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust disabled:bg-grey-medium disabled:text-white disabled:hover:text-white"
    :class="[className]"
    :disabled="disabled"
    @click.stop.prevent="handleButtonClick"
  >
    <slot />
  </button>
</template>
