import { type ContractTransaction, BigNumber, ethers } from 'ethers'
import { type Ref, ref } from 'vue'

import type { NFTModalData } from '@/components/modal/NFTMintModal.vue'
import { E4CRanger__factory, ERC721__factory } from '@/contracts'
import { useReadonlyEthereum } from '@/hooks'

type NFTModalDataRef = {
  readonly modalData: Ref<NFTModalData>
  readonly modalOpen: Ref<boolean>
}

type NFTModalHelpers = {
  openNFTModal: (address: string, tx: ContractTransaction) => Promise<void>
  closeNFTModal: () => void
}

type NFTModalDataWithHelpers = NFTModalDataRef & NFTModalHelpers

const INITIAL_NFT_MODAL_DATA: NFTModalData = {
  name: '',
  tokenId: 0,
  address: '',
  transaction: '',
  images: ''
}

const data = ref<NFTModalData>(INITIAL_NFT_MODAL_DATA)
const open = ref(false)

async function getNFTInfo(address: string, tx: ContractTransaction): Promise<NFTModalData> {
  const images = 'https://cdn.ambrus.studio/NFTs/blindbox.gif'
  const ethereum = useReadonlyEthereum()
  const contract = ERC721__factory.connect(address, ethereum)
  const name = await contract.name()
  let tokenId = 0
  const transaction = tx.hash
  const receipt = await tx.wait()
  const parsedLog = receipt.logs.map((log) => contract.interface.parseLog(log))
  // Event MintRequest (uint256 tokenId)
  const filteredTransfer = parsedLog.filter(
    (log) => log.topic === '0x7b0e05fbeb1edccdd44bd586d531628f90b83bc34de187a0b063ef548a779ac0'
  )
  if (Array.isArray(filteredTransfer) && filteredTransfer.length > 0) {
    const _tokenId = filteredTransfer[0].args[0]
    if (typeof _tokenId === 'object' && _tokenId instanceof BigNumber) {
      tokenId = _tokenId.toNumber()
    }
  }
  return { name, tokenId, address, transaction, images }
}

export function useNFTModal(): NFTModalDataWithHelpers {
  async function openNFTModal(address: string, tx: ContractTransaction) {
    const modalData = await getNFTInfo(address, tx)
    data.value = { ...modalData }
    open.value = true
  }

  function closeNFTModal() {
    open.value = false
    data.value = { ...INITIAL_NFT_MODAL_DATA }
  }

  return {
    get modalData() {
      return data
    },
    get modalOpen() {
      return open
    },
    openNFTModal,
    closeNFTModal
  }
}
