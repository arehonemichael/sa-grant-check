import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { Button } from '../../components/Button';
import { OFFICIAL_RECONSIDERATION_URL } from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

export function ReconsiderationScreen() {
  const { colors } = useApp();

  return (
    <Screen>
      <Heading
        eyebrow="SASSA WEBSITE"
        title="Reconsideration"
        subtitle="Use SASSA's website to lodge or check a reconsideration when that route applies to your result."
      />
      <Disclaimer />
      <Card title="Before you continue">
        <Text style={[styles.body, { color: colors.text }]}>SA Grant Check does not lodge reconsiderations and never asks for your ID number, cellphone number or grant credentials. Enter personal details only after the SASSA website opens.</Text>
        <Text style={[styles.url, { color: colors.secondary }]}>{OFFICIAL_RECONSIDERATION_URL}</Text>
      </Card>
      <Button label="Open SASSA reconsideration page" onPress={() => openOfficialSite(OFFICIAL_RECONSIDERATION_URL)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: type.body, lineHeight: 23 },
  url: { fontSize: type.small, fontWeight: '800', marginTop: 12 },
});
