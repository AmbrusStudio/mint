<script setup lang="ts">
import PageMain from '@components/layout/PageMain.vue'
import IMXWalletPopover from '@components/mint/IMXWalletPopover.vue'
import NFTBanner from '@components/mint/NFTBanner.vue'
import NFTDisclaimer from '@components/mint/NFTDisclaimer.vue'
import NFTEditionInfo from '@components/mint/NFTEditionInfo.vue'
import NFTEditionRadio from '@components/mint/NFTEditionRadio.vue'
import NFTIntroCard from '@components/mint/NFTIntroCard.vue'
import NFTPropertyCard from '@components/mint/NFTPropertyCard.vue'
import NFTSaleButton from '@components/mint/NFTSaleButton.vue'
import NFTSaleCard from '@components/mint/NFTSaleCard.vue'
import MintAccessModal from '@components/modal/MintAccessModal.vue'
import NFTMintModal from '@components/modal/NFTMintModal.vue'
import { computed, ref, watch, watchEffect } from 'vue'

import { getMintInfo } from '@/api'
import RoadmapButton from '@/components/Roadmap/RoadmapButton.vue'
import { initialMint } from '@/data'
import {
  useComputedSalerL2Data,
  useMintSignature,
  useNFTModal,
  useReadonlySalerL2Data,
  useSalerL2Contract,
  useWeb3Wallet
} from '@/hooks'
import type { Mint, MintEdition, MintEditionValue } from '@/types'
import { alertErrorMessage, formatDatetime, isHistorical } from '@/utils'

const { account, ethereum, connect, isConnected } = useWeb3Wallet()
const mintSignature = useMintSignature(account)
const { modalOpen, modalData, openNFTModal, closeNFTModal } = useNFTModal()

const nftData = ref<Mint>(initialMint)
const edition = ref<MintEditionValue>()
const selected = ref<MintEdition>()
const salerAddress = ref<string>('')
const permitSig = ref<string[]>([])
const whitelistSig = ref<string[]>([])
const isMinting = ref(false)
const mintAccessModalOpen = ref(false)
const hasPermitMintAccess = ref(false)
const hasWhitelistMintAccess = ref(false)

const salerContract = useSalerL2Contract(ethereum, salerAddress)
const { basePrice, amount, sold, total, isSaleStart, isSaleEnd, getSaleData } =
  useReadonlySalerL2Data(salerAddress)
const { coming, closed } = useComputedSalerL2Data(salerAddress)

const publicData = computed(() => selected.value?.publicSale)
const publicDateTime = computed(() => {
  if (!publicData.value) return ''
  return formatDatetime(publicData.value.start, 'MMM d, t ZZZZ').replace('GMT+8', 'SGT')
})
const canPublic = computed(() => {
  if (!publicData.value) return false
  const publicStart = isHistorical(publicData.value.start)
  return closed.value && publicStart
})
const editions = computed(() => !!nftData.value.editions.length)

const connected = computed(() => isConnected())
const permitStart = isSaleStart('permit')
const permitEnd = isSaleEnd('permit')
const canPermit = computed(
  () =>
    permitStart.value &&
    !permitEnd.value &&
    Array.isArray(permitSig.value) &&
    permitSig.value.length > 0
)
const whitelistStart = isSaleStart('whitelist')
const whitelistEnd = isSaleEnd('whitelist')
const canWhitelist = computed(
  () =>
    whitelistStart.value &&
    !whitelistEnd.value &&
    Array.isArray(whitelistSig.value) &&
    whitelistSig.value.length > 0
)

const permitData = getSaleData('permit')
const whitelistData = getSaleData('whitelist')

const showInfo = computed(() => canPermit.value || canWhitelist.value)

// buttonText 和下面 NFTSaleButton 的展示逻辑没有完全搞清楚
const buttonText = computed(() => {
  if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!amount.value) return 'Sold Out'
  if (!permitEnd.value && !canPermit.value) return 'No Permit Mint Access'
  if (!whitelistEnd.value && !canWhitelist.value) return 'No Whitelist Mint Access'
  return 'Sold Out'
})

const handleMintClick = async () => {
  if (!salerContract.value || !selected.value) return
  try {
    isMinting.value = true

    const nftAddress = selected.value.imxCollection

    if (canPermit.value && permitSig.value) {
      const price = await salerContract.value.permitSalePrice()
      const tx = await salerContract.value.permitSale(permitSig.value, { value: price })
      await openNFTModal(nftAddress, tx)
    } else if (canWhitelist.value && whitelistSig.value) {
      const price = await salerContract.value.whitelistSalePrice()
      const tx = await salerContract.value.whitelistSale(whitelistSig.value, { value: price })
      await openNFTModal(nftAddress, tx)
    }
  } catch (error) {
    alertErrorMessage('Mint faild', error)
  } finally {
    isMinting.value = false
  }
}
const handleWalletConnect = async () => {
  await connect()
}
const handleMintNFTModalClose = () => {
  closeNFTModal()
}
const handleMintAccessModalOpen = async () => {
  if (!account.value) await connect()
  await mintSignature.refresh()
  const { permit, whitelist } = mintSignature.hasMintSignature('gold')
  hasPermitMintAccess.value = permit
  hasWhitelistMintAccess.value = whitelist
  mintAccessModalOpen.value = true
}
const handleMintAccessModalClose = () => {
  mintAccessModalOpen.value = false
}

