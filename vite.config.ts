import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirective from '@unocss/transformer-directives'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import Unocss from 'unocss/vite'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
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
      transformers: [transformerDirective()],
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
          'nft-sale': '0px 4px 12px rgba(0, 0, 0, 0.15)'
        },
        dropShadow: {
          'nft-modal': '0px 4px 24px rgba(0, 0, 0, 0.4)'
        }
      }
    }),
    !isProd &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      })
  ],
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '~@': fileURLToPath(new URL('./src', import.meta.url)), // for css
      'readable-stream': 'vite-compatible-readable-stream'
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
