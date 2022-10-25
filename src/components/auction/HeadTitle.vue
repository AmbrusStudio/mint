<script setup lang="ts">
import type { Auction } from '@/types/auction'

interface Props {
  auction: Auction
}

defineProps<Props>()

/// opens roadmap(undone)

const handleOpenRoadmap = () => {
      window.open('')
    }
</script>

<template>
  <div class="max-w-1332px p-x-9 mx-auto">
    <section>
      <div
        class="rotating-box-roadmap"
        @click="handleOpenRoadmap()"
      >
        <div></div>
      </div>
  </section>
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

<style lang="less" scoped>
.rotating-box-roadmap {
  position: fixed;
  right: 8.8rem;
  bottom: 36.5rem;
  width: 12.4rem;
  height: 12.4rem;
  background-size: 5.2rem 5.2rem;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 2;
  div {
    animation: circle infinite 5s linear;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    width: 12.4rem;
    height: 12.4rem;
  }
  &:hover {
    width: 12.4rem;
    height: 12.4rem;
    background-size: 5.2rem 5.2rem;
    background-position: center;
    background-repeat: no-repeat;
    div {
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      width: 12.4rem;
      height: 12.4rem;
    }
  }
}

.rotating-box-roadmap {
  background-image: url(@/assets/images/play-mint-now-icon.png);
  div {
    background-image: url(@/assets/images/play-roadmap-text.png);
  }
  &:hover {
    background-image: url(@/assets/images/play-mint-now-icon-hover.png);
    div {
      background-image: url(@/assets/images/play-roadmap-text-hover.png);
    }
  }
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

</style>
