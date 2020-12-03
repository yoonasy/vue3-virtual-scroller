import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue3-virtual-scroller',
    file: 'dist/vue3-virtual-scroller.esm.js',
    format: 'es',
    sourcemap: true,
  },
  external: [
    ...base.external,
    'scrollparent',
    'vue3-observe-visibility',
    'vue3-resize',
  ],
})

export default config
