import type { FlashMint, Mint, MintAccessModal } from '@/types'

export const mint: Mint = {
  information: {
    // 只支持文件名含 @ 符号的图片，如 banner_@1x.jpg banner_@2x.jpg banner_@3x.jpg
    images: [
      'https://ambrus.s3.amazonaws.com/1672113266553_0.77_banner_480w.jpg',
      'https://ambrus.s3.amazonaws.com/1672113266602_0.80_banner_960w.jpg',
      '	https://ambrus.s3.amazonaws.com/1672113266604_0.47_banner_1440w.jpg'
    ],
    type: 'E4C Rangers NFT Hive Series 3',
    name: 'Thorn: Bumble Fighter',
    content:
      '<p>Thorn is a fierce advocate for environmental protection who joined HIVE. Thorn became the personal army for Patton, the new tyrannical leader of HIVE, and is sent on missions to a variety of countries for the reclamation project. A turning point rose when Thorn finally realized the purpose of Patton and eventually started his journey to defeat HIVE. <a href="https://www.ambrus.studio/worldview/ranger/13">Learn more about Thorn</a></p>'
    // note: '<p>For public mint, visit <a href="https://rarible.com/" target="_blank" rel="noopener">Rarible.com</a></p>'
  },
  disclaimer: {
    images: [
      'https://ambrus.s3.amazonaws.com/1672032083985_0.65_1.jpg',
      'https://ambrus.s3.amazonaws.com/1672032084006_0.64_2.jpg',
      'https://ambrus.s3.amazonaws.com/1672032084009_0.68_3.jpg',
      'https://ambrus.s3.amazonaws.com/1672032084014_0.99_4.jpg',
      'https://ambrus.s3.amazonaws.com/1672032084017_0.86_5.jpg',
      'https://ambrus.s3.amazonaws.com/1672032084020_0.37_6.jpg'
    ],
    content: ''
  },
  editions: [
    // 删除所有版本展示 Coming soon
    {
      name: 'E4C Rangers Hive',
      value: 'rangers',
      contract: '',
      imxCollection: '0x899b2032426ea4d1e3D066067f85754Ada3D61A1',
      style: {
        background: 'linear-gradient(90deg, #0FC56D 0%, #3AB9E1 100%)',
        boxShadow: '0px 0px 8px 1px #3AB9E1, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
      }
    }
  ],
  introduction: [
    // 完全展示部分
    {
      title: 'E4C Rangers HIVE',
      content:
        '<p><strong>Amount</strong>: 9,999<br>Free mint and available to E4Cverse Permit owners and Whitelist owners only.<br><strong>Permit Mint</strong>: From Jan.9th 10AM SGT<br><strong>Whitelist Mint</strong>: From Jan.10th 10AM SGT</p>'
    },
    {
      title: 'Utilities',
      content:
        '<p>- In-game airdrops of the champion and exclusive skins.<br>- Staking the NFT to receive future $DGC tokens (the utility token of E4C, find more in the <a href="https://tokenomics.ambrus.studio/">Tokenomics Paper</a>). <br>- Please note that the Hive Edition is not applicable for NFT upgrading.</p>'
    }
    // 折叠部分需要 foldable 为 true
    // {
    //   title: 'NFT Staking',
    //   foldable: false,
    //   content:
    //     '<p>For Gold/Rangers Edition holders, we offer you a chance to upgrade your NFT to Gold+/Rangers+ Edition and to earn more benefits by:</p><ul><li>Staking E4C Rangers NFT for at least 35 days.</li><li>Acquiring 1 special community badge.</li></ul>'
    // },
    // {
    //   title: 'Gold Edition Utilities',
    //   foldable: true,
    //   content:
    //     '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>Gold Loot Box containing in-game champions and skins</li><li>10% discount on in-game purchases</li><li>Complementary gifts to 1 friend</li></ul>'
    // },
    // {
    //   title: 'Gold+ Edition Utilities',
    //   foldable: true,
    //   content:
    //     '<ul><li>3% additional in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>E4C token airdrop</li><li>Gold+ Loot Box containing in-game champions and skins</li><li>15% discount on in-game purchases</li><li>Complementary gifts to 3 friends</li></ul>'
    // },
    // {
    //   title: 'Rangers Edition Utilities',
    //   foldable: true,
    //   content:
    //     '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li></ul>'
    // },
    // {
    //   title: 'Rangers+ Edition Utilities',
    //   foldable: true,
    //   content:
    //     '<ul><li>5% in-game IP dividend ownership* of the corresponding champions&skins</li><li>Exclusive airdrop of the corresponding champion in game E4C: Final Salvation</li><li>Gold Loot Box containing in-game champions and skins</li><li>10% discount on in-game purchases</li><li>Complementary gifts to 1 friend</li></ul>'
    // }
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
    time: 'From Jan 9th, 10AM SGT'
  },
  whitelist: {
    title: 'You are Whitelisted',
    subtitle: 'Whitelist Mint Time',
    face: 'star',
    time: 'From Jan 10th, 10AM SGT'
  },
  public: {
    title: 'You are not whitelisted',
    subtitle:
      'Get whitelisted in our <a href="https://discord.com/invite/e4c" target="_blank" rel="noopener">Official Discord Server</a>',
    face: 'happy',
    time: ''
  }
}
