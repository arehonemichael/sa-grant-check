import React from 'react';
import { StyleSheet, Text } from 'react-native';
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
  const { colors, themePreference, setThemePreferenceState } = useApp();
  const version = Constants.expoConfig?.version ?? '1.0.0';

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
      <Heading eyebrow="ABOUT & PREFERENCES" title="Settings & About" />
      <Disclaimer />

      <Card title="Appearance">
        <ThemeButton value="system" label="Use device setting" />
        <ThemeButton value="light" label="Light mode" />
        <ThemeButton value="dark" label="Dark mode" />
      </Card>

      <Card title="Privacy">
        <Text style={[styles.body, { color: colors.text }]}>Bookmarks, theme choice and onboarding acknowledgement are stored only on your device. SA Grant Check does not ask for, collect, store, cache or transmit your ID number, SRD cellphone number, banking information, OTPs or grant credentials.</Text>
      </Card>

      <Card title="Information sources">
        <Text style={[styles.body, { color: colors.text }]}>Government-related information should always be checked against SASSA's own websites. These links open outside the app content in a browser.</Text>
        <Button label="SASSA website" variant="secondary" onPress={() => openOfficialSite(SASSA_ROOT_URL)} />
        <Button label="SRD website" variant="secondary" onPress={() => openOfficialSite(SRD_ROOT_URL)} />
      </Card>

      <Card title="App details">
        <Text style={[styles.body, { color: colors.text }]}>SA Grant Check – R370 & R350</Text>
        <Text style={[styles.body, { color: colors.text }]}>Version {version}</Text>
        <Text style={[styles.body, { color: colors.textMuted }]}>Independent, unofficial information app.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: type.body, lineHeight: 23, marginBottom: spacing.sm },
});
