<script setup lang="ts">
interface Props {
  className?: string
}

defineProps<Props>()
</script>

<template>
  <div class="font-bold text-16px leading-30px truncate" :class="[className]">
    <slot />
  </div>
</template>
