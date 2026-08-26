import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NewsFeed, ThemePreference } from '../types';

const KEYS = {
  newsCache: 'news_cache_v1',
  seenArticleIds: 'seen_article_ids_v1',
  bookmarks: 'bookmarks_v1',
  onboarding: 'onboarding_complete_v1',
  theme: 'theme_preference_v1',
  notifications: 'notifications_enabled_v1',
};

export async function getCachedNews(): Promise<NewsFeed | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.newsCache);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setCachedNews(feed: NewsFeed) {
  await AsyncStorage.setItem(KEYS.newsCache, JSON.stringify(feed));
}

export async function getSeenArticleIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.seenArticleIds);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function setSeenArticleIds(ids: string[]) {
  await AsyncStorage.setItem(KEYS.seenArticleIds, JSON.stringify(ids));
}

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
    const value = await AsyncStorage.getItem(KEYS.onboarding);
    return value === 'true';
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

    if (value === 'light' || value === 'dark' || value === 'system') {
      return value;
    }

    return 'system';
  } catch {
    return 'system';
  }
}

export async function setThemePreference(value: ThemePreference) {
  await AsyncStorage.setItem(KEYS.theme, value);
}

export async function getNotificationsEnabled(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(KEYS.notifications);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function setNotificationsEnabled(value: boolean) {
  await AsyncStorage.setItem(KEYS.notifications, value ? 'true' : 'false');
}