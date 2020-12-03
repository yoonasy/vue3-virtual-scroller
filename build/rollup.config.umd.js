import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue3-virtual-scroller',
    file: 'dist/vue3-virtual-scroller.umd.js',
    format: 'umd',
    sourcemap: true,
  },
})

export default config
