export default {
  expo: {
    name: 'SA Grant Check – R370 & R350',
    slug: 'sa-grant-check-r370-r350',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#F8F5EE',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'za.co.sagrantcheck.app',
    },
    android: {
      package: 'za.co.sagrantcheck.app',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#F8F5EE',
      },
    },
  },
};
