import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import type { NewsFeed, ThemePreference } from '../types';
import { darkColors, lightColors } from '../theme/tokens';
import {
  getBookmarks,
  getOnboardingComplete,
  getThemePreference,
  setBookmarks,
  setThemePreference,
} from '../services/storage';
import { loadNews } from '../services/news';

type AppContextType = {
  ready: boolean;
  onboardingComplete: boolean;
  setOnboardingCompleteState: (value: boolean) => void;
  themePreference: ThemePreference;
  setThemePreferenceState: (value: ThemePreference) => Promise<void>;
  isDark: boolean;
  colors: typeof lightColors;
  bookmarks: string[];
  toggleBookmark: (id: string) => Promise<void>;
  feed: NewsFeed | null;
  refreshNews: () => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const [themePreference, setThemePreferenceStateInternal] = useState<ThemePreference>('system');
  const [bookmarks, setBookmarksState] = useState<string[]>([]);
  const [feed, setFeed] = useState<NewsFeed | null>(null);
  const systemScheme = Appearance.getColorScheme();

  useEffect(() => {
    (async () => {
      const [onboarded, pref, savedBookmarks, initialFeed] = await Promise.all([
        getOnboardingComplete(),
        getThemePreference(),
        getBookmarks(),
        loadNews(),
      ]);
      setOnboardingCompleteState(onboarded);
      setThemePreferenceStateInternal(pref);
      setBookmarksState(savedBookmarks);
      setFeed(initialFeed);
      setReady(true);
    })();
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

  async function refreshNews() {
    setFeed(await loadNews());
  }

  const isDark = themePreference === 'dark' || (themePreference === 'system' && systemScheme === 'dark');

  const value = useMemo(
    () => ({
      ready,
      onboardingComplete,
      setOnboardingCompleteState,
      themePreference,
      setThemePreferenceState,
      isDark,
      colors: (isDark ? darkColors : lightColors) as typeof lightColors,
      bookmarks,
      toggleBookmark,
      feed,
      refreshNews,
    }),
    [ready, onboardingComplete, themePreference, isDark, bookmarks, feed]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
