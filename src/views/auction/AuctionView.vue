<script setup lang="ts">
import HeadTitle from '@components/auction/HeadTitle.vue'
import { ref, watchEffect } from 'vue'

import AuctionDetail from '@/components/auction/AuctionDetail.vue'
import SlideshowCard from '@/components/auction/SlideshowCard.vue'
import RoadmapButton from '@/components/Roadmap/RoadmapButton.vue'
import { auction } from '@/data/auction'
import type { Auction } from '@/types/auction'

const auctionData = ref<Auction>()

watchEffect(() => {
  auctionData.value = auction
})
</script>

<template>
  <main id="main" class="pt-68px xl:pt-100px bg-black-bg bg-cover bg-top bg-repeat-y">
    <template v-if="auctionData">
      <HeadTitle :auction="auctionData" />
      <SlideshowCard :auctionImages="auctionData.images" />
      <AuctionDetail :auction="auctionData" />
    </template>
    <RoadmapButton placement="top-right" />
  </main>
</template>

<style scoped>
#main {
  background-image: url('~@/assets/images/bg/bg-page.png');
  background-image: image-set(
    url('~@/assets/images/bg/bg-page.png') 1x,
    url('~@/assets/images/bg/bg-page@2x.png') 2x,
    url('~@/assets/images/bg/bg-page@3x.png') 3x
  );
}
</style>
