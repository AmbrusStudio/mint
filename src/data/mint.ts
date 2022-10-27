import type { FlashMint, Mint, MintAccessModal } from '@/types'

export const mint: Mint = {
  information: {
    // 只支持文件名含 @ 符号的图片，如 banner_@1x.jpg banner_@2x.jpg banner_@3x.jpg
    images: [
      'https://ambrus.s3.amazonaws.com/1663925833649_0.49_banner_480h.jpg',
      'https://ambrus.s3.amazonaws.com/1663925833647_0.20_banner_960h.jpg',
      'https://ambrus.s3.amazonaws.com/1663925833627_0.41_banner-1.jpg'
    ],
    type: 'E4C Rangers Genesis Series 1',
    name: 'Rin: Heir of Musashi',
    content:
      '<p>Rin is the first Ranger coming to <a href="https://www.ambrus.studio/worldview" target="_blank" rel="noopener">E4C Verse</a>. She is a combat cyborg, who carries the razor-sharp katana sword and scaled samurai armor. She is also a major member of A.E.R.L, who fights against corruption. <a href="https://www.ambrus.studio/worldview/ranger/6">Learn more about Rin</a></p>'
    // note: '<p>For Rangers Edition public mint, visit <a href="https://rarible.com/e4cgold/items" target="_blank" rel="noopener">Rarible.com</a></p>'
  },
  disclaimer: {
    images: [
      'https://ambrus.s3.amazonaws.com/1663749034842_0.94_Gold_A.png',
      'https://ambrus.s3.amazonaws.com/1663749034863_0.51_Gold_B.png',
      'https://ambrus.s3.amazonaws.com/1663749034868_0.09_Gold_C.png',
      'https://ambrus.s3.amazonaws.com/1659503426906_0.55_1.jpg',
      'https://ambrus.s3.amazonaws.com/1659503426929_0.47_2.jpg',
      'https://ambrus.s3.amazonaws.com/1659503426933_0.29_3.jpg'
    ],
    content: ''
  },
  editions: [], // 删除所有版本展示 Coming soon
  introduction: [
    // 完全展示部分
    {
      title: 'Gold edition',
      content:
        '<p><strong>Amount</strong>: 450<br><strong>Mint price</strong>: 0.49ETH<br><strong>Permit Mint</strong>: Sep 30, 10AM SGT, 48 Hours<br><strong>Summit Flash Sale</strong>: Oct 1st, 10AM SGT<br><strong>Whitelist Mint</strong>: Oct 1st, 10AM SGT, 24 Hours</p>'
    },
    {
      title: 'Rangers edition',
      content:
        '<p><strong>Amount</strong>: 646<br><strong>Mint price</strong>: 0.19ETH<br><strong>Permit Mint</strong>: Oct 6th, 10AM SGT, 48 Hours<br><strong>Whitelist Mint</strong>: Oct 7th, 10AM SGT, 24 Hours</p>'
    },
    // 折叠部分需要 foldable 为 true
    {
      title: 'NFT Staking',
      foldable: false,
      content:
        '<p>For Gold/Rangers Edition holders, we offer you a chance to upgrade your NFT to Gold+/Rangers+ Edition and to earn more benefits by:</p><ul><li>Staking E4C Rangers NFT for at least 35 days.</li><li>Acquiring 1 special community badge.</li></ul>'
    },
    {
      title: 'Gold Edition Utilities',
      foldable: true,
      content:
        '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>Gold Loot Box containing in-game champions and skins</li><li>10% discount on in-game purchases</li><li>Complementary gifts to 1 friend</li></ul>'
    },
    {
      title: 'Gold+ Edition Utilities',
      foldable: true,
      content:
        '<ul><li>3% additional in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>E4C token airdrop</li><li>Gold+ Loot Box containing in-game champions and skins</li><li>15% discount on in-game purchases</li><li>Complementary gifts to 3 friends</li></ul>'
    },
    {
      title: 'Rangers Edition Utilities',
      foldable: true,
      content:
        '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li></ul>'
    },
    {
      title: 'Rangers+ Edition Utilities',
      foldable: true,
      content:
        '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>Gold Loot Box containing in-game champions and skins</li><li>10% discount on in-game purchases</li><li>Complementary gifts to 1 friend</li></ul>'
    },
    {
      title: '* Note',
      foldable: false,
      content:
        '<p>The ownership is shared among holders and will be redeemed in 10 years after the game launch</p>'
    }
  ]
}

export const flashMint: FlashMint = {
  ...mint, // 文案和 Mint 一致
  flashSale: {
    // start 和 end 都要填，不到 start 时间和过了 end 时间会跳转普通 Mint
    start: 1664591400, // Saturday, October 1, 2022 11:00:00 AM GMT+08:00
    end: 1664611200 // Saturday, October 1, 2022 4:00:00 PM GMT+08:00
  },
  editions: [
    // Flash sale 只有 Gold 版本
    {
      name: 'Gold Edition',
      value: 'gold',
      contract: '0x52b27e707164f6216d4a150777c5d6b9d4295398',
      style: {
        background: 'linear-gradient(90deg, #E4AA15 0%, #F0C75D 100%)',
        boxShadow: '0px 0px 8px 1px #FFB800, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
      }
    }
  ]
}

// 不要更改这里
export const initialMint: Mint = {
  information: { images: [], type: '', name: '', content: '' },
  disclaimer: { images: [], content: '' },
  editions: [],
  introduction: [],
  properties: []
}

export const mintAccessModal: MintAccessModal = {
  permit: {
    title: 'You have Permit Mint Access',
    subtitle: 'Permit Mint Time',
    face: 'star',
    time: {
      gold: 'Nov 6th, 10AM SGT, 48 Hours',
      rangers: 'Nov 13th, 10AM SGT, 48 Hours'
    }
  },
  whitelist: {
    title: 'You are Whitelisted',
    subtitle: 'Whitelist Mint Time',
    face: 'star',
    time: {
      gold: 'Nov 7th, 10AM SGT, 24 Hours',
      rangers: 'Nov 14th, 10AM SGT, 24 Hours'
    }
  },
  public: {
    title: 'You are not whitelisted',
    subtitle: 'You can participate in public mint starting at:',
    face: 'happy',
    time: {
      gold: 'Nov 8th, 10AM SGT',
      rangers: 'Nov 15th, 10AM SGT'
    }
  }
}
