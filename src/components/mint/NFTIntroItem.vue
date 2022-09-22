<script setup lang="ts">
import { ref } from 'vue'

import type { MintIntro } from '@/types'

import HTMLView from '../html/HTMLView.vue'
import IconMintArrowDown from '../icons/IconMintArrowDown.vue'

interface Props {
  className?: string
  intro: MintIntro
}

const props = defineProps<Props>()

const open = ref(false)
const toggleOpen = () => {
  if (!props.intro.foldable) return
  open.value = !open.value
}
</script>

<template>
  <div class="flex flex-col" :class="[className]">
    <div
      class="flex flex-row flex-nowrap items-center justify-between p-12px"
      :class="{ 'bg-black/80 border-b-2px border-black-bg cursor-pointer': intro.foldable }"
      @click="toggleOpen"
    >
      <h4 class="uppercase text-rust font-bold text-14px leading-18px">
        {{ intro.title }}
      </h4>
      <IconMintArrowDown
        v-if="intro.foldable"
        class="w-16px text-rust transition-transform"
        :class="{ 'rotate-180': open }"
      />
    </div>
    <div
      class="px-12px"
      :class="{
        'p-12px bg-white/10': intro.foldable,
        block: intro.foldable && open,
        hidden: intro.foldable && !open
      }"
    >
      <HTMLView class="text-white font-normal text-14px leading-24px" :src="intro.content" />
    </div>
  </div>
</template>
