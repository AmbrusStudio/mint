<script setup lang="ts">
import type { MintInfo } from '@/types'

import HTMLView from '../html/HTMLView.vue'

interface Props {
  className?: string
  info: MintInfo
}

defineProps<Props>()
</script>

<template>
  <section class="flex flex-col gap-4px mb-24px xl:mb-36px" :class="[className]">
    <h4 class="uppercase text-rust font-semibold text-14px leading-18px">{{ info.type }}</h4>
    <h3 class="text-white font-semibold text-20px leading-24px">{{ info.name }}</h3>
    <HTMLView class="text-white font-medium text-14px leading-24px" :src="info.content" />
  </section>
</template>
