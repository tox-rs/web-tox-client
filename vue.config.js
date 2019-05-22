module.exports = {
    // ...other vue-cli plugin options...
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
          globDirectory: '.' ,
          globPatterns: ['dist/*.{js,png,html,css}'],
          maximumFileSizeToCacheInBytes : 20 * 1024 * 1024   
          // ...other Workbox options...
      }
    }
  }