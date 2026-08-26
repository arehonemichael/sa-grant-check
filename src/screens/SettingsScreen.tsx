import React from 'react';
import { Alert, Linking, StyleSheet, Switch, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Screen } from '../components/Screen';
import { Heading } from '../components/Heading';
import { Card } from '../components/Card';
import { Disclaimer } from '../components/Disclaimer';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import type { ThemePreference } from '../types';
import { SASSA_ROOT_URL, SRD_ROOT_URL } from '../constants/legal';
import { openOfficialSite } from '../services/browser';
import { spacing, type } from '../theme/tokens';

export function SettingsScreen() {
  const {
    colors,
    themePreference,
    setThemePreferenceState,
    notificationsEnabled,
    toggleNotifications,
  } = useApp();

  const supportEmail = Constants.expoConfig?.extra?.supportEmail as string;
  const playStoreUrl = Constants.expoConfig?.extra?.playStoreUrl as string;
  const version = Constants.expoConfig?.version ?? '1.0.0';

  async function setNotifications(value: boolean) {
    const ok = await toggleNotifications(value);
    if (value && !ok) Alert.alert('Notifications not enabled', 'Permission was not granted on this device.');
  }

  function ThemeButton({ value, label }: { value: ThemePreference; label: string }) {
    return (
      <Button
        label={`${themePreference === value ? '✓ ' : ''}${label}`}
        variant={themePreference === value ? 'primary' : 'secondary'}
        onPress={() => setThemePreferenceState(value)}
      />
    );
  }

  return (
    <Screen>
      <Heading eyebrow="ABOUT & PREFERENCES" title="Settings" />
      <Disclaimer />

      <Card title="Appearance">
        <ThemeButton value="system" label="Use device setting" />
        <ThemeButton value="light" label="Light mode" />
        <ThemeButton value="dark" label="Dark mode" />
      </Card>

      <Card title="Grant news notifications">
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.text }]}>Notify me when new feed articles are detected</Text>
            <Text style={[styles.help, { color: colors.textMuted }]}>
              The app checks for remote-feed changes while running. True server-pushed alerts require a push backend later.
            </Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={setNotifications} />
        </View>
      </Card>

      <Card title="Privacy">
        <Text style={[styles.body, { color: colors.text }]}>
          Bookmarks and settings are stored locally. Cached news is stored on your device. The app does not ask for, collect, store or transmit your ID number or SRD application cellphone number.
        </Text>
      </Card>

      <Card title="Sources">
        <Text style={[styles.body, { color: colors.text }]}>
          Government-related information in this app should be checked against the official SASSA and SRD websites.
        </Text>
        <Button label="SASSA website" variant="secondary" onPress={() => openOfficialSite(SASSA_ROOT_URL)} />
        <Button label="SRD website" variant="secondary" onPress={() => openOfficialSite(SRD_ROOT_URL)} />
      </Card>

      <Card title="App details">
        <Text style={[styles.body, { color: colors.text }]}>SA Grant Check – R370 & R350</Text>
        <Text style={[styles.body, { color: colors.text }]}>Version {version}</Text>
        <Text style={[styles.body, { color: colors.textMuted }]}>Independent, unofficial information app.</Text>
      </Card>

      <Card title="Support">
        <Button
          label={supportEmail || 'Set support email'}
          variant="secondary"
          onPress={() => supportEmail && Linking.openURL(`mailto:${supportEmail}?subject=SA%20Grant%20Check%20Support`)}
        />
        <Button
          label="Review on Google Play"
          variant="secondary"
          onPress={() => {
            if (playStoreUrl) Linking.openURL(playStoreUrl);
            else Alert.alert('Play Store URL not set', 'Add EXPO_PUBLIC_PLAY_STORE_URL to your .env file.');
          }}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  label: { fontSize: type.body, fontWeight: '800', lineHeight: 21 },
  help: { fontSize: type.small, lineHeight: 19, marginTop: 5 },
  body: { fontSize: type.body, lineHeight: 23, marginBottom: spacing.sm },
});
