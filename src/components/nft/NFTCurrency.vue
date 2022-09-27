<script setup lang="ts">
interface Props {
  className?: string
  textClass?: string
  price: string | number
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center">
    <span class="mr-6px" :class="[className]">&#926;</span>
    <span v-bind:class="[className, textClass]">{{ price }}</span>
  </div>
</template>
