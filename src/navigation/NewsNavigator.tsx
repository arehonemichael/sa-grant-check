import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NewsStackParamList } from '../types';
import { NewsListScreen } from '../screens/news/NewsListScreen';
import { NewsDetailScreen } from '../screens/news/NewsDetailScreen';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator<NewsStackParamList>();

export function NewsNavigator() {
  const { colors } = useApp();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '900' } }}>
      <Stack.Screen name="NewsList" component={NewsListScreen} options={{ title: 'News' }} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'Article' }} />
    </Stack.Navigator>
  );
}
