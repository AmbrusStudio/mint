<script setup lang="ts">
import type { MintPropertyData } from '@/types'

interface Props {
  data: MintPropertyData
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-0 xl:gap-4px">
    <h6
      class="uppercase text-#F0F0F0 font-normal text-10px xl:text-12px leading-12px xl:leading-16px"
    >
      {{ data.key }}
    </h6>
    <p class="text-white font-bold text-14px xl:text-16px leading-17px xl:leading-20px">
      {{ data.value }}
    </p>
  </div>
</template>
