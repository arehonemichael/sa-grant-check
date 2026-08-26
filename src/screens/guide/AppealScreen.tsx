import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { Button } from '../../components/Button';
import { OFFICIAL_APPEAL_URL } from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

export function AppealScreen() {
  const { colors } = useApp();

  return (
    <Screen>
      <Heading
        eyebrow="ITSAA / SASSA WEBSITE"
        title="Appeal"
        subtitle="Lodge or check an SRD appeal using the SASSA appeal page in a browser."
      />
      <Disclaimer />
      <Card title="Before you continue">
        <Text style={[styles.body, { color: colors.text }]}>SA Grant Check does not lodge or process appeals. Do not send your ID number, cellphone number, OTPs or grant credentials to this app or to third parties claiming they can change your result.</Text>
        <Text style={[styles.url, { color: colors.secondary }]}>{OFFICIAL_APPEAL_URL}</Text>
      </Card>
      <Button label="Open SASSA appeal page" onPress={() => openOfficialSite(OFFICIAL_APPEAL_URL)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: type.body, lineHeight: 23 },
  url: { fontSize: type.small, fontWeight: '800', marginTop: 12 },
});
