module.exports = {
    // ...other vue-cli plugin options...
    configureWebpack:{
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 250000,
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 250000,
        }
      }
    },
    pwa: {
      name: 'Zerho Chat',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: 'public/service-worker.js',
          importWorkboxFrom:'local',
          // ...other Workbox options...
      }
    }
  }