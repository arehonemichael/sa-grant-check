import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { Button } from '../../components/Button';
import { OFFICIAL_STATUS_URL, SRD_ROOT_URL } from '../../constants/legal';
import { openOfficialSite } from '../../services/browser';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

export function AppealScreen() {
  const { colors } = useApp();
  return (
    <Screen>
      <Heading
        title="Reconsideration / appeal explainer"
        subtitle="The correct next step depends on the exact reason and period shown in your official result."
      />
      <Card title="Start with your official result">
        <Text style={[styles.body, { color: colors.text }]}>
          Check the exact status and reason for the relevant period. Do not send your ID number or application phone number to this app or to people claiming they can appeal for you.
        </Text>
      </Card>
      <Card title="Use official channels only">
        <Text style={[styles.body, { color: colors.text }]}>
          If the official SASSA service provides a reconsideration or appeal route for your result, follow the instructions shown there. Rules and routes can change, so this app links you back to the official source rather than copying a form.
        </Text>
      </Card>
      <Button label="Open official status page" onPress={() => openOfficialSite(OFFICIAL_STATUS_URL)} />
      <Button label="Open official SRD website" variant="secondary" onPress={() => openOfficialSite(SRD_ROOT_URL)} />
      <Disclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({ body: { fontSize: type.body, lineHeight: 23 } });
