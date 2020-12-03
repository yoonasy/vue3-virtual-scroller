import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'Vue3VirtualScroller',
    file: 'dist/vue3-virtual-scroller.min.js',
    format: 'iife',
    sourcemap: true,
    global: {
      vue: 'Vue',
    },
  },
})

config.plugins.push(terser({}))

export default config
