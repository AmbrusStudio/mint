import { ethers } from 'ethers'
import MerkleTree from 'merkletreejs'

import type { NFTItem } from '@/types'

import { serveRequest } from '../axios'

const demoNFTItem: NFTItem = {
  information: {
    images: [
      'https://ambrus.s3.amazonaws.com/1659502593244_0.08_banner_480w_480w.jpg',
      'https://ambrus.s3.amazonaws.com/1659502593218_0.20_banner_960w_960w.jpg',
      'https://ambrus.s3.amazonaws.com/1659502593241_0.88_banner_1440w_1440w.jpg'
    ],
    type: 'E4C Rangers NFT Series 1',
    name: 'Rin: Heir of Musashi',
    content:
      "Rin is the first Ranger coming to E4C Verse. She'll also make an appearance in our upcoming games, E4C Final Salvation.\n\nShe was born in 2063 as a human and re-born in 2079 as a combat mecha. Because her family celebrated the existence of samurai ancestors, she carries the razor-sharp katana sword and scaled samurai armor. Rin has become an infamous spectral force among criminal forces throughout the central areas of Japan’s Honshu island."
  },
  disclaimer: {
    images: [
      'https://ambrus.s3.amazonaws.com/1659503426906_0.55_1.jpg',
      'https://ambrus.s3.amazonaws.com/1659503426929_0.47_2.jpg',
      'https://ambrus.s3.amazonaws.com/1659503426933_0.29_3.jpg'
    ],
    content:
      ''
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
        'Ultimate Edition(15) - English auction & Open-bid 2nd price\n\nGold Edition(450) - Fixed price at 0.6 ETH'
    },
    {
      title: 'NFT Utilities',
      content:
        'What you get with Gold Edition:\n* 5% in-game IP dividend ownership of the corresponding champions+skins(shared among holders).Airdrop of the corresponding champion in games.\n* Gold Loot Box containing airdrops of in-game champions and skins.\n* 10%  discount on in-game purchases.\n* Complementary gifts to 1 friend.'
    },
    {
      title: 'NFT Staking System',
      content:
        'For Gold Edition holders, we offer you a chance to upgrade your NFT to Gold+ and earn more benefits by\n* Staking E4C Rangers NFT for at least 90 days.\n* Completing specific community missions and claiming the badge.'
    },
    {
      title: 'Utilities of the Gold+ Edition',
      content: '* 5% in-game IP dividend ownership shared among holders and 3% additional IP dividend ownership of the corresponding character (shared among holders of Ultimate and Gold+ Edition).\n* E4C token airdrop.\n* Airdrop of the corresponding ranger in games.\n* Gold+ Loot Box airdrop of rangers and skins.\n* 15% discount on in-game purchases.\n* Complementary gifts to 3 friends.\n\nIn addition, holders who stake will also be granted 1 NFT airdrop from the next release.'
    }
  ]
}

export async function getNFTItemInfo(): Promise<NFTItem> {
  return demoNFTItem
}

export async function getWhitelistSignature(address: string): Promise<string[]> {
  const { data: proof } = await serveRequest.get<string[]>(`/api/v1/proof/${address}`)
  return proof
}
