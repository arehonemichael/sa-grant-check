import React, { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Heading } from '../../components/Heading';
import { NewsCard } from '../../components/NewsCard';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useApp } from '../../context/AppContext';
import type { NewsStackParamList } from '../../types';

type Props = NativeStackScreenProps<NewsStackParamList, 'NewsList'>;

export function NewsListScreen({ navigation }: Props) {
  const { feed, refreshNews, bookmarks } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      await refreshNews();
    } finally {
      setRefreshing(false);
    }
  }

  const articles = (feed?.articles ?? []).filter((article) => !savedOnly || bookmarks.includes(article.id));

  return (
    <Screen refreshing={refreshing} onRefresh={refresh}>
      <Heading
        eyebrow="AVAILABLE OFFLINE"
        title="News & updates"
        subtitle="Helpful SRD information is bundled with the app, so these articles remain available without a data connection."
      />
      <Card>
        <Button
          label={savedOnly ? 'Show all articles' : `Show saved articles (${bookmarks.length})`}
          variant="secondary"
          onPress={() => setSavedOnly(!savedOnly)}
        />
      </Card>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} onPress={() => navigation.navigate('NewsDetail', { id: article.id })} />
      ))}
    </Screen>
  );
}
