import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { NewsCard } from '../../components/NewsCard';
import { ActionCard, type ActionIconName } from '../../components/ActionCard';
import { useApp } from '../../context/AppContext';
import type { HomeStackParamList } from '../../types';
import {
  CALL_DISPLAY,
  CALL_URL,
  OFFICIAL_APPEAL_URL,
  OFFICIAL_APPLY_URL,
  OFFICIAL_RECONSIDERATION_URL,
  OFFICIAL_STATUS_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { spacing, type } from '../../theme/tokens';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

type HomeAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: ActionIconName;
  onPress: () => void;
};

export function HomeScreen({ navigation }: Props) {
  const { colors, feed } = useApp();
  const latest = feed?.articles.slice(0, 3) ?? [];

  const actions: HomeAction[] = [
    {
      id: 'status',
      title: 'Check Status',
      subtitle: 'Open the SASSA SRD status page',
      icon: 'checkmark-circle-outline',
      onPress: () => openOfficialSite(OFFICIAL_STATUS_URL),
    },
    {
      id: 'apply',
      title: 'Apply / Reapply',
      subtitle: 'Open the SASSA SRD application page',
      icon: 'document-text-outline',
      onPress: () => openOfficialSite(OFFICIAL_APPLY_URL),
    },
    {
      id: 'reconsideration',
      title: 'Reconsideration',
      subtitle: 'Open the SASSA reconsideration page',
      icon: 'refresh-outline',
      onPress: () => openOfficialSite(OFFICIAL_RECONSIDERATION_URL),
    },
    {
      id: 'appeal',
      title: 'Lodge / Check Appeal',
      subtitle: 'Open the ITSAA appeal page',
      icon: 'scale-outline',
      onPress: () => openOfficialSite(OFFICIAL_APPEAL_URL),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Help',
      subtitle: WHATSAPP_DISPLAY,
      icon: 'logo-whatsapp',
      onPress: () => Linking.openURL(WHATSAPP_URL),
    },
    {
      id: 'call',
      title: 'Call Centre',
      subtitle: CALL_DISPLAY,
      icon: 'call-outline',
      onPress: () => Linking.openURL(CALL_URL),
    },
  ];

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
      </View>

      <View style={styles.actionGrid}>
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            title={action.title}
            subtitle={action.subtitle}
            icon={action.icon}
            onPress={action.onPress}
          />
        ))}
      </View>

      <Card title="What you'll need">
        <Text style={[styles.bullet, { color: colors.text }]}>• Your South African ID number</Text>
        <Text style={[styles.bullet, { color: colors.text }]}>• The cellphone number used for your application</Text>
        <Text style={[styles.warning, { color: colors.primaryStrong, backgroundColor: colors.surfaceMuted }]}>You enter these only after SASSA's website opens. SA Grant Check has no field for them.</Text>
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
  heroTitle: { color: '#FFFFFF', fontSize: 23, lineHeight: 29, fontWeight: '900' },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  bullet: { fontSize: type.body, lineHeight: 23, marginBottom: 8 },
  warning: { fontSize: type.small, lineHeight: 20, fontWeight: '700', borderRadius: 12, padding: 12, marginTop: 8 },
});
