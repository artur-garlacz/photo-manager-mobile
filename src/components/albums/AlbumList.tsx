import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetPostsArgs, postsApi } from 'src/api/actions';
import { Album, Post } from 'src/types';
import { albumsApi } from 'src/api/actions/albums';
import { AlbumItem } from 'src/components/albums/AlbumItem';
import { useGetAlbumsQuery } from 'src/store/actions';

type AlbumListProps = {};

export function AlbumList({}: AlbumListProps) {
  const { data: albums, isLoading } = useGetAlbumsQuery({});

  if (!albums || isLoading) return <ActivityIndicator />;

  return (
    <FlatList
      data={albums}
      numColumns={2}
      renderItem={({ item }) => <AlbumItem data={item} />}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    justifyContent: 'space-between',
  },
});
