<script setup lang="ts">
import type { MintIntro } from '@/types'

import HTMLView from '../html/HTMLView.vue'

interface Props {
  className?: string
  intros: MintIntro[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-24px xl:gap-36px p-12px xl:p-36px bg-black/50" :class="[className]">
    <div v-for="(intro, index) in intros" :key="index" class="block">
      <h4 class="mt-12px xl:mt-0 mb-12px uppercase text-rust font-bold text-14px leading-18px">
        {{ intro.title }}
      </h4>
      <HTMLView class="text-white font-normal text-14px leading-24px" :src="intro.content" />
    </div>
  </div>
</template>
