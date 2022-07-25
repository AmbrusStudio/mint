<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useWallet } from '@/hooks'
import { stringSlice } from '@/utils'

import IconHeaderClose from '../icons/IconHeaderClose.vue'
import IconHeaderMenu from '../icons/IconHeaderMenu.vue'
import GamesNav from './GamesNav.vue'
import LogoNav from './LogoNav.vue'
import SiteNav from './SiteNav.vue'
import SocialNav from './SocialNav.vue'
import WalletButton from './WalletButton.vue'

const { width } = useWindowSize()
const gamesNavOpen = ref(false)
const mobileMenuOpen = ref(false)
const { account, connect, reset, isConnected } = useWallet()
const connected = computed(() => isConnected())
const address = computed(() => {
  if (account?.value) return stringSlice(account.value, 4, 4)
  return ''
})
const mobileMenuClass = computed(() => {
  if (width.value < 1280) {
    if (mobileMenuOpen.value) return 'flex'
    return 'hidden'
  } else return 'flex'
})
const handleWalletConnect = () => {
  connect()
}
const handleWalletDisconnect = () => {
  reset()
}
const handleGamesNavClick = (open: boolean) => {
  gamesNavOpen.value = open
}
const handleMobileMenuToggle = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header
    id="header"
    class="fixed top-0 z-10 w-100vw xl:w-full xl:h-auto bg-black/50 backdrop-blur-10px overflow-auto"
    :class="{ 'h-100vh !bg-black/80': mobileMenuOpen }"
  >
    <div class="flex flex-col xl:flex-row xl:items-center h-full xl:h-100px xl:px-32px">
      <div
        class="flex flex-row shrink-0 items-center justify-between xl:justify-start h-68px xl:h-auto px-24px xl:p-0"
      >
        <LogoNav />
        <button
          class="xl:hidden text-rust"
          @click.stop.prevent="handleMobileMenuToggle"
          title="Nav Toggle"
        >
          <IconHeaderMenu v-if="!mobileMenuOpen" />
          <IconHeaderClose v-else />
        </button>
      </div>
      <div
        class="flex-1 flex-col xl:flex-row xl:items-center xl:justify-between"
        :class="mobileMenuClass"
      >
        <SiteNav @onGamesClick="handleGamesNavClick" />
        <div
          class="flex flex-col xl:flex-row items-center gap-24px xl:gap-0 px-32px py-36px xl:p-0 bg-black-bg xl:bg-transparent"
        >
          <SocialNav className="px-26px" />
          <WalletButton
            :connected="connected"
            @onConnectClick="handleWalletConnect"
            @onDisonnectClick="handleWalletDisconnect"
          >
            {{ address }}
          </WalletButton>
        </div>
      </div>
    </div>
    <div class="hidden h-0 xl:block xl:h-auto">
      <GamesNav :open="gamesNavOpen" />
    </div>
  </header>
</template>
