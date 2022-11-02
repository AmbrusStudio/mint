<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, reactive } from 'vue'

import { useComputedSalerL2Data, useReadonlySalerL2Data } from '@/hooks'
import type { MintEdition, MintEditionValue } from '@/types'
import { isHistorical } from '@/utils'

import NFTCurrency from '../nft/NFTCurrency.vue'

interface Props {
  data: MintEdition
  edition?: MintEditionValue
  price?: string
}
interface Emits {
  (event: 'update:edition', value?: MintEditionValue): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const editionModel = useVModel(props, 'edition', emits)
const { basePrice, amount } = useReadonlySalerL2Data(props.data.contract)
const { coming, closed } = useComputedSalerL2Data(props.data.contract)

const external = computed(() => !!props.data?.publicSale)
const canPublic = computed(() => {
  if (!props.data?.publicSale) return false
  const publicStart = isHistorical(props.data?.publicSale.start)
  return closed.value && publicStart
})

const disabled = computed(() => {
  if (coming.value) return true
  if (external.value && canPublic.value) return false
  if (!amount.value) return true
  if (closed.value) return false
  return true
})
const selected = computed(() => props.data.value === editionModel.value)
const price = computed(() => props.price || basePrice.value)

const labelClass = reactive({ 'cursor-not-allowed': disabled })
const labelStyle = computed(() => ({
  background: props.data.style.background,
  boxShadow: selected.value ? props.data.style.boxShadow : undefined,
  borderColor: selected.value ? '#fff' : undefined
}))
</script>

<template>
  <label
    class="relative text-16px leading-20px cursor-pointer"
    :for="`edition-radio-${data.value}`"
    :title="data.name"
  >
    <input
      class="-z-1 absolute inset-0 opacity-0"
      type="radio"
      name="nft-edition"
      :id="`edition-radio-${data.value}`"
      :value="data.value"
      :disabled="disabled"
      v-model="editionModel"
    />
    <div
      class="flex flex-row flex-nowrap justify-between items-center px-24px py-20px border-1px border-transparent"
      :class="labelClass"
      :style="labelStyle"
    >
      <span class="text-white font-semibold">{{ data.name }}</span>
      <span class="text-white font-medium" v-if="coming">Coming Soon</span>
      <span class="text-white font-medium" v-else-if="external && !canPublic"> Mint Closed </span>
      <span class="text-white font-medium" v-else-if="external && canPublic">Public Mint</span>
      <span class="text-white font-medium" v-else-if="!amount">Sold Out</span>
      <NFTCurrency className="text-white font-medium" :price="price" v-else />
    </div>
  </label>
</template>
