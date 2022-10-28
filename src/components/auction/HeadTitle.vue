<script setup lang="ts">
import type { Auction } from '@/types/auction'

interface Props {
  auction: Auction
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-1332px p-x-9 mx-auto">
    <h2
      class="text-base md:text-2xl uppercase text-white leading-20px md:leading-29px mt-15 not-italic"
    >
      {{ auction.subtitle }}
      <span class="font-bold uppercase text-rust block md:inline">{{ auction.subtitleFocus }}</span>
    </h2>
    <h1
      class="text-4xl md:text-5xl font-bold uppercase text-white leading-44px md:leading-59px mt-1 mb-6 md:mb-3 not-italic"
    >
      {{ auction.title }}
    </h1>
    <div class="w-40 h-2 bg-gradient-to-r from-red_1 to-rust"></div>
  </div>
</template>
