import 'dotenv/config';

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
      backgroundColor: '#F4F7F8',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'za.co.sagrantcheck.app',
    },
    android: {
      package: 'za.co.sagrantcheck.app',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#F4F7F8',
      },
    },
    plugins: [
      [
        'expo-notifications',
        {
          color: '#0F766E'
        }
      ],
    ],
    extra: {
      newsFeedUrl: process.env.EXPO_PUBLIC_NEWS_FEED_URL ?? '',
      supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL ?? 'support@example.com',
      playStoreUrl: process.env.EXPO_PUBLIC_PLAY_STORE_URL ?? '',
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? ''
      }
    }
  }
};
