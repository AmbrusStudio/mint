<script setup lang="ts">
import { ref } from 'vue'

import { getMainSiteLink } from '@/utils'

import IconArrowDown from '../icons/IconArrowDown.vue'
import ExternalLink from '../link/ExternalLink.vue'
import GamesNav from './GamesNav.vue'
import NavItem from './NavItem.vue'

interface Emits {
  (e: 'onGamesClick', open: boolean): void
}

const emit = defineEmits<Emits>()
const gamesOpen = ref(false)
const handleGamesNavClick = () => {
  const newState = !gamesOpen.value
  gamesOpen.value = newState
  emit('onGamesClick', newState)
}
</script>

<template>
  <nav
    class="flex flex-col xl:flex-row items-center gap-0 xl:gap-24px px-24px xl:p-0 h-full"
    title="Site Nav"
  >
    <ExternalLink :to="getMainSiteLink('/')" titie="Home">
      <NavItem>Home</NavItem>
    </ExternalLink>
    <div :class="{ 'router-link-active': gamesOpen }">
      <NavItem @onNavClick="handleGamesNavClick">
        E4C: Games
        <IconArrowDown class="ml-8px transition-all" :class="{ 'rotate-180': gamesOpen }" />
      </NavItem>
    </div>
    <div class="flex w-full xl:!hidden">
      <GamesNav :open="gamesOpen" />
    </div>
    <ExternalLink :to="getMainSiteLink('/worldview')" title="World View">
      <NavItem>E4C: Verse</NavItem>
    </ExternalLink>
    <ExternalLink :to="getMainSiteLink('/aboutus')" title="About Us">
      <NavItem>About Us</NavItem>
    </ExternalLink>
  </nav>
</template>
