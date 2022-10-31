<script setup lang="ts">
import IconClose from '@components/icons/IconClose.vue'
import IconEthereum from '@components/icons/IconEthereum.vue'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { computed, ref } from 'vue'

import BaseModal from './BaseModal.vue'

interface Props {
  open: boolean
  ethBalance: string
  disabled?: boolean
}

interface Emits {
  (e: 'onModalClose'): void
  (e: 'onNextClick', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const validatePattern = /^\d+\.?\d*$/
const zeroBalance = BigNumber.from(0)
const maxBalance = parseEther(props.ethBalance)

const withdrawAmount = ref('')
const error = computed<string | boolean>(() => {
  if (!validatePattern.test(withdrawAmount.value)) return 'Please enter a number.'
  try {
    const inputBalance = parseEther(withdrawAmount.value)
    if (inputBalance.lte(zeroBalance)) return 'Please enter the correct balance.'
    if (inputBalance.gt(maxBalance)) return 'Insufficient funds.'
    return false
  } catch (error) {
    if (error instanceof Error) console.error(`Validate withdraw amount ${error}`)
    return 'Please enter the correct balance.'
  }
})

const handleModalClose = () => {
  if (!props.open) return
  emit('onModalClose')
}

const handleNextClick = () => {
  if (error.value) return
  emit('onNextClick', withdrawAmount.value)
}
</script>

<template>
  <BaseModal
    id="withdraw-amount-modal"
    :open="open"
    modalMainClass="h-full xl:h-auto"
    modalContentClass="h-full"
  >
    <div class="flex flex-col drop-shadow-nft-modal w-full xl:w-600px xl:mx-auto">
      <div
        class="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80"
      >
        <h4 class="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">
          ETH Withdraw
        </h4>
        <IconClose
          class="w-16px h-16px xl:w-30px xl:h-30px cursor-pointer"
          @click.stop.prevent="handleModalClose"
        />
      </div>
      <div class="flex-1 bg-white/80">
        <div class="flex flex-col backdrop-blur-10px h-full p-24px xl:p-36px gap-24px">
          <p class="font-normal text-16px leading-30px text-tips">
            Enter the amount you want to withdraw from your IMX wallet
          </p>
          <div class="flex flex-col gap-6px truncate text-12px leading-16px text-left">
            <div class="font-semibold text-grey-dark">IMX Balance</div>
            <div class="flex flex-row items-center font-normal text-black">
              <IconEthereum class="mr-8px" />
              <span class="mr-4px text-14px leading-20px">{{ ethBalance }}</span>
              <span>ETH</span>
            </div>
          </div>
          <label for="withdraw-amount" class="flex flex-col cursor-pointer text-grey-dark gap-12px">
            <div
              class="flex flex-row flex-nowrap justify-between items-center text-12px leading-16px"
            >
              <span class="font-bold uppercase">Withdraw Amount</span>
              <span class="font-normal text-rust" v-if="error">{{ error }}</span>
            </div>
            <div class="flex flex-row flex-nowrap justify-center relative">
              <input
                type="text"
                name="Withdraw Amount"
                id="withdraw-amount"
                placeholder="0.0"
                required
                class="flex flex-row flex-nowrap items-center w-full box-border border-1px px-24px py-19px font-semibold text-16px leading-20px placeholder:text-grey-medium hover:outline-none focus:outline-none"
                :class="{
                  'bg-white border-white hover:border-ligntGreen focus:border-ligntGreen': !error,
                  'bg-white border-rust': error
                }"
                v-model.trim="withdrawAmount"
              />
              <div class="absolute right-24px top-1/2 -translate-y-1/2">
                <span class="font-bold text-16px leading-20px text-black uppercase">ETH</span>
              </div>
            </div>
          </label>
          <button
            type="button"
            class="box-border uppercase w-full px-24px py-20px font-semibold text-16px leading-20px text-center disabled:!bg-grey-medium disabled:text-white disabled:hover:!bg-grey-medium disabled:hover:text-white disabled:cursor-not-allowed !bg-rust text-white hover:!bg-rust/85"
            :disabled="disabled || !!error"
            @click.stop.prevent="handleNextClick"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
