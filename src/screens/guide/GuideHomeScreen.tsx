import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import type { GuideStackParamList } from '../../types';

type Props = NativeStackScreenProps<GuideStackParamList, 'GuideHome'>;

export function GuideHomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <Heading
        eyebrow="PLAIN LANGUAGE"
        title="SRD guide"
        subtitle="Understand common status results and the next steps without pretending this app controls your application."
      />
      <Card title="Status results">
        <Button label="Approved, Pending, Declined & Reconsideration" onPress={() => navigation.navigate('StatusMeanings')} />
      </Card>
      <Card title="Payment Date Estimator">
        <Button label="Open unofficial estimator" onPress={() => navigation.navigate('Estimator')} />
      </Card>
      <Card title="Questions & next steps">
        <Button label="Frequently asked questions" variant="secondary" onPress={() => navigation.navigate('FAQ')} />
        <Button label="Appeal / reconsideration explainer" variant="secondary" onPress={() => navigation.navigate('Appeal')} />
      </Card>
    </Screen>
  );
}
