<script setup lang="ts">
import type { MintIntro } from '@/types'

import NFTIntroItem from './NFTIntroItem.vue'

interface Props {
  className?: string
  intros: MintIntro[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-24px p-12px xl:px-24px xl:py-36px bg-black/50" :class="[className]">
    <NFTIntroItem v-for="(intro, index) in intros" :key="index" :intro="intro" />
  </div>
</template>
