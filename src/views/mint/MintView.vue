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
import NFTMintModal from '@components/modal/NFTMintModal.vue'
import { computed, ref, watch, watchEffect } from 'vue'

import { getMintInfo, getSignature } from '@/api'
import ExternalLink from '@/components/link/ExternalLink.vue'
import { initialMint } from '@/data'
import {
  useComputedSalerData,
  useImmutableXWallet,
  useNFTModal,
  useReadonlySalerData,
  useSalerContract,
  useWallet
} from '@/hooks'
import type { Mint, MintEdition } from '@/types'
import { alertErrorMessage, formatDatetime } from '@/utils'

const { ethereum } = useWallet()
const { walletInfo, connect, isConnected } = useImmutableXWallet()
const { modalOpen, modalData, openNFTModal, closeNFTModal } = useNFTModal()

const nftData = ref<Mint>(initialMint)
const edition = ref<string>('')
const selected = ref<MintEdition>()
const salerAddress = ref<string>('')
const permitSig = ref<string[]>()
const whitelistSig = ref<string[]>()
const isMinting = ref(false)

const salerContract = useSalerContract(ethereum, salerAddress)
const { basePrice, amount, sold, total, isSaleStart, isSaleEnd, getSaleData } =
  useReadonlySalerData(salerAddress)
const { coming, closed } = useComputedSalerData(salerAddress)

const publicStart = isSaleStart('public')
const canPublic = computed(() => closed.value && publicStart.value)
const editions = computed(() => !!nftData.value.editions.length)
const external = computed(() => !!selected.value?.publicSale)

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
const publicData = getSaleData('public')

const publicDateTime = computed(() =>
  formatDatetime(publicData.value.start, 'MMM d, t ZZZZ').replace('GMT+8', 'SGT')
)

const showInfo = computed(
  () => canPermit.value || canWhitelist.value || (canPublic.value && !external.value)
)

// buttonText 和下面 NFTSaleButton 的展示逻辑没有完全搞清楚
const buttonText = computed(() => {
  if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!amount.value) return 'Sold Out'
  if (!permitEnd.value && !canPermit.value) return 'No Permit Mint Access'
  if (!whitelistEnd.value && !canWhitelist.value) return 'No Whitelist Mint Access'
  return 'Sold Out'
})

const handleMintClick = async () => {
  if (!salerContract.value) return
  try {
    isMinting.value = true

    const nftAddress = await salerContract.value.nft()

    if (canPermit.value && permitSig.value) {
      const price = await salerContract.value.permitSalePrice()
      const tx = await salerContract.value.permitSale(permitSig.value, { value: price })
      await openNFTModal(nftAddress, tx)
    } else if (canWhitelist.value && whitelistSig.value) {
      const price = await salerContract.value.whitelistSalePrice()
      const tx = await salerContract.value.whitelistSale(whitelistSig.value, { value: price })
      await openNFTModal(nftAddress, tx)
    } else if (canPublic.value) {
      // const price = await salerContract.value.basePrice()
      // const tx = await salerContract.value.publicSale({ value: price })
      const price = await salerContract.value.flashSalePrice()
      const tx = await salerContract.value.flashSale({ value: price })
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
const handleModalClose = () => {
  closeNFTModal()
}

watchEffect(async () => {
  const data = await getMintInfo()
  nftData.value = data
  if (Array.isArray(data.editions)) {
    edition.value = data.editions[0].value
  }
})

watchEffect(async () => {
  if (walletInfo.value && edition.value) {
    const _permitSig = await getSignature(walletInfo.value.address, 'permit', edition.value)
    permitSig.value = _permitSig
    const _whitelistSig = await getSignature(walletInfo.value.address, 'whitelist', edition.value)
    whitelistSig.value = _whitelistSig
  }
})

const selectEdition = (edition: string): void => {
  if (!edition) return
  const _selected = nftData.value.editions.find((e) => e.value === edition)
  if (!_selected) return
  selected.value = _selected
  salerAddress.value = _selected.contract
}

watch([edition, walletInfo], ([edition]) => selectEdition(edition), { immediate: true })
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
              <NFTEditionInfo
                v-else-if="canPublic"
                timeType="unlimited"
                :start="publicData.start"
                :end="publicData.end"
                :price="publicData.price"
                :basePrice="basePrice"
                :discount="publicData.discount"
                :sold="sold"
                :total="total"
              />
            </section>

            <section class="flex flex-col">
              <NFTSaleButton disabled v-if="!editions || coming">Coming Soon</NFTSaleButton>
              <NFTSaleButton disabled v-else-if="external && closed && !publicStart">
                {{ `Public Mint: ${publicDateTime}` }}
              </NFTSaleButton>
              <ExternalLink
                class="block w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust"
                :to="selected?.publicSale?.link"
                v-else-if="external && canPublic"
              >
                {{ selected?.publicSale?.text }}
              </ExternalLink>
              <NFTSaleButton
                @click.stop.prevent="handleMintClick"
                :disabled="isMinting"
                v-else-if="!external && canPublic && connected"
              >
                Mint Now
              </NFTSaleButton>
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
              <IMXWalletPopover v-else>
                <NFTSaleButton @click.stop.prevent="handleWalletConnect">
                  Connect Wallet
                </NFTSaleButton>
              </IMXWalletPopover>
            </section>
          </form>
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
    <NFTMintModal
      :open="modalOpen"
      :onModalClose="handleModalClose"
      :images="modalData.images"
      :video="modalData.video"
      :name="modalData.name"
      :address="modalData.address"
      :transaction="modalData.transaction"
    />
  </PageMain>
</template>
