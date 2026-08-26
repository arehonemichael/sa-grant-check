import { bundledNewsFeed } from '../data/localNews';
import type { NewsFeed } from '../types';

function sortFeed(feed: NewsFeed): NewsFeed {
  return {
    ...feed,
    articles: [...feed.articles].sort((a, b) => b.date.localeCompare(a.date)),
  };
}

export async function loadNews(): Promise<NewsFeed> {
  return sortFeed(bundledNewsFeed);
}
