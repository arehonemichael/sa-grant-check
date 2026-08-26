import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DISCLAIMER } from '../constants/legal';
import { useApp } from '../context/AppContext';
import { radius, spacing, type } from '../theme/tokens';

export function Disclaimer() {
  const { colors } = useApp();
  return (
    <View style={[styles.box, { backgroundColor: colors.disclaimer, borderColor: colors.disclaimerBorder }]}>
      <Text style={[styles.title, { color: colors.text }]}>Independent app notice</Text>
      <Text style={[styles.body, { color: colors.text }]}>{DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  title: { fontSize: type.body, fontWeight: '900', marginBottom: 6 },
  body: { fontSize: type.small, lineHeight: 20 },
});
