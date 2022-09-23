import type { Mint } from '@/types'

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
      '<p>Rin is the first Ranger coming to <a href="https://www.ambrus.studio/worldview" target="_blank" rel="noopener">E4C Verse</a>. She is a combat mecha, who carries the razor-sharp katana sword and scaled samurai armor. She is also an infamous spectral force among criminal forces. <a href="https://www.ambrus.studio/worldview/ranger/6">Learn more about Rin</a></p>',
    note: '<p>For public mint, visit <a href="https://rarible.com/" target="_blank" rel="noopener">Rarible.com</a></p>'
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
  publicSale: {
    start: 1664935200, // Wednesday, October 5, 2022 10:00:00 AM GMT+08:00，不填时间不会展示 Public Sale
    text: 'Mint on Rarable.com',
    link: 'https://rarible.com/'
  },
  editions: [], // 删除所有版本展示 Coming soon
  // editions: [
  //   {
  //     name: 'Gold Edition',
  //     value: 'gold',
  //     contract: '0xc2D4e1a46b48EB3208bdcf4887f85E02682B7752',
  //     nftContract: '0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8',
  //     style: {
  //       background: 'linear-gradient(90deg, #E4AA15 0%, #F0C75D 100%)',
  //       boxShadow: '0px 0px 8px 1px #FFB800, inset 4px 0px 10px rgba(0, 0, 0, 0.15)'
  //     }
  //   }
  // ],
  introduction: [
    // 完全展示部分
    {
      title: 'Gold edition',
      content:
        '<p>Amount: 450<br>Mint price: 0.49ETH<br><strong>Permit Mint</strong>: Sep 30, 10AM SGT, 48 Hours<br><strong>Summit Flash Sale</strong>: Oct 1st, 10AM SGT<br><strong>Whitelist Mint</strong>: Oct 1st, 10AM SGT, 24 Hours</p>'
    },
    {
      title: 'Rangers edition',
      content:
        '<p>Amount: 646<br>Mint price: 0.19ETH<br><strong>Permit Mint</strong>: Oct 6th, 10AM SGT, 48 Hours<br><strong>Whitelist Mint</strong>: Oct 7th, 10AM SGT, 24 Hours</p>'
    },
    // 折叠部分需要 foldable 为 true
    {
      title: 'NFT Staking',
      foldable: false,
      content:
        '<p>For Gold/Rangers Edition holders, we offer you a chance to upgrade your NFT to Gold+/Rangers+ and earn more benefits by:</p><ul><li>Staking E4C Rangers NFT for at least 35 days.</li><li>Acquiring 1 special community badge.</li></ul>'
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
    }
  ]
}
