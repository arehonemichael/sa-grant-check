import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemePreference } from '../types';

const KEYS = {
  bookmarks: 'bookmarks_v1',
  onboarding: 'onboarding_complete_v1',
  theme: 'theme_preference_v1',
};

export async function getBookmarks(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.bookmarks);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function setBookmarks(ids: string[]) {
  await AsyncStorage.setItem(KEYS.bookmarks, JSON.stringify(ids));
}

export async function getOnboardingComplete(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(KEYS.onboarding)) === 'true';
  } catch {
    return false;
  }
}

export async function setOnboardingComplete(value: boolean) {
  await AsyncStorage.setItem(KEYS.onboarding, value ? 'true' : 'false');
}

export async function getThemePreference(): Promise<ThemePreference> {
  try {
    const value = await AsyncStorage.getItem(KEYS.theme);
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  } catch {
    return 'system';
  }
}

export async function setThemePreference(value: ThemePreference) {
  await AsyncStorage.setItem(KEYS.theme, value);
}
