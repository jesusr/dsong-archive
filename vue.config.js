module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dsong-archive/'
    : '/',

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/styles/global.scss']
    }
  }
}
