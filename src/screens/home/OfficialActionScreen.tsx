import React from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Disclaimer } from '../../components/Disclaimer';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import type { HomeStackParamList } from '../../types';
import {
  OFFICIAL_APPEAL_URL,
  OFFICIAL_APPLY_URL,
  OFFICIAL_RECONSIDERATION_URL,
  OFFICIAL_STATUS_URL,
} from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

type ActionKind = 'status' | 'apply' | 'reconsideration' | 'appeal';

type ActionConfig = {
  title: string;
  subtitle: string;
  url: string;
  body: string;
  button: string;
};

const actionConfig: Record<ActionKind, ActionConfig> = {
  status: {
    title: 'Check SRD Status',
    subtitle: 'Continue to SASSA’s real SRD status page in a browser.',
    url: OFFICIAL_STATUS_URL,
    body: 'Enter your ID number and application cellphone number only after the SASSA website opens. SA Grant Check never receives or stores those details.',
    button: 'Open SASSA status page',
  },
  apply: {
    title: 'Apply / Reapply for SRD',
    subtitle: 'Continue to SASSA’s real SRD website in a browser.',
    url: OFFICIAL_APPLY_URL,
    body: 'Your application is completed with SASSA. SA Grant Check does not receive, submit, process or store your application.',
    button: 'Open SASSA application site',
  },
  reconsideration: {
    title: 'Reconsideration',
    subtitle: 'Continue to SASSA’s real reconsideration page in a browser.',
    url: OFFICIAL_RECONSIDERATION_URL,
    body: 'Reconsideration is completed on SASSA’s website. Do not enter your ID number, cellphone number or other application details anywhere inside SA Grant Check.',
    button: 'Open SASSA reconsideration page',
  },
  appeal: {
    title: 'Lodge / Check Appeal',
    subtitle: 'Continue to the SASSA / ITSAA appeal page in a browser.',
    url: OFFICIAL_APPEAL_URL,
    body: 'Appeals are completed on the official SASSA / ITSAA website. SA Grant Check does not receive, process or store appeal information.',
    button: 'Open appeal page',
  },
};

function ActionBody({ kind }: { kind: ActionKind }) {
  const { colors } = useApp();
  const action = actionConfig[kind];

  return (
    <Screen>
      <Heading eyebrow="SASSA WEBSITE" title={action.title} subtitle={action.subtitle} />
      <Disclaimer />
      <Card title="Before you continue">
        <Text style={[styles.body, { color: colors.text }]}>{action.body}</Text>
        <Text style={[styles.url, { color: colors.secondary }]}>{action.url}</Text>
      </Card>
      <Button label={action.button} onPress={() => openOfficialSite(action.url)} />
    </Screen>
  );
}

export function StatusScreen(_props: NativeStackScreenProps<HomeStackParamList, 'Status'>) {
  return <ActionBody kind="status" />;
}

export function ApplyScreen(_props: NativeStackScreenProps<HomeStackParamList, 'Apply'>) {
  return <ActionBody kind="apply" />;
}

export function ReconsiderationScreen(_props: NativeStackScreenProps<HomeStackParamList, 'Reconsideration'>) {
  return <ActionBody kind="reconsideration" />;
}

export function AppealScreen(_props: NativeStackScreenProps<HomeStackParamList, 'Appeal'>) {
  return <ActionBody kind="appeal" />;
}

const styles = StyleSheet.create({
  body: { fontSize: type.body, lineHeight: 23 },
  url: { fontSize: type.small, fontWeight: '800', marginTop: 12 },
});
