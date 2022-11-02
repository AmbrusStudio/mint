import { type ContractTransaction, BigNumber } from 'ethers'
import { type Ref, ref } from 'vue'

import type { NFTModalData } from '@/components/modal/NFTMintModal.vue'
import { AmbrusStudioSalerL2__factory, ERC721__factory } from '@/contracts'
import { useReadonlyEthereum } from '@/hooks'

type NFTModalDataRef = {
  readonly modalData: Ref<NFTModalData>
  readonly modalOpen: Ref<boolean>
}

type NFTModalHelpers = {
  openNFTModal(salerAddress: string, nftAddress: string, tx: ContractTransaction): Promise<void>
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

async function getNFTInfo(
  salerAddress: string,
  nftAddress: string,
  tx: ContractTransaction
): Promise<NFTModalData> {
  const images = 'https://cdn.ambrus.studio/NFTs/blindbox.gif'
  const ethereum = useReadonlyEthereum()
  const salerContract = AmbrusStudioSalerL2__factory.connect(salerAddress, ethereum)
  const nftContract = ERC721__factory.connect(nftAddress, ethereum)
  const name = await nftContract.name()
  let tokenId = 0
  const transaction = tx.hash
  const receipt = await tx.wait()
  const parsedLog = receipt.logs.map((log) => salerContract.interface.parseLog(log))
  // Event MintRequested (uint256 tokenId)
  const filteredTransfer = parsedLog.filter(
    (log) => log.topic === '0xed7e1cc32737aac2f5c91387879185d74677bc68b69562a9d6dcd77622e8b62d'
  )
  if (Array.isArray(filteredTransfer) && filteredTransfer.length > 0) {
    const _tokenId = filteredTransfer[0].args[0]
    if (typeof _tokenId === 'object' && _tokenId instanceof BigNumber) {
      tokenId = _tokenId.toNumber()
    }
  }
  return { name, tokenId, address: nftAddress, transaction, images }
}

export function useNFTModal(): NFTModalDataWithHelpers {
  async function openNFTModal(salerAddress: string, nftAddress: string, tx: ContractTransaction) {
    const modalData = await getNFTInfo(salerAddress, nftAddress, tx)
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
