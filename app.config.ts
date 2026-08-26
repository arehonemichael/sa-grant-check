export default {
  expo: {
    name: 'SA Grant Check – R370 & R350',
    slug: 'sa-grant-check',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#007A4D',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'co.za.sagrantcheck.app',
    },
    android: {
      package: 'co.za.sagrantcheck.app',
      versionCode: 1,
      permissions: [],
      icon: './assets/icon.png',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#007A4D',
      },
    },
    extra: {
      eas: {
        projectId: '25e58c60-c6c5-4068-b51a-169724baa1ad',
      },
    },
  },
};
