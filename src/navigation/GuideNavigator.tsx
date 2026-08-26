import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { GuideStackParamList } from '../types';
import { GuideHomeScreen } from '../screens/guide/GuideHomeScreen';
import { StatusMeaningsScreen } from '../screens/guide/StatusMeaningsScreen';
import { EstimatorScreen } from '../screens/guide/EstimatorScreen';
import { FAQScreen } from '../screens/guide/FAQScreen';
import { AppealScreen } from '../screens/guide/AppealScreen';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator<GuideStackParamList>();

export function GuideNavigator() {
  const { colors } = useApp();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '900' } }}>
      <Stack.Screen name="GuideHome" component={GuideHomeScreen} options={{ title: 'Guide' }} />
      <Stack.Screen name="StatusMeanings" component={StatusMeaningsScreen} options={{ title: 'Status meanings' }} />
      <Stack.Screen name="Estimator" component={EstimatorScreen} options={{ title: 'Payment estimator' }} />
      <Stack.Screen name="FAQ" component={FAQScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen name="Appeal" component={AppealScreen} options={{ title: 'Reconsideration' }} />
    </Stack.Navigator>
  );
}
