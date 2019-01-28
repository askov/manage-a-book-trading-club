// vue.config.js
module.exports = {
  configureWebpack: {
    target: "node",
    externals: {
      canvas: "commonjs canvas" // Important (2)
    }
  }
}
