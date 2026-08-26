import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { useApp } from '../../context/AppContext';
import { estimatePaymentWindow } from '../../utils/estimator';
import { radius, spacing, type } from '../../theme/tokens';

export function EstimatorScreen() {
  const { colors } = useApp();
  const [digit, setDigit] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const result = useMemo(() => estimatePaymentWindow(digit, month), [digit, month]);

  return (
    <Screen>
      <Heading
        eyebrow="UNOFFICIAL ESTIMATE"
        title="Payment Date Estimator"
        subtitle="This tool does not know your real payment date and does not connect to SASSA."
      />
      <Card title="1. Select your ID last digit">
        <View style={styles.grid}>
          {Array.from({ length: 10 }, (_, i) => (
            <Pressable
              key={i}
              onPress={() => setDigit(i)}
              style={[
                styles.chip,
                { borderColor: colors.border, backgroundColor: digit === i ? colors.primary : colors.surface },
              ]}
            >
              <Text style={{ color: digit === i ? '#FFFFFF' : colors.text, fontWeight: '900' }}>{i}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card title="2. Select approval month">
        <View style={styles.grid}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <Pressable
              key={m}
              onPress={() => setMonth(m)}
              style={[
                styles.monthChip,
                { borderColor: colors.border, backgroundColor: month === m ? colors.primary : colors.surface },
              ]}
            >
              <Text style={{ color: month === m ? '#FFFFFF' : colors.text, fontWeight: '800' }}>
                {new Intl.DateTimeFormat('en-ZA', { month: 'short' }).format(new Date(2026, m - 1, 1))}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card title={result.label}>
        <Text style={[styles.result, { color: colors.text }]}>{result.explanation}</Text>
        <Text style={[styles.caveat, { color: colors.warning }]}>{result.caveat}</Text>
      </Card>
      <Disclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { width: 48, height: 44, borderWidth: 1, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  monthChip: { minWidth: 70, paddingHorizontal: 12, height: 42, borderWidth: 1, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  result: { fontSize: type.body, lineHeight: 23 },
  caveat: { marginTop: spacing.sm, fontSize: type.small, lineHeight: 20, fontWeight: '800' },
});
