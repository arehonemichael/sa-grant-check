export type ThemePreference = 'system' | 'light' | 'dark';

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  imageLabel?: string;
  sourceName: string;
  sourceUrl: string;
};

export type NewsFeed = {
  version: number;
  updatedAt: string;
  articles: NewsArticle[];
};

export type StatusKind = 'Approved' | 'Pending' | 'Declined' | 'Reconsideration';

export type RootTabParamList = {
  Home: undefined;
  News: undefined;
  Guide: undefined;
  Settings: undefined;
};

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: { id: string };
};

export type GuideStackParamList = {
  GuideHome: undefined;
  StatusMeanings: undefined;
  Estimator: undefined;
  FAQ: undefined;
  Appeal: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Status: undefined;
  Apply: undefined;
};
