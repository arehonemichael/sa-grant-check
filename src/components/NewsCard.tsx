import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NewsArticle } from '../types';
import { useApp } from '../context/AppContext';
import { radius, spacing, type } from '../theme/tokens';

export function NewsCard({
  article,
  onPress,
}: {
  article: NewsArticle;
  onPress: () => void;
}) {
  const { colors, bookmarks } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.78 : 1,
        },
      ]}
    >
      <View style={[styles.image, { backgroundColor: colors.surfaceMuted }]}>
        <Text style={[styles.imageText, { color: colors.primary }]}>{article.imageLabel ?? 'Grant update'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={[styles.date, { color: colors.accent }]}>
          {new Date(article.date).toLocaleDateString('en-ZA')}
        </Text>
        {bookmarks.includes(article.id) ? <Text style={[styles.saved, { color: colors.primary }]}>Saved</Text> : null}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
      <Text style={[styles.excerpt, { color: colors.textMuted }]}>{article.excerpt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  image: { height: 105, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  imageText: { fontSize: type.h2, fontWeight: '900', textAlign: 'center' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  date: { fontSize: type.tiny, fontWeight: '900' },
  saved: { fontSize: type.tiny, fontWeight: '900' },
  title: { fontSize: 18, lineHeight: 24, fontWeight: '900' },
  excerpt: { fontSize: type.small, lineHeight: 20, marginTop: 7 },
});
