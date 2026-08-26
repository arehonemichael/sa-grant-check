# SA Grant Check – R370 & R350

Independent Expo/React Native information app for South Africa's SRD grant.

## Important

This is not a SASSA app and is not affiliated with or endorsed by SASSA or the South African government. It does not collect ID numbers or SRD cellphone numbers. Status checks, applications, reconsiderations and appeals open the real SASSA website through `expo-web-browser`.

## Run locally

```powershell
npm install
npx expo start --clear
```

## Release checks

```powershell
npx tsc --noEmit
npx expo-doctor
```

## EAS Android builds

Install EAS CLI globally:

```powershell
npm install -g eas-cli
```

Then:

```powershell
eas login
eas build:configure
eas build --platform android --profile preview
eas build --platform android --profile production
```

The preview profile produces an APK for testing. The production profile produces an Android App Bundle (AAB) for Google Play.
