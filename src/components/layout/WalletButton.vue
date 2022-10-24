<script setup lang="ts">
import { Popover, PopoverPanel } from '@headlessui/vue'
import { computed, ref } from 'vue'

import { useWallet } from '@/hooks'
import { getLauncherSiteLink, stringSlice } from '@/utils'

import IconEthereum from '../icons/IconEthereum.vue'
import WalletButtonPanelItem from './WalletButtonPanelItem.vue'
import WalletButtonPanelItemTitle from './WalletButtonPanelItemTitle.vue'

const { account, connect, reset, isConnected } = useWallet()

const connected = computed(() => isConnected())
const address = computed(() => {
  if (account?.value) return stringSlice(account.value, 4, 4)
  return ''
})
const ethBalance = ref('0.0')

const handleConnectClick = () => {
  if (!connected.value) connect()
}
const handelAccountCenterClick = () => {
  if (window && 'open' in window && typeof window.open === 'function') {
    const url = getLauncherSiteLink('/account/home')
    window.open(url, '_blank', 'noopener')
  }
}
const handleDisconnectClick = () => {
  reset()
}
</script>

<template>
  <Popover class="flex flex-col relative z-20" :class="{ group: connected }">
    <button
      class="flex flex-row flex-nowrap justify-center items-center rounded-4px h-36px w-186px text-white !bg-rust !hover:bg-rust/85"
      type="button"
      @click.stop="handleConnectClick"
    >
      <span class="font-semibold text-14px text-center uppercase" v-if="connected">
        {{ address }}
      </span>
      <span class="font-semibold text-14px text-center uppercase" v-else>Connect Wallet</span>
    </button>
    <PopoverPanel
      class="absolute z-30 bottom-full xl:top-full pb-10px xl:pt-10px w-full hidden group-hover:block"
      static
    >
      <div
        class="flex flex-col rounded-12px bg-black/80 text-white divide-y divide-white/20 shadow-wallet-button backdrop-blur-6px overflow-hidden"
      >
        <WalletButtonPanelItem>
          <div class="flex flex-col gap-12px truncate text-12px leading-16px text-left">
            <div class="font-semibold text-grey-medium">IMX Balance</div>
            <div class="flex flex-row items-center font-normal text-white">
              <IconEthereum class="mr-8px" />
              <span class="mr-4px text-14px leading-20px">{{ ethBalance }}</span>
              <span>ETH</span>
            </div>
          </div>
        </WalletButtonPanelItem>
        <WalletButtonPanelItem>
          <WalletButtonPanelItemTitle>Deposit</WalletButtonPanelItemTitle>
        </WalletButtonPanelItem>
        <WalletButtonPanelItem>
          <WalletButtonPanelItemTitle>Withdraw</WalletButtonPanelItemTitle>
        </WalletButtonPanelItem>
        <WalletButtonPanelItem @click.stop="handelAccountCenterClick">
          <WalletButtonPanelItemTitle>Account Center</WalletButtonPanelItemTitle>
        </WalletButtonPanelItem>
        <WalletButtonPanelItem @click.stop="handleDisconnectClick">
          <WalletButtonPanelItemTitle>Disconnect</WalletButtonPanelItemTitle>
        </WalletButtonPanelItem>
      </div>
    </PopoverPanel>
  </Popover>
</template>
