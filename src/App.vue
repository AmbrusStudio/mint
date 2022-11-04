<script setup lang="ts">
import PageFooter from '@components/layout/PageFooter.vue'
import PageHeader from '@components/layout/PageHeader.vue'
import RoadmapTimeline from '@components/Roadmap/RoadmapTimeline.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <PageHeader />
  <RouterView />
  <PageFooter />
  <RoadmapTimeline />
</template>
