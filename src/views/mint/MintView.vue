<script setup lang="ts">
import PageMain from '@components/layout/PageMain.vue'
import ExternalLink from '@components/link/ExternalLink.vue'
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
  useComputedSalerFreeMintData,
  useConnectWalletFlow,
  useMintSignature,
  useNFTModal,
  useReadonlySalerFreeMintData,
  useSalerFreeMint,
  useWeb3Wallet
} from '@/hooks'
import type { Mint, MintEdition, MintEditionValue } from '@/types'
import { alertErrorMessage, formatDatetime, isHistorical } from '@/utils'

const { account, ethereum, connect: connectWeb3Wallet, isConnected } = useWeb3Wallet()
const mintSignature = useMintSignature(account)
const {
  modalOpen: mintModalOpen,
  modalData: mintModalData,
  openNFTModal,
  closeNFTModal
} = useNFTModal()
const {
  modalOpen: connectImxModalOpen,
  connectWeb3WalletAndCheckImxAccount,
  pureCheckImxAccount
} = useConnectWalletFlow()

const mintData = ref<Mint>(initialMint)
const edition = ref<MintEditionValue>()
const selected = ref<MintEdition>()
const salerAddress = ref<string>('')
const permitSig = ref<string[]>([])
const whitelistSig = ref<string[]>([])
const isMinting = ref(false)

const mintAccessModalOpen = ref(false)
const hasPermitMintAccess = ref(false)
const hasWhitelistMintAccess = ref(false)

const { basePrice, amount, sold, total, isSaleStart, isSaleEnd, getSaleData, refreshData } =
  useReadonlySalerFreeMintData()
const { coming, closed } = useComputedSalerFreeMintData()
const { freeSale } = useSalerFreeMint(ethereum)

const external = computed(() => !!selected.value?.publicSale)
const publicDateTime = computed(() => {
  if (!selected.value?.publicSale) return ''
  return formatDatetime(selected.value.publicSale.start, 'MMM d, t ZZZZ').replace('GMT+8', 'SGT')
})
const canPublic = computed(() => {
  if (!selected.value?.publicSale) return false
  return isHistorical(selected.value.publicSale.start)
})
const editions = computed(() => !!mintData.value.editions.length)

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

const buttonText = computed(() => {
  // if (!(edition.value && salerContract.value)) return 'Choose an Edition'
  if (!edition.value) return 'Choose an Edition'
  if (closed.value || !amount.value) return 'Sold Out'
  if (!permitEnd.value && !canPermit.value) return 'No Permit Mint Access'
  if (!whitelistEnd.value && !canWhitelist.value) return 'No Whitelist Mint Access'
  return 'Sold Out'
})

const handleMintClick = async () => {
  // if (!salerContract.value || !selected.value || connectImxModalOpen.value) return
  if (!selected.value || connectImxModalOpen.value || !ethereum.value) return
  try {
    isMinting.value = true

    const checkImx = await pureCheckImxAccount()
    if (!checkImx) return

    if (canPermit.value && permitSig.value) {
      // const price = await salerContract.value.permitSalePrice()
      // const tx = await salerContract.value.permitSale(permitSig.value, { value: price })
      // await openNFTModal(salerAddress, nftAddress, tx)
      const saleResult = await freeSale('permit', permitSig.value)
      if (!saleResult) return
      const nftAddress = selected.value.imxCollection
      await openNFTModal(nftAddress, saleResult.tokenId)
    } else if (canWhitelist.value && whitelistSig.value) {
      // const price = await salerContract.value.whitelistSalePrice()
      // const tx = await salerContract.value.whitelistSale(whitelistSig.value, { value: price })
      // await openNFTModal(salerAddress, nftAddress, tx)
      const saleResult = await freeSale('whitelist', whitelistSig.value)
      if (!saleResult) return
      const nftAddress = selected.value.imxCollection
      await openNFTModal(nftAddress, saleResult.tokenId)
    }

    await refreshData()
  } catch (error) {
    alertErrorMessage('Mint faild', error)
  } finally {
    isMinting.value = false
  }
}
const handleWalletConnect = async () => {
  if (connectImxModalOpen.value) return
  await connectWeb3WalletAndCheckImxAccount()
}
const handleMintNFTModalClose = () => {
  closeNFTModal()
}
const handleMintAccessModalOpen = async () => {
  if (!account.value) await connectWeb3Wallet()
  await mintSignature.refresh()
  const selectedEdition = edition.value || 'gold'
  const { permit, whitelist } = mintSignature.hasMintSignature(selectedEdition)
  hasPermitMintAccess.value = permit
  hasWhitelistMintAccess.value = whitelist
  mintAccessModalOpen.value = true
}
const handleMintAccessModalClose = () => {
  mintAccessModalOpen.value = false
}

watchEffect(async () => {
  const data = await getMintInfo()
  mintData.value = data
  if (Array.isArray(data.editions)) {
    edition.value = data.editions[0]?.value
  }
})

watchEffect(async () => {
  if (account.value && edition.value) {
    const _sig = mintSignature[edition.value]
    permitSig.value = _sig.value.permit
    whitelistSig.value = _sig.value.whitelist
    console.debug('Watch edition effect', edition.value, JSON.parse(JSON.stringify(_sig.value)))
  }
})

watchEffect(async () => {
  if (account.value) await pureCheckImxAccount()
})

const selectEdition = (edition?: MintEditionValue): void => {
  if (!edition) return
  const _selected = mintData.value.editions.find((e) => e.value === edition)
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
      <NFTBanner className="xl:col-span-2" :images="mintData.information.images" />
      <NFTDisclaimer
        className="hidden xl:flex"
        :images="mintData.disclaimer.images"
        :content="mintData.disclaimer.content"
      />
      <!-- <div class="grid grid-cols-1 xl:gap-y-36px xl:w-540px xl:-mt-480px xl:ml-56px"> -->
      <div class="grid grid-cols-1 xl:gap-y-36px xl:w-540px xl:absolute xl:right-36px xl:mt-96px">
        <NFTSaleCard :info="mintData.information" :editions="mintData.editions">
          <form class="flex flex-col" action="#">
            <section
              class="flex flex-col gap-12px mb-24px xl:mb-36px"
              v-if="mintData.editions.length"
            >
              <NFTEditionRadio
                v-for="edi in mintData.editions"
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
              <NFTSaleButton disabled v-else-if="closed && external && !canPublic">
                {{ `Public Mint: ${publicDateTime}` }}
              </NFTSaleButton>
              <ExternalLink
                class="block w-full py-16px xl:py-22px bg-rust text-white font-semibold text-16px xl:text-24px leading-20px xl:leading-28px text-center uppercase hover:bg-white hover:text-rust"
                :to="selected?.publicSale?.link"
                v-else-if="closed && external && canPublic"
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
          :images="mintData.disclaimer.images"
          :content="mintData.disclaimer.content"
        />
        <NFTIntroCard class="m-24px xl:m-0" :intros="mintData.introduction" />
        <NFTPropertyCard class="mx-24px xl:m-0" :properties="mintData.properties" />
      </div>
    </div>
    <NFTMintModal
      :open="mintModalOpen"
      :onModalClose="handleMintNFTModalClose"
      :data="mintModalData"
    />
    <MintAccessModal
      :open="mintAccessModalOpen"
      :onModalClose="handleMintAccessModalClose"
      :permit="hasPermitMintAccess"
      :whitelist="hasWhitelistMintAccess"
    />
  </PageMain>
  <RoadmapButton placement="bottom-right" />
</template>
