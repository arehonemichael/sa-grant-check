import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeNavigator } from './HomeNavigator';
import { NewsNavigator } from './NewsNavigator';
import { GuideNavigator } from './GuideNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootTabParamList } from '../types';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
  Home: 'home-outline',
  News: 'newspaper-outline',
  Guide: 'book-outline',
  Settings: 'settings-outline',
};

export function RootNavigator() {
  const { colors } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '900' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size ?? 24} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="News" component={NewsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Guide" component={GuideNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings & About' }} />
    </Tab.Navigator>
  );
}
