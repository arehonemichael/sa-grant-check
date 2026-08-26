import React from 'react';
import { Share, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Disclaimer } from '../../components/Disclaimer';
import { useApp } from '../../context/AppContext';
import type { NewsStackParamList } from '../../types';
import { openOfficialSite } from '../../services/browser';
import { spacing, type } from '../../theme/tokens';

type Props = NativeStackScreenProps<NewsStackParamList, 'NewsDetail'>;

export function NewsDetailScreen({ route }: Props) {
  const { feed, colors, bookmarks, toggleBookmark } = useApp();
  const article = feed?.articles.find((a) => a.id === route.params.id);

  if (!article) {
    return <Screen><Text style={{ color: colors.text }}>Article not found.</Text></Screen>;
  }

  async function share() {
    await Share.share({
      message: `${article.title}\n\n${article.excerpt}\n\nSource: ${article.sourceUrl}`,
    });
  }

  return (
    <Screen>
      <View style={[styles.hero, { backgroundColor: colors.surfaceMuted }]}>
        <Text style={[styles.heroText, { color: colors.primary }]}>{article.imageLabel ?? 'Grant update'}</Text>
      </View>
      <Text style={[styles.date, { color: colors.accent }]}>{new Date(article.date).toLocaleDateString('en-ZA')}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
      {article.body.map((p, i) => <Text key={i} style={[styles.body, { color: colors.text }]}>{p}</Text>)}

      <Button
        label={bookmarks.includes(article.id) ? 'Remove bookmark' : 'Bookmark article'}
        onPress={() => toggleBookmark(article.id)}
      />
      <Button label="Share article" variant="secondary" onPress={share} />
      <Button label={`Source: ${article.sourceName}`} variant="ghost" onPress={() => openOfficialSite(article.sourceUrl)} />
      <Disclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 155, borderRadius: 22, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, marginBottom: spacing.md },
  heroText: { fontSize: 24, fontWeight: '900', textAlign: 'center' },
  date: { fontSize: type.small, fontWeight: '900' },
  title: { fontSize: 29, lineHeight: 35, fontWeight: '900', marginTop: 5, marginBottom: spacing.md },
  body: { fontSize: 16, lineHeight: 25, marginBottom: 14 },
});
