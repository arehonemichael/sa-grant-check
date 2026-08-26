import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setOnboardingComplete } from '../services/storage';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Disclaimer } from '../components/Disclaimer';
import { radius, spacing, type } from '../theme/tokens';

const slides = [
  {
    title: 'Grant information without the clutter',
    body: 'Read status explanations, payment guidance and verified news in a fast native app that can keep useful content available offline.',
  },
  {
    title: 'Your grant details stay off this app',
    body: 'We do not ask for, collect, store or transmit your South African ID number or SRD cellphone number.',
  },
  {
    title: 'Official actions stay official',
    body: 'When you check a status or apply, we open SASSA’s real website in a browser. We never recreate their application or status forms.',
  },
];

export function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const { colors, setOnboardingCompleteState } = useApp();
  const slide = slides[index];

  async function continueFlow() {
    if (index < slides.length - 1) {
      setIndex(index + 1);
      return;
    }
    await setOnboardingComplete(true);
    setOnboardingCompleteState(true);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.brand, { color: colors.primary }]}>SA GRANT CHECK</Text>
        <View style={[styles.heroMark, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroText}>R370</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{slide.title}</Text>
        <Text style={[styles.body, { color: colors.textMuted }]}>{slide.body}</Text>

        {index === slides.length - 1 ? <Disclaimer /> : null}

        <View style={styles.bottom}>
          <Text style={[styles.step, { color: colors.textMuted }]}>{index + 1} of {slides.length}</Text>
          <Button label={index === slides.length - 1 ? 'I understand – continue' : 'Continue'} onPress={continueFlow} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  brand: { fontSize: type.tiny, letterSpacing: 2, fontWeight: '900', marginBottom: spacing.lg },
  heroMark: { width: 108, height: 108, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  heroText: { color: '#FFFFFF', fontSize: 29, fontWeight: '900' },
  title: { fontSize: 31, lineHeight: 37, fontWeight: '900', marginBottom: spacing.md },
  body: { fontSize: 17, lineHeight: 26, marginBottom: spacing.lg },
  bottom: { marginTop: spacing.lg },
  step: { textAlign: 'center', fontSize: type.small, marginBottom: spacing.sm },
});
