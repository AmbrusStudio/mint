<script setup lang="ts">
import { computed } from 'vue'

import type { MintInfo, MintPublicSale } from '@/types'
import { isHistorical } from '@/utils'

import HTMLView from '../html/HTMLView.vue'
import ExternalLink from '../link/ExternalLink.vue'
import NFTInformation from './NFTInformation.vue'

interface Props {
  className?: string
  info: MintInfo
  publicSale: MintPublicSale
}

const props = defineProps<Props>()

const publicSaleStart = computed(
  () => props.publicSale?.start && isHistorical(props.publicSale.start)
)
</script>

<template>
  <div class="p-24px xl:p-36px bg-black/80 shadow-nft-sale backdrop-blur-20px" :class="[className]">
    <NFTInformation :info="info" />
    <section class="flex flex-col" v-if="!publicSaleStart">
      <slot />
      <HTMLView
        v-if="!!info.note"
        class="text-white font-bold text-14px leading-20px mt-24px"
        :src="info.note"
      />
    </section>
    <ExternalLink
      class="block w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust"
      :to="publicSale.link"
      v-if="publicSaleStart"
    >
      {{ publicSale.text }}
    </ExternalLink>
  </div>
</template>
