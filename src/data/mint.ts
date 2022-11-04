import type { FlashMint, Mint, MintAccessModal } from '@/types'

export const mint: Mint = {
  information: {
    // 只支持文件名含 @ 符号的图片，如 banner_@1x.jpg banner_@2x.jpg banner_@3x.jpg
    images: [
      'https://ambrus.s3.amazonaws.com/1667384398010_0.25_banner%400.33x.jpg',
      'https://ambrus.s3.amazonaws.com/1667384398007_0.52_banner-2%400.67x.jpg',
      'https://ambrus.s3.amazonaws.com/1667384397977_0.74_banner-1.jpg'
    ],
    type: 'E4C Rangers Genesis Series 2',
    name: 'Kit: Uncaged Reaper',
    content:
      '<p>Kit is the second Ranger coming to <a href="https://www.ambrus.studio/worldview" target="_blank" rel="noopener">E4C Verse</a>.  A fox whose life has been forever changed by natural disasters. He and many other animals have gained special powers from a nuclear accident. Together they founded the AERL group in defense of their community and Kit has been a major leader ever since. <a href="https://www.ambrus.studio/worldview/ranger/14">Learn more about Kit</a></p>'
    // note: '<p>For Gold Edition public mint, visit <a href="https://rarible.com/e4cgold/items" target="_blank" rel="noopener">Rarible.com</a></p>'
  },
  disclaimer: {
    images: [
      'https://ambrus.s3.amazonaws.com/1667296791624_0.54_1.jpg',
      'https://ambrus.s3.amazonaws.com/1667383465434_0.64_2.jpg',
      'https://ambrus.s3.amazonaws.com/1667383465444_0.06_3.jpg',
      'https://ambrus.s3.amazonaws.com/1667383465445_0.93_4.jpg',
      'https://ambrus.s3.amazonaws.com/1667383465446_0.10_5.jpg',
      'https://ambrus.s3.amazonaws.com/1667383465447_0.95_6.jpg'
    ],
    content: ''
  },
  editions: [
    // 删除所有版本展示 Coming soon
    {
      name: 'Gold Edition',
      value: 'gold',
      contract: '0x75531AEA9B71C70A1cba22Fff2C917BfD9036d15',
      imxCollection: '0xbF206014a878df4153036d7895188e340527a8f0',
      style: {
        background: 'linear-gradient(90deg, #E4AA15 0%, #F0C75D 100%)',
        boxShadow: '0px 0px 8px 1px #FFB800, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
      },
      publicSale: {
        start: 1667872800,
        text: 'Public Mint on Rarible.com',
        link: 'https://rarible.com/e4cgold/items'
      }
    },
    {
      name: 'Rangers Edition',
      value: 'rangers',
      contract: '0xCefD016812097CE89E8FE350c8D174BE7e65aE60',
      imxCollection: '0x714a090F35a1f1fC9BAa65059b28939DD0F5A196',
      style: {
        background: 'linear-gradient(90deg, #399E98 0%, #88C4C0 100%)',
        boxShadow: '0px 0px 8px 1px #88C3C0, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
      },
      publicSale: {
        start: 1668132000,
        text: 'Public Mint on Rarible.com',
        link: 'https://rarible.com/e4crangers/items'
      }
    }
  ],
  introduction: [
    // 完全展示部分
    {
      title: 'Gold edition',
      content:
        '<p><strong>Amount</strong>: 450<br><strong>Mint price</strong>: 0.49ETH<br><strong>Permit Mint</strong>: Nov 6th, 10AM SGT, 48 Hours<br><strong>Whitelist Mint</strong>: Nov 7th, 10AM SGT, 24 Hours</p>'
    },
    {
      title: 'Rangers edition',
      content:
        '<p><strong>Amount</strong>: 646<br><strong>Mint price</strong>: 0.19ETH<br><strong>Permit Mint</strong>: Nov 9th, 10AM SGT, 48 Hours<br><strong>Whitelist Mint</strong>: Nov 10th, 10AM SGT, 24 Hours</p>'
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
  editions: []
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
      rangers: 'Nov 9th, 10AM SGT, 48 Hours'
    }
  },
  whitelist: {
    title: 'You are Whitelisted',
    subtitle: 'Whitelist Mint Time',
    face: 'star',
    time: {
      gold: 'Nov 7th, 10AM SGT, 24 Hours',
      rangers: 'Nov 10th, 10AM SGT, 24 Hours'
    }
  },
  public: {
    title: 'You are not whitelisted',
    subtitle: 'You can participate in public mint starting at:',
    face: 'happy',
    time: {
      gold: 'Nov 8th, 10AM SGT',
      rangers: 'Nov 11th, 10AM SGT'
    }
  }
}
