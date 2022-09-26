<script setup lang="ts">
import { computed } from 'vue'

import { formatDatetime } from '@/utils'

import NFTCurrency from '../nft/NFTCurrency.vue'

type TimeType = 'start' | 'end'

interface Props {
  className?: string
  timeType: TimeType
  start: number
  end: number
  price: string | number
  amount?: number
  total?: number
}

const props = defineProps<Props>()
const startDate = computed(() => props.timeType === 'start' && formatDatetime(props.start))
const endDate = computed(() => props.timeType === 'end' && formatDatetime(props.end))
</script>

<template>
  <section class="flex flex-col gap-2px mb-12px text-grey-medium" :class="[className]">
    <p class="font-semibold text-12px leading-16px uppercase">PRICE</p>
    <NFTCurrency className="font-semibold text-32px leading-40px text-white" :price="price" />
    <div
      class="flex flex-row flex-nowrap justify-between items-center font-normal text-14px leading-18px"
    >
      <p v-if="startDate">Available through {{ startDate }}</p>
      <p v-if="endDate">Ends at {{ endDate }}</p>
      <p v-if="amount && total">{{ amount }} / {{ total }} Left</p>
    </div>
  </section>
</template>
