import type { Auction } from '@/types/auction'

export const auction: Auction = {
  subtitle: 'E4C Rangers NFT Series 2',
  subtitleFocus: 'Ultimate Edition',
  title: 'auction event',
  images: [
    'https://ambrus.s3.amazonaws.com/1666066645439_0.90_7.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645397_0.41_1.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645420_0.27_2.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645425_0.98_3.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645432_0.41_5.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645434_0.15_6.jpg',
    'https://ambrus.s3.amazonaws.com/1666066645429_0.53_4.jpg'
  ],
  detail: [
    {
      title: 'The Ultimate Utilities',
      introduction: [
        {
          title: '2%',
          content: 'Exclusive IP dividend ownership',
          style: {}
        },
        {
          title: 'E4C',
          content: 'Governance token airdrop',
          style: {}
        },
        {
          title: 'Loots',
          content: '& other in-game assets airdrops',
          style: {}
        },
        {
          title: 'VIP',
          content: 'RSVP, bid, and get our exclusive customized NFT airdrop and more',
          style: {}
        }
      ]
    },
    {
      title: 'Details of the Auction Event',
      introduction: [
        {
          title: 'When',
          content: 'October 30th 10AM SGT - <br> November 2nd 10AM SGT',
          style: {
            lineHeight: '51px',
            fontSize: '42px'
          }
        },
        {
          title: 'How',
          content: 'Open ascending bid auction',
          style: {
            lineHeight: '51px',
            fontSize: '42px'
          }
        },
        {
          title: 'Where',
          content: 'TBD',
          style: {
            lineHeight: '51px',
            fontSize: '42px'
          }
        },
        {
          title: 'How much',
          content: 'Starting from 6.5 ETH',
          style: {
            lineHeight: '51px',
            fontSize: '42px'
          }
        }
      ]
    }
  ],
  notes: {
    title: 'Kit',
    subtitle: 'Uncaged Reaper',
    content: `Kit is the second ranger comes to life in <a href="https://www.ambrus.studio/worldview" target="_blank" rel="noopener"><strong>E4C Verse</strong></a>. We crafted 15 superb 3D arts as our one-of-one NFTs, each having a meaningful background, the most special texture and color combinations, and ultimately unique vibes.<br/><br/>He will also make an appearance in our upcoming game, <a href="https://youtu.be/oB_rvxzTRzE" target="_blank" rel="noopener"><strong>E4C Final Salvation</strong></a>.`
  },
  actions: {
    text: 'Sign up and get 5% off bidding price',
    button: 'RSVP FOR THE AUCTION', // Bid on Opensea
    link: 'https://forms.gle/Qz2nudXzH8bYJxH2A',
    buttonStyle: {
      backgroundColor: '#FF4125' // #2081E2
    }
  }
}
