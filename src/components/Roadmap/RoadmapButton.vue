<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRoadmapStore } from '@/stores/roadmap'
import type { RoadmapPlacement } from '@/types/components'

const store = useRoadmapStore()
const { visible } = storeToRefs(store)
const { toggleVisible } = store

interface Props {
  placement: RoadmapPlacement
}

defineProps<Props>()
</script>

<template>
  <div :class="['rotating-box roadmap cursor-pointer', placement]" @click="toggleVisible(!visible)">
    <div></div>
  </div>
</template>

<style lang="less" scoped>
.rotating-box {
  position: fixed;
  width: 160px;
  height: 160px;
  background-size: 68px 68px;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
  div {
    width: 160px;
    height: 160px;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    animation: circle infinite 5s linear;
  }
}

.rotating-box.top-left {
  left: 36px;
  top: 104px;
  @media (min-width: 768px) {
    left: 60px;
    top: 128px;
  }
  @media (min-width: 1280px) {
    top: 160px;
  }
}
.rotating-box.top-right {
  right: 36px;
  top: 104px;
  @media (min-width: 768px) {
    right: 60px;
    top: 128px;
  }
  @media (min-width: 1280px) {
    top: 160px;
  }
}
.rotating-box.bottom-left {
  left: 36px;
  bottom: 36px;
  @media (min-width: 768px) {
    left: 88px;
    bottom: 88px;
  }
}
.rotating-box.bottom-right {
  right: 36px;
  bottom: 36px;
  @media (min-width: 768px) {
    right: 88px;
    bottom: 88px;
  }
}

.rotating-box.roadmap {
  // background-image: url(@/assets/images/play-mint-now-icon.png);
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
