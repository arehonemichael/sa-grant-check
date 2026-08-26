import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ApplyScreen, StatusScreen } from '../screens/home/OfficialActionScreen';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  const { colors } = useApp();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '900' } }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'SA Grant Check' }} />
      <Stack.Screen name="Status" component={StatusScreen} options={{ title: 'Check Status' }} />
      <Stack.Screen name="Apply" component={ApplyScreen} options={{ title: 'Apply / Reapply' }} />
    </Stack.Navigator>
  );
}
