<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to?: string
  blank?: boolean
}

const props = defineProps<Props>()
const target = computed(() => (props.blank ? '_blank' : undefined))
const rel = computed(() => (props.blank ? 'noopener' : undefined))
</script>

<template>
  <a v-if="to" :href="to" :target="target" :rel="rel">
    <slot />
  </a>
  <span v-else>
    <slot />
  </span>
</template>
