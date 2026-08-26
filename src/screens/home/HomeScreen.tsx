import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { NewsCard } from '../../components/NewsCard';
import { useApp } from '../../context/AppContext';
import type { HomeStackParamList } from '../../types';
import { CALL_DISPLAY, CALL_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../../constants/legal';
import { spacing, type } from '../../theme/tokens';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  const { colors, feed } = useApp();
  const latest = feed?.articles.slice(0, 3) ?? [];

  return (
    <Screen>
      <Heading
        eyebrow="INDEPENDENT SRD INFORMATION"
        title="SA Grant Check – R370 & R350"
        subtitle="Understand your status, read simple grant guidance and reach SASSA's own website safely."
      />

      <View style={[styles.hero, { backgroundColor: colors.navy }]}> 
        <Text style={[styles.heroLabel, { color: colors.accent }]}>SRD QUICK ACTIONS</Text>
        <Text style={styles.heroTitle}>Your personal grant details never enter this app.</Text>
        <Button label="Check SRD Status" onPress={() => navigation.navigate('Status')} />
        <Button label="Apply / Reapply for SRD" variant="secondary" onPress={() => navigation.navigate('Apply')} />
      </View>

      <Card title="What you'll need">
        <Text style={[styles.bullet, { color: colors.text }]}>• Your South African ID number</Text>
        <Text style={[styles.bullet, { color: colors.text }]}>• The cellphone number used for your application</Text>
        <Text style={[styles.warning, { color: colors.primaryStrong, backgroundColor: colors.surfaceMuted }]}>You enter these only after SASSA's website opens. SA Grant Check has no field for them.</Text>
      </Card>

      <Card title="Quick contact links">
        <Text style={[styles.contact, { color: colors.text }]}>WhatsApp: {WHATSAPP_DISPLAY}</Text>
        <Button label="Open WhatsApp" variant="secondary" onPress={() => Linking.openURL(WHATSAPP_URL)} />
        <Text style={[styles.contact, { color: colors.text }]}>Call Centre: {CALL_DISPLAY}</Text>
        <Button label="Call" variant="secondary" onPress={() => Linking.openURL(CALL_URL)} />
      </Card>

      <Heading title="Latest updates" subtitle="These articles are included with the app and remain available offline." />
      {latest.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onPress={() => navigation.getParent()?.navigate('News', {
            screen: 'NewsDetail',
            params: { id: article.id },
          })}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 24, padding: spacing.md, marginBottom: spacing.md },
  heroLabel: { fontSize: type.tiny, fontWeight: '900', letterSpacing: 1.3, marginBottom: 8 },
  heroTitle: { color: '#FFFFFF', fontSize: 23, lineHeight: 29, fontWeight: '900', marginBottom: spacing.md },
  bullet: { fontSize: type.body, lineHeight: 23, marginBottom: 8 },
  warning: { fontSize: type.small, lineHeight: 20, fontWeight: '700', borderRadius: 12, padding: 12, marginTop: 8 },
  contact: { fontSize: type.body, fontWeight: '800', marginBottom: 8 },
});
