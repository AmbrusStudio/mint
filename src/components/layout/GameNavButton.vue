<script setup lang="ts">
import { computed } from 'vue'

import { cleanupHTML, getMainSiteLink } from '@/utils'

import ExternalLink from '../link/ExternalLink.vue'

interface Props {
  to: string
  name: string
  active?: boolean
  soon?: boolean
}

const props = defineProps<Props>()
const href = computed(() => (props.soon ? undefined : getMainSiteLink(props.to)))
</script>

<template>
  <ExternalLink :to="href" :title="name">
    <p
      class="game-nav-button flex flex-row flex-nowrap items-center xl:px-24px rounded-8px font-bold text-20px leading-60px text-white text-left uppercase cursor-pointer hover:bg-black-bg"
      :class="{ '!bg-black-bg': active }"
      v-html="cleanupHTML(name)"
    />
  </ExternalLink>
</template>

<style>
/* scoped not work */
.game-nav-button span {
  @apply ml-10px font-bold text-12px leading-16px text-rust;
}
</style>
