// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(src) {
  return path.join(__dirname, src)
}

module.exports = {
  // publicPath: '/vue3-virtual-scroller/',
  outputDir: '../docs',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, '..', 'docs'),
  },
  chainWebpack: (config) => {
    // 引用上层会自动导入一次vue 因为配备了别名进行导入 所以这里导入的别名指向上一层的vue
    config.resolve.alias.set('vue$', resolve('../node_modules/vue'))
  },
}
