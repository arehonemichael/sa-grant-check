import React from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Disclaimer } from '../../components/Disclaimer';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import type { HomeStackParamList } from '../../types';
import { OFFICIAL_APPLY_URL, OFFICIAL_STATUS_URL } from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

type StatusProps = NativeStackScreenProps<HomeStackParamList, 'Status'>;
type ApplyProps = NativeStackScreenProps<HomeStackParamList, 'Apply'>;

function ActionBody({ kind }: { kind: 'status' | 'apply' }) {
  const { colors } = useApp();
  const isStatus = kind === 'status';
  const url = isStatus ? OFFICIAL_STATUS_URL : OFFICIAL_APPLY_URL;

  return (
    <Screen>
      <Heading
        eyebrow="SASSA WEBSITE"
        title={isStatus ? 'Check SRD Status' : 'Apply / Reapply for SRD'}
        subtitle={isStatus ? 'Continue to SASSA’s real SRD status page in a browser.' : 'Continue to SASSA’s real SRD website in a browser.'}
      />
      <Disclaimer />
      <Card title="Before you continue">
        <Text style={[styles.body, { color: colors.text }]}>
          {isStatus
            ? 'Enter your ID number and application cellphone number only after the SASSA website opens. SA Grant Check never receives or stores those details.'
            : 'Your application is completed with SASSA. SA Grant Check does not receive, submit, process or store your application.'}
        </Text>
        <Text style={[styles.url, { color: colors.secondary }]}>{url}</Text>
      </Card>
      <Button label={isStatus ? 'Open SASSA status page' : 'Open SASSA application site'} onPress={() => openOfficialSite(url)} />
    </Screen>
  );
}

export function StatusScreen(_props: StatusProps) {
  return <ActionBody kind="status" />;
}

export function ApplyScreen(_props: ApplyProps) {
  return <ActionBody kind="apply" />;
}

const styles = StyleSheet.create({
  body: { fontSize: type.body, lineHeight: 23 },
  url: { fontSize: type.small, fontWeight: '800', marginTop: 12 },
});
