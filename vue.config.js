module.exports = {
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/styles/global.scss']
    }
  }
}
