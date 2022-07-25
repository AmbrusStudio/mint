<script setup lang="ts">
import { getMainSiteLink } from '@/utils'

import ExternalLink from '../link/ExternalLink.vue'

interface Props {
  to: string
  img: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <ExternalLink :to="getMainSiteLink(to)" :title="title">
    <img
      class="box-border xl:h-360px bg-game-nav-img border-2px border-grey-medium/20 rounded-4px cursor-pointer select-none"
      :src="img"
      :alt="title + ' Image'"
    />
  </ExternalLink>
</template>
