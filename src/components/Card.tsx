import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { radius, spacing, type } from '../theme/tokens';

export function Card({ title, children }: PropsWithChildren<{ title?: string }>) {
  const { colors } = useApp();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  title: { fontSize: type.h2, fontWeight: '900', marginBottom: spacing.sm },
});
