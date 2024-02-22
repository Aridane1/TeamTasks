module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        version: '4.0.3', // Versión de MongoDB, asegúrate de usar una versión compatible con tus necesidades
        skipMD5: true
      },
      autoStart: false
    }
  };
  