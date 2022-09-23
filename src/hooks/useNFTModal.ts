import { type ContractTransaction, BigNumber, ethers } from 'ethers'
import { type Ref, ref } from 'vue'

import BlindboxCover from '@/assets/images/cover/cover-blindbox.png'
import type { NFTModalData } from '@/components/modal/NFTMintModal.vue'
import { ERC721__factory } from '@/contracts'
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
  images: '',
  address: '',
  transaction: ''
}

const data = ref<NFTModalData>(INITIAL_NFT_MODAL_DATA)
const open = ref(false)

async function getNFTInfo(address: string, tx: ContractTransaction): Promise<NFTModalData> {
  const ethereum = useReadonlyEthereum()
  // Vue ref 的 get 有问题，使用 ERC721 Factory
  const contract = ERC721__factory.connect(address, ethereum)
  const images = BlindboxCover
  const video = 'https://cdn.ambrus.studio/NFTs/Blindbox.mp4'
  let name = await contract.name() // AmbrusStudioRanger
  const transaction = tx.hash
  const receipt = await tx.wait()
  const filteredLogs = receipt.logs.filter((log) => log.address === address)
  const parsedLog = filteredLogs.map((log) => contract.interface.parseLog(log))
  // Event Transfer(address,address,uint256)
  const filteredTransfer = parsedLog.filter(
    (log) =>
      log.topic === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
      log.args[0] === ethers.constants.AddressZero
  )
  if (Array.isArray(filteredTransfer) && filteredTransfer.length > 0) {
    const tokenId = filteredTransfer[0].args[2]
    if (typeof tokenId === 'object' && tokenId instanceof BigNumber) {
      name += ` #${tokenId.toNumber()}`
    }
  }
  return { images, video, name, address, transaction }
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
