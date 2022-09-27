<script setup lang="ts">
import type { MintInfo } from '@/types'

import HTMLView from '../html/HTMLView.vue'
import NFTInformation from './NFTInformation.vue'

interface Props {
  className?: string
  info: MintInfo
}

defineProps<Props>()
</script>

<template>
  <div class="p-24px xl:p-36px bg-black/80 shadow-nft-sale backdrop-blur-20px" :class="[className]">
    <NFTInformation :info="info" />
    <section class="flex flex-col">
      <slot />
      <HTMLView
        v-if="!!info.note"
        class="text-white font-bold text-14px leading-20px mt-24px"
        :src="info.note"
      />
    </section>
  </div>
</template>
