import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

const faqs = [
  ['Can I check my status inside this app?', 'No. The app opens SASSA’s official status page. You enter your details only on that official site.'],
  ['Does this app store my ID or phone number?', 'No. It has no grant-credential form, database or backend for those details.'],
  ['Why am I approved but have no payment date?', 'Approval and payment scheduling can happen at different stages. Check your official result again later.'],
  ['What if my status is declined?', 'Read the exact reason shown in the official result. Only use official reconsideration or appeal channels relevant to your case.'],
  ['Can this app speed up my grant?', 'No. This app does not process applications, approvals or payments.'],
  ['Is this app SASSA?', 'No. It is an independent information and news app.'],
];

export function FAQScreen() {
  const { colors } = useApp();
  return (
    <Screen>
      <Heading title="Frequently asked questions" />
      {faqs.map(([q, a]) => (
        <Card key={q} title={q}><Text style={[styles.body, { color: colors.text }]}>{a}</Text></Card>
      ))}
      <Disclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({ body: { fontSize: type.body, lineHeight: 23 } });
