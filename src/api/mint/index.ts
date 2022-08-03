import { ethers } from 'ethers'
import MerkleTree from 'merkletreejs'

import type { NFTItem } from '@/types'

const demoNFTItem: NFTItem = {
  information: {
    images: [
      'https://i.imgur.com/CRvY7vc.png',
      'https://i.imgur.com/IBqASlD.png',
      'https://i.imgur.com/nmDWQ0m.png'
    ],
    type: 'E4C Rangers NFT Series 1',
    name: 'Rin: Heir of Musashi',
    content:
      "Pearce's fixed-wing X6 provides a surprising amount of comfortable living space aboard a compact and highly agile fighter patrol ship. A supremely capable combat vessel with an extended atmoglass canopy provides a conspicuous piloting advantage as well as a way"
  },
  disclaimer: {
    images: [
      'https://imgur.com/V0xOBYB.png',
      'https://imgur.com/V0xOBYB.png',
      'https://imgur.com/V0xOBYB.png'
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id vestibulum diam. Sed aliquet dolor leo, eu facilisis magna porta vel. Etiam vulputate augue ac odio suscipit interdum. Donec nec auctor lectus, eu molestie odio. Nullam euismod, felis eu venenatis tincidunt, arcu enim dictum est, quis viverra nisl est quis est. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt est nec tortor pellentesque finibus. Suspendisse lacinia eu metus id lacinia. Nullam elementum nisl dui, ut iaculis est tristique eget. Suspendisse odio magna, gravida ultricies molestie in, blandit vel dui. Nam convallis ante lacus, a interdum orci bibendum ut. Sed placerat augue vehicula diam bibendum commodo. Sed a porta orci.'
  },
  editions: [],
  // editions: [
  //   {
  //     name: 'Legendary Edition',
  //     value: 'legendary',
  //     contract: '0x71d08c82358ed8Bc3d7af38BfD3517663e9664D4',
  //     style: {
  //       background: 'linear-gradient(90deg, #E4AA15 0%, #F0C75D 100%)',
  //       boxShadow: '0px 0px 8px 1px #FFB800, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
  //     }
  //   }
  // ],
  introduction: [
    {
      title: 'NFT Sale',
      content:
        'Ultimate Edition (15) - English auction & Open-bid 2nd price\n\nGold Edition (450) - Fixed price'
    },
    {
      title: 'NFT Utilities',
      content:
        'E4C Rangers NFTs’ utilities are mostly the same for different editions. But if you are an Ultimate Edition owner, you’ll earn a lot more benefits in our array of games and more! [Learn more](https://www.ambrus.studio)\n\nWhat you get with Gold Edition:\n\n* 5% revenue share of corresponding hero/skin\n* 10% off in-game discounts\n* Gold loot airdrops\n* In-game asset airdrops\n* 1 free gift to friends'
    },
    {
      title: 'NFT Staking',
      content:
        'For Gold Edition owners, we offer you a chance to upgrade your NFT to Gold+ and earn more benefits by simply staking your E4C Rangers NFT for 3 months. Each NFT can only upgrade once.\n\nAfter upgraded to Gold+, you’ll get:\n\n* 8% revenue share of corresponding hero/skin\n* 15% off in-game discounts\n* Gold+ loot airdrops\n* More In-game asset airdrops\n* 3 free gift to friends'
    },
    {
      title: 'Additional Information',
      content: 'Descriptions'
    }
  ]
}

export async function getNFTItemInfo(): Promise<NFTItem> {
  return demoNFTItem
}

const demoWhitelistAddresses: string[] = [
  '0x6465f1250c9fe162602db83791fc3fb202d70a7b',
  '0x2ffd4622C4bB253b96577701b0cbDF3814271345',
  '0xBf7e12D0c40DDbeD235153dbb754B5b819fF2138',
  '0xc239d840d339a4b23417a9767309315f49e9e3c3',
  '0x480AdEaC920dbb286A33CE6Ef9Fd16d548d9BC9b',
  '0xa88F41690752c2a37f3989356EC0396Ed0e9C020',
  '0xAdC41d839b7fC82Fb76bF57fAB7cdDf83bFa68aC',
  '0xe4cfe788904c1db2cB55231E3a72cEff27410928',
  '0x923Fe0dc3b2b3477d921BA8859e6b68F5cD97715',
  '0xA52Fc0e787E13Fc4C63C71d23C100C9358456455',
  '0xADAbAdD160176f0F1F492ddd549B390278Cef177'
]

const leafNodes = demoWhitelistAddresses.map((address) => ethers.utils.keccak256(address))
const merkleTree = new MerkleTree(leafNodes, ethers.utils.keccak256, { sortPairs: true })
console.log('HexRoot', merkleTree.getHexRoot())

export function getWhitelistSignature(address: string): string[] {
  const hash = ethers.utils.keccak256(address)
  return merkleTree.getHexProof(hash)
}
