import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import type { NewsFeed } from '../types';
import {
  getNotificationsEnabled,
  getSeenArticleIds,
  setSeenArticleIds,
} from './storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function enableNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('grant-news', {
      name: 'Grant news',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }
  return status === 'granted';
}

export async function notifyForNewArticles(feed: NewsFeed) {
  const enabled = await getNotificationsEnabled();
  const seen = await getSeenArticleIds();
  const ids = feed.articles.map((a) => a.id);

  if (seen.length === 0) {
    await setSeenArticleIds(ids);
    return;
  }

  const newArticles = feed.articles.filter((a) => !seen.includes(a.id));
  await setSeenArticleIds(ids);

  if (!enabled || newArticles.length === 0) return;

  const newest = newArticles[0];
  await Notifications.scheduleNotificationAsync({
    content: {
      title: newArticles.length === 1 ? 'New grant update' : `${newArticles.length} new grant updates`,
      body: newest.title,
      data: { articleId: newest.id },
    },
    trigger: null,
  });
}
