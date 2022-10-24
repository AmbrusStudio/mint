import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Montserrat',
        montserrat: {
          name: 'Montserrat',
          weights: [300, 400, 500, 600, 700, 800],
          italic: true
        },
        teko: { name: 'Teko', weights: [300, 400, 500, 600, 700] },
        zenKaku: { name: 'Zen Kaku Gothic New', weights: [300, 400, 500, 700] }
      }
    })
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      rust: '#FF4125',
      greyDark: '#465358',
      greyLight: '#A8A8A8',
      greyMedium: '#A0A4B0',
      blackBg: '#2A2A2A',
      gameNavImg: 'linear-gradient(180deg, #3F3F3F 0%, #444444 100%)',
      white_1: '#f0f0f0',
      red_1: '#b7220c'
    },
    boxShadow: {
      'nft-sale': '0px 4px 12px rgba(0, 0, 0, 0.15)',
      'wallet-button': '0px 4px 10px rgba(0, 0, 0, 0.2)'
    },
    dropShadow: {
      'nft-modal': '0px 4px 24px rgba(0, 0, 0, 0.4)'
    }
  }
})
