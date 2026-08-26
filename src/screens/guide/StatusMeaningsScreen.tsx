import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { Disclaimer } from '../../components/Disclaimer';
import { useApp } from '../../context/AppContext';
import { type } from '../../theme/tokens';

const items = [
  ['Approved', 'Your application passed the relevant checks for that period. A payment date can appear separately, so approved does not always mean the money is already available.'],
  ['Pending', 'Processing for that period is still underway and a final result is not available yet.'],
  ['Declined', 'The application did not pass one or more checks for that period. Read the exact reason on the official status result before taking the next step.'],
  ['Reconsideration', 'A previous result is being reviewed again after a reconsideration request. The result can remain under review while further checks are completed.'],
];

export function StatusMeaningsScreen() {
  const { colors } = useApp();
  return (
    <Screen>
      <Heading title="What the status results mean" />
      {items.map(([title, body]) => (
        <Card key={title} title={title}>
          <Text style={[styles.body, { color: colors.text }]}>{body}</Text>
        </Card>
      ))}
      <Disclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({ body: { fontSize: type.body, lineHeight: 23 } });
