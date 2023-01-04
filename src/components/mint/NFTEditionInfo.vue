<script setup lang="ts">
import { computed } from 'vue'

import { formatDatetime } from '@/utils'

// import NFTCurrency from '../nft/NFTCurrency.vue'

type TimeType = 'start' | 'end' | 'unlimited'

interface Props {
  className?: string
  timeType: TimeType
  start: number
  end: number
  price: string | number
  basePrice?: string | number
  discount?: number
  sold?: number
  total?: number
}

const props = defineProps<Props>()
const startDate = computed(() => props.timeType === 'start' && formatDatetime(props.start, 'DDD'))
const endDate = computed(() => props.timeType === 'end' && formatDatetime(props.end))
</script>

<template>
  <section class="flex flex-col gap-2px mb-12px text-grey-medium" :class="[className]">
    <!-- <p class="font-semibold text-12px leading-16px uppercase">PRICE</p>
    <div class="flex flex-row flex-nowrap items-baseline">
      <NFTCurrency className="font-semibold text-32px leading-40px text-white" :price="price" />
      <NFTCurrency
        v-if="basePrice && discount && discount > 0"
        className="font-normal text-16px leading-20px text-grey-medium ml-12px"
        textClass="line-through"
        :price="basePrice || 0"
      />
    </div> -->
    <div
      class="flex flex-row flex-nowrap justify-between items-center font-normal text-14px leading-18px"
    >
      <p v-if="timeType === 'unlimited'">Available until sold out</p>
      <p v-if="startDate">Available from {{ startDate }}</p>
      <p v-if="endDate">Ends at {{ endDate }}</p>
      <p v-if="typeof sold === 'number' && typeof total === 'number'">
        {{ sold }} / {{ total }} Sold
      </p>
    </div>
  </section>
</template>