watchEffect(async () => {
  const data = await getMintInfo()
  nftData.value = data
  if (Array.isArray(data.editions)) {
    edition.value = data.editions[0]?.value
  }
})

watchEffect(async () => {
  if (account.value && edition.value) {
    await mintSignature.refresh()
    const _sig = mintSignature[edition.value]
    permitSig.value = _sig.value.permit
    whitelistSig.value = _sig.value.whitelist
    console.debug('Watch edition effect', edition.value, JSON.parse(JSON.stringify(_sig.value)))
  }
})

const selectEdition = (edition?: MintEditionValue): void => {
  if (!edition) return
  const _selected = nftData.value.editions.find((e) => e.value === edition)
  if (!_selected) return
  selected.value = _selected
  salerAddress.value = _selected.contract
}

watch([edition, account], ([edition]) => selectEdition(edition), { immediate: true })
</script>

<template>
  <PageMain>
    <div
      class="grid grid-cols-1 xl:grid-cols-2 xl:gap-y-36px xl:pt-60px pb-100px xl:pb-114px xl:relative"
    >
      <NFTBanner className="xl:col-span-2" :images="nftData.information.images" />
      <NFTDisclaimer
        className="hidden xl:flex"
        :images="nftData.disclaimer.images"
        :content="nftData.disclaimer.content"
      />
      <div class="grid grid-cols-1 xl:gap-y-36px xl:w-540px xl:-mt-480px xl:ml-56px">
        <NFTSaleCard :info="nftData.information" :editions="nftData.editions">
          <form class="flex flex-col" action="#">
            <section
              class="flex flex-col gap-12px mb-24px xl:mb-36px"
              v-if="nftData.editions.length"
            >
              <NFTEditionRadio
                v-for="edi in nftData.editions"
                :key="`edition-radio-${edi.value}`"
                :data="edi"
                v-model:edition="edition"
              />
            </section>

            <section v-if="showInfo && connected">
              <NFTEditionInfo
                v-if="canPermit"
                timeType="start"
                :start="permitData.start"
                :end="permitData.end"
                :price="permitData.price"
                :basePrice="basePrice"
                :discount="permitData.discount"
                :sold="sold"
                :total="total"
              />
              <NFTEditionInfo
                v-else-if="canWhitelist"
                timeType="start"
                :start="whitelistData.start"
                :end="whitelistData.end"
                :price="whitelistData.price"
                :basePrice="basePrice"
                :discount="whitelistData.discount"
                :sold="sold"
                :total="total"
              />
            </section>

            <section class="flex flex-col">
              <NFTSaleButton disabled v-if="!editions || coming">Coming Soon</NFTSaleButton>
              <NFTSaleButton disabled v-else-if="publicData && !canPublic">
                {{ `Public Mint: ${publicDateTime}` }}
              </NFTSaleButton>
              <ExternalLink
                class="block w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust"
                :to="selected?.publicSale?.link"
                v-else-if="publicData && canPublic"
              >
                {{ selected?.publicSale?.text }}
              </ExternalLink>
              <NFTSaleButton
                @click.stop.prevent="handleMintClick"
                :disabled="isMinting"
                v-else-if="canPermit && connected"
              >
                Permit Mint
              </NFTSaleButton>
              <NFTSaleButton
                @click.stop.prevent="handleMintClick"
                :disabled="isMinting"
                v-else-if="canWhitelist && connected"
              >
                Whitelist Mint
              </NFTSaleButton>
              <NFTSaleButton disabled v-else-if="connected">
                {{ buttonText }}
              </NFTSaleButton>
              <IMXWalletPopover disabled v-else>
                <NFTSaleButton @click.stop.prevent="handleWalletConnect">
                  Connect Wallet
                </NFTSaleButton>
              </IMXWalletPopover>
            </section>
          </form>
          <button
            class="font-bold text-14px leading-20px text-rust underline mt-24px mr-auto"
            type="button"
            @click.stop="handleMintAccessModalOpen"
          >
            Check if my wallet is whitelisted
          </button>
        </NFTSaleCard>
        <NFTDisclaimer
          className="xl:hidden"
          :images="nftData.disclaimer.images"
          :content="nftData.disclaimer.content"
        />
        <NFTIntroCard class="m-24px xl:m-0" :intros="nftData.introduction" />
        <NFTPropertyCard class="mx-24px xl:m-0" :properties="nftData.properties" />
      </div>
    </div>
    <NFTMintModal :open="modalOpen" :onModalClose="handleMintNFTModalClose" :data="modalData" />
    <MintAccessModal
      :open="mintAccessModalOpen"
      :onModalClose="handleMintAccessModalClose"
      :permit="hasPermitMintAccess"
      :whitelist="hasWhitelistMintAccess"
    />
  </PageMain>
  <RoadmapButton placement="bottom-right" />
</template>
