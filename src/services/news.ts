import Constants from 'expo-constants';
import { bundledNewsFeed } from '../data/localNews';
import type { NewsFeed } from '../types';
import { getCachedNews, setCachedNews } from './storage';

function isNewsFeed(value: unknown): value is NewsFeed {
  if (!value || typeof value !== 'object') return false;
  const feed = value as Partial<NewsFeed>;
  return (
    typeof feed.version === 'number' &&
    typeof feed.updatedAt === 'string' &&
    Array.isArray(feed.articles) &&
    feed.articles.every((article: any) =>
      article &&
      typeof article.id === 'string' &&
      typeof article.title === 'string' &&
      typeof article.date === 'string' &&
      typeof article.excerpt === 'string' &&
      Array.isArray(article.body) &&
      typeof article.sourceName === 'string' &&
      typeof article.sourceUrl === 'string'
    )
  );
}

function sortFeed(feed: NewsFeed): NewsFeed {
  return {
    ...feed,
    articles: [...feed.articles].sort((a, b) => b.date.localeCompare(a.date)),
  };
}

export async function loadNews(options?: { forceRemote?: boolean }): Promise<NewsFeed> {
  const cached = await getCachedNews();
  const remoteUrl = Constants.expoConfig?.extra?.newsFeedUrl as string | undefined;

  if (!options?.forceRemote && cached) {
    void refreshRemoteNews();
    return sortFeed(cached);
  }

  if (remoteUrl) {
    try {
      const response = await fetch(remoteUrl, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      if (!isNewsFeed(json)) throw new Error('Invalid news feed');
      const sorted = sortFeed(json);
      await setCachedNews(sorted);
      return sorted;
    } catch {
      // Fall through to cache/bundled content.
    }
  }

  return sortFeed(cached ?? bundledNewsFeed);
}

export async function refreshRemoteNews(): Promise<NewsFeed | null> {
  const remoteUrl = Constants.expoConfig?.extra?.newsFeedUrl as string | undefined;
  if (!remoteUrl) return null;

  try {
    const response = await fetch(remoteUrl, { headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    const json = await response.json();
    if (!isNewsFeed(json)) return null;
    const sorted = sortFeed(json);
    await setCachedNews(sorted);
    return sorted;
  } catch {
    return null;
  }
}
