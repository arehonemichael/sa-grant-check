import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useApp } from '../context/AppContext';
import { radius, spacing, type } from '../theme/tokens';

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}) {
  const { colors } = useApp();
  const backgroundColor = variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.surface : 'transparent';
  const borderColor = variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.secondary : colors.border;
  const textColor = variant === 'primary' ? '#FFFFFF' : variant === 'secondary' ? colors.secondary : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor, borderColor, opacity: pressed ? 0.75 : 1 },
        style,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  label: { fontSize: type.body, fontWeight: '900', textAlign: 'center' },
});
