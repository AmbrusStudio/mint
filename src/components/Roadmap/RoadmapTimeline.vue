<script setup lang="ts">
import IconRoadmapClose from '@components/icons/IconRoadmapClose.vue'
import { onKeyStroke } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useRoadmapStore } from '@/stores/roadmap'

import RoadmapWrapper from './RoadmapWrapper.vue'

const store = useRoadmapStore()
const { visible } = storeToRefs(store)
const { toggleVisible } = store

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  visible.value && toggleVisible(false)
})
</script>

<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 bg-black/80 z-100 overflow-hidden" v-if="visible">
    <IconRoadmapClose
      class="absolute right-[24px] md:right-[60px] top-[24px] md:top-[60px] cursor-pointer z-101"
      @click="toggleVisible(!visible)"
    />
    <div class="w-full h-full overflow-auto">
      <RoadmapWrapper />
    </div>
  </div>
</template>
