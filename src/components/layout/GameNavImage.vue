<script setup lang="ts">
import { computed } from 'vue'

import { getMainSiteLink } from '@/utils'

import ExternalLink from '../link/ExternalLink.vue'

interface Props {
  to: string
  img: string
  title: string
  soon?: boolean
}

const props = defineProps<Props>()
const href = computed(() => (props.soon ? undefined : getMainSiteLink(props.to)))
</script>

<template>
  <ExternalLink :to="href" :title="title">
    <img
      class="box-border xl:h-360px bg-game-nav-img border-2px border-grey-medium/20 rounded-4px cursor-pointer select-none"
      :src="img"
      :alt="title + ' Image'"
    />
  </ExternalLink>
</template>
