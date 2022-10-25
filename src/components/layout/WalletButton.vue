<script setup lang="ts">
import { Popover, PopoverPanel } from '@headlessui/vue'
import { EthAddress, ETHTokenType } from '@imtbl/imx-sdk'
import { formatEther } from 'ethers/lib/utils'
import { isRight } from 'fp-ts/lib/Either'
import { computed, ref, watchEffect } from 'vue'

import { useImmutableXWallet } from '@/hooks'
import { getLauncherSiteLink, stringSlice } from '@/utils'

import IconEthereum from '../icons/IconEthereum.vue'
import WalletButtonPanelItem from './WalletButtonPanelItem.vue'
import WalletButtonPanelItemTitle from './WalletButtonPanelItemTitle.vue'

type OnCleanup = (cleanupFn: () => void) => void

const { imxClient, imxLink, walletInfo, connect, reset, isConnected } = useImmutableXWallet()

const connected = computed(() => isConnected())
const address = computed(() => {
  if (walletInfo.value) return stringSlice(walletInfo.value.address, 4, 4)
  return ''
})
const ethBalance = ref('0.0')

async function fetchWalletBalances() {
  if (!imxClient.value || !walletInfo.value) return
  const userDecode = EthAddress.decode(walletInfo.value.address)
  if (!isRight(userDecode)) return
  const { result: balances } = await imxClient.value.listBalances({
    user: userDecode.right,
    symbols: [ETHTokenType.ETH]
  })
  console.debug('Fetch wallet balances', balances)
  const _ethBalance = formatEther(balances[0].balance)
  ethBalance.value = _ethBalance
  return _ethBalance
}

const handleConnectClick = async () => {
  if (!connected.value) await connect()
}
const handleBalancesClick = async () => {
  await fetchWalletBalances()
}
const handleDepositClick = async () => {
  if (!imxLink.value) return
  await imxLink.value.deposit({ type: ETHTokenType.ETH })
}
const handleWithdrawClick = async () => {
  if (!imxLink.value) return
  const ethBalance = await fetchWalletBalances()
  if (!ethBalance) return
  await imxLink.value.prepareWithdrawal({ type: ETHTokenType.ETH, amount: ethBalance })
}
const handelAccountCenterClick = () => {
  if (window && 'open' in window && typeof window.open === 'function') {
    const url = getLauncherSiteLink('/account/home')
    window.open(url, '_blank', 'noopener')
  }
}
const handleDisconnectClick = async () => {
  await reset()
}

watchEffect(async (onCleanup: OnCleanup) => {
  await fetchWalletBalances()
  const fetchInterval = setInterval(async () => {
    await fetchWalletBalances()
  }, 30000)
  onCleanup(() => clearInterval(fetchInterval))
})
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
        <div class="flex flex-col">
          <WalletButtonPanelItem @click.stop="handleBalancesClick">
            <div class="flex flex-col gap-12px truncate text-12px leading-16px text-left">
              <div class="font-semibold text-grey-medium">IMX Balance</div>
              <div class="flex flex-row items-center font-normal text-white">
                <IconEthereum class="mr-8px" />
                <span class="mr-4px text-14px leading-20px">{{ ethBalance }}</span>
                <span>ETH</span>
              </div>
            </div>
          </WalletButtonPanelItem>
          <WalletButtonPanelItem class="pl-24px" @click.stop="handleDepositClick">
            <WalletButtonPanelItemTitle>Deposit</WalletButtonPanelItemTitle>
          </WalletButtonPanelItem>
          <WalletButtonPanelItem class="pl-24px" @click.stop="handleWithdrawClick">
            <WalletButtonPanelItemTitle>Withdraw</WalletButtonPanelItemTitle>
          </WalletButtonPanelItem>
        </div>
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
