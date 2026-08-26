import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import type { NewsFeed, ThemePreference } from '../types';
import { darkColors, lightColors } from '../theme/tokens';
import {
  getBookmarks,
  getNotificationsEnabled,
  getOnboardingComplete,
  getThemePreference,
  setBookmarks,
  setNotificationsEnabled,
  setThemePreference,
} from '../services/storage';
import { loadNews, refreshRemoteNews } from '../services/news';
import { enableNotifications, notifyForNewArticles } from '../services/notifications';

type AppContextType = {
  ready: boolean;
  onboardingComplete: boolean;
  setOnboardingCompleteState: (value: boolean) => void;
  themePreference: ThemePreference;
  setThemePreferenceState: (value: ThemePreference) => Promise<void>;
  colors: typeof lightColors;
  bookmarks: string[];
  toggleBookmark: (id: string) => Promise<void>;
  notificationsEnabled: boolean;
  toggleNotifications: (value: boolean) => Promise<boolean>;
  feed: NewsFeed | null;
  refreshNews: () => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const [themePreference, setThemePreferenceStateInternal] = useState<ThemePreference>('system');
  const [bookmarks, setBookmarksState] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [feed, setFeed] = useState<NewsFeed | null>(null);
  const systemScheme = Appearance.getColorScheme();

  useEffect(() => {
    (async () => {
      const [onboarded, pref, savedBookmarks, notif, initialFeed] = await Promise.all([
        getOnboardingComplete(),
        getThemePreference(),
        getBookmarks(),
        getNotificationsEnabled(),
        loadNews(),
      ]);
      setOnboardingCompleteState(onboarded);
      setThemePreferenceStateInternal(pref);
      setBookmarksState(savedBookmarks);
      setNotificationsEnabledState(notif);
      setFeed(initialFeed);
      await notifyForNewArticles(initialFeed);
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const remote = await refreshRemoteNews();
      if (remote) {
        setFeed(remote);
        await notifyForNewArticles(remote);
      }
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function setThemePreferenceState(value: ThemePreference) {
    setThemePreferenceStateInternal(value);
    await setThemePreference(value);
  }

  async function toggleBookmark(id: string) {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    setBookmarksState(next);
    await setBookmarks(next);
  }

  async function toggleNotifications(value: boolean) {
    if (value) {
      const granted = await enableNotifications();
      if (!granted) return false;
    }
    setNotificationsEnabledState(value);
    await setNotificationsEnabled(value);
    return true;
  }

  async function refreshNews() {
    const next = await loadNews({ forceRemote: true });
    setFeed(next);
    await notifyForNewArticles(next);
  }

  const effectiveDark =
    themePreference === 'dark' || (themePreference === 'system' && systemScheme === 'dark');

  const value = useMemo(
    () => ({
      ready,
      onboardingComplete,
      setOnboardingCompleteState,
      themePreference,
      setThemePreferenceState,
      colors: (effectiveDark ? darkColors : lightColors) as typeof lightColors,
      bookmarks,
      toggleBookmark,
      notificationsEnabled,
      toggleNotifications,
      feed,
      refreshNews,
    }),
    [ready, onboardingComplete, themePreference, effectiveDark, bookmarks, notificationsEnabled, feed]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
