# SA Grant Check – R370 & R350

A polished independent Expo/React Native SRD information app.

## Important legal boundary

This is not a SASSA app. It does not impersonate SASSA and does not collect grant credentials. All real status checks and applications open the official SASSA SRD website with `expo-web-browser`.

## Install

Recommended baseline: Node.js 22.13+ for Expo SDK 57.

```powershell
npm install
npx expo install --fix
npx expo start --clear
```

If starting from create-expo-app instead:

```powershell
npx create-expo-app@latest sa-grant-check --template blank-typescript@sdk-57
cd sa-grant-check
npx expo install expo-web-browser expo-notifications expo-secure-store @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

## Configure

Copy:

```powershell
copy .env.example .env
```

Then set:

- `EXPO_PUBLIC_NEWS_FEED_URL`
- `EXPO_PUBLIC_SUPPORT_EMAIL`
- `EXPO_PUBLIC_PLAY_STORE_URL`
- `EXPO_PUBLIC_EAS_PROJECT_ID` after `eas init`

If the news URL is blank, the app automatically uses cached/bundled content.

## Remote JSON format

See `assets/sample-news-feed.json`.

Keep the feed small and trusted. Every article has:
- stable `id`
- `title`
- ISO-style `date`
- `excerpt`
- `body` array
- `sourceName`
- `sourceUrl`

The app validates the basic shape before caching the feed.

## Notifications

This scaffold supports:
- user-controlled notification permission
- Android notification channel
- local notification when a remote refresh detects a new article
- foreground polling every 15 minutes while the app is running

It does **not** claim to provide true background/server push yet. For reliable alerts while the app is closed, add an Expo Push Service backend or another push provider later.

On Android, push-notification testing requires a development build rather than Expo Go.

## EAS

```powershell
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --profile development --platform android
npx eas-cli@latest build --profile production --platform android
npx eas-cli@latest build --profile production --platform ios
```

## Before Play Store submission

1. Replace placeholder icon/splash assets with your final original artwork.
2. Set your real support email.
3. Set the production remote feed URL.
4. Set the Play Store URL after the listing exists.
5. Add a public privacy policy URL to the Play Console listing.
6. Complete the Play Console Government apps declaration truthfully as an unaffiliated app.
7. Verify every government-related claim against the official SASSA/SRD sources.
8. Consider removing or revising the Payment Date Estimator unless you can support its assumptions with reliable published information.
9. Test status/apply buttons on a physical Android and iPhone.
10. Run `npx expo-doctor` and `npm run typecheck`.

## What is stored

SecureStore:
- bookmark article IDs
- theme preference
- onboarding acknowledgement
- notification preference

AsyncStorage:
- cached news JSON
- previously seen article IDs

Never store:
- ID numbers
- SRD cellphone numbers
- OTPs
- bank information
- SASSA passwords/credentials
