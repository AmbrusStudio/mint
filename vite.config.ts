import RollupInject from '@rollup/plugin-inject'
import vue from '@vitejs/plugin-vue'
// Switch from @esbuild-plugins/node-modules-polyfill to node-stdlib-browser because of https://github.com/remorses/esbuild-plugins/issues/14
import NodeStdLibBrowser from 'node-stdlib-browser'
import Unocss from 'unocss/vite'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...RollupInject({
        global: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'global'],
        process: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'process'],
        Buffer: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'Buffer']
      }),
      enforce: 'post'
    },
    vue(),
    Unocss()
  ],
  optimizeDeps: {
    include: ['buffer', 'process']
  },
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '~@': fileURLToPath(new URL('./src', import.meta.url)), // for css
      ...NodeStdLibBrowser
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
