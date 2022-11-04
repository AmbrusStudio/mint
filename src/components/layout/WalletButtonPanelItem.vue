<script setup lang="ts">
interface Props {
  className?: string
}

defineProps<Props>()
</script>

<template>
  <button
    class="flex flex-row flex-nowrap items-center box-border px-12px py-12px hover:bg-white/10"
    :class="[className]"
  >
    <slot />
  </button>
</template>
