<script setup lang="ts">
import { computed, reactive } from 'vue'

import type { MintPropertyData as PropertyData, MintPropertyMode } from '@/types'
import { arrayGroupByCount } from '@/utils'

import NFTPropertyData from './NFTPropertyData.vue'

interface Props {
  mode: MintPropertyMode
  title: string
  data: PropertyData[]
}

const props = defineProps<Props>()
const groupDataClass = reactive({
  'grid-cols-1': props.mode === 'mode-3',
  'grid-cols-2': props.mode === 'mode-6',
  'grid-cols-3': props.mode === 'mode-9'
})
const groupData = computed(() => {
  return arrayGroupByCount(props.data, 3)
})
</script>

<template>
  <div class="flex flex-col gap-12px xl:gap-36px">
    <h3 class="mt-12px xl:mt-0 uppercase text-rust font-bold text-14px leading-18px">
      {{ title }}
    </h3>
    <div class="grid gap-36px" :class="groupDataClass">
      <div
        class="flex flex-col gap-12px xl:gap-24px"
        v-for="(group, index) in groupData"
        :key="`group-${index}`"
      >
        <NFTPropertyData v-for="(data, index) in group" :data="data" :key="`group-data-${index}`" />
      </div>
    </div>
  </div>
</template>
