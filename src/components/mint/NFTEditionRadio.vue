<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, reactive } from 'vue'

import { useReadonlySalerData, useWallet } from '@/hooks'
import type { MintEditionStyle } from '@/types'

import NFTCurrency from '../nft/NFTCurrency.vue'

interface Props {
  id: string
  /** Radio 的选项名 */
  name: string
  /** Radio 的选项值 */
  value: string
  /** 版本对应的 AmbrusStudioSaler 合约地址 */
  contract: string
  style: MintEditionStyle
  edition: string
}
interface Emits {
  (event: 'update:edition', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const editionModel = useVModel(props, 'edition', emits)
const { isConnected } = useWallet()
const { price, amount } = useReadonlySalerData(props.contract)
const disabled = computed(() => !isConnected() || !amount.value)
const tooltip = computed(() => (!isConnected() ? 'Please connect wallet' : props.name))
const selected = computed(() => props.value === editionModel.value)
const labelClass = reactive({ 'cursor-not-allowed': disabled })
const labelStyle = computed(() => ({
  background: props.style.background,
  boxShadow: selected.value ? props.style.boxShadow : undefined,
  borderColor: selected.value ? '#fff' : undefined
}))
</script>

<template>
  <label class="relative text-16px leading-20px cursor-pointer" :for="id" :title="tooltip">
    <input
      class="-z-1 absolute inset-0 opacity-0"
      type="radio"
      name="nft-edition"
      :id="id"
      :value="value"
      :disabled="disabled"
      v-model="editionModel"
    />
    <div
      class="flex flex-row flex-nowrap justify-between items-center px-24px py-20px border-1px border-transparent"
      :class="labelClass"
      :style="labelStyle"
    >
      <span class="text-white font-semibold">{{ name }}</span>
      <span class="text-grey-medium font-medium" v-if="!amount">Sold Out</span>
      <NFTCurrency className="text-white font-medium" :price="price" v-else />
    </div>
  </label>
</template>
