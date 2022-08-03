<script setup lang="ts">
import { computed } from 'vue'

import { cleanupHTML } from '@/utils'

interface Props {
  src: string
}
const props = defineProps<Props>()
const html = computed(() => cleanupHTML(props.src))
</script>

<template>
  <div class="html-view" v-html="html"></div>
</template>

<style>
.html-view * {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}
.html-view p:not(:last-of-type) {
  @apply mb-20px;
}
.html-view a {
  @apply text-rust underline;
}
.html-view ul {
  @apply list-disc pl-20px;
}
</style>
