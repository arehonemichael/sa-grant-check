import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { spacing, type } from '../theme/tokens';

export function Heading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  const { colors } = useApp();
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text> : null}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  eyebrow: { fontSize: type.tiny, fontWeight: '900', letterSpacing: 1.4, marginBottom: 6 },
  title: { fontSize: type.h1, lineHeight: 33, fontWeight: '900' },
  subtitle: { fontSize: type.body, lineHeight: 22, marginTop: spacing.xs },
});
