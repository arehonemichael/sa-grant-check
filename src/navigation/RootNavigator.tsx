import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { NewsNavigator } from './NewsNavigator';
import { GuideNavigator } from './GuideNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootTabParamList } from '../types';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  const { colors } = useApp();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '900' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="News" component={NewsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Guide" component={GuideNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings & About' }} />
    </Tab.Navigator>
  );
}
