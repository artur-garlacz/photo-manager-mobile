import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LoadingIndicator } from 'src/components/LoadingIndicator';
import { useFeedSettings } from 'src/components/feed/hooks/useFeedSettings';
import { PhotoItem } from 'src/components/photos/PhotoItem';
import { useGetPhotosQuery } from 'src/store/actions';

type PhotoListProps = {
  ListHeaderComponent?: FlatList['props']['ListHeaderComponent'];
};

export function PhotoList({ ListHeaderComponent }: PhotoListProps) {
  const {
    state: { filterBy },
  } = useFeedSettings();
  const { data: photos, isLoading } = useGetPhotosQuery({
    albumId: filterBy.albumId,
    id: filterBy.photoId,
  });

  if (!photos || isLoading) return <LoadingIndicator />;

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={photos}
      renderItem={({ item }) => <PhotoItem data={item} />}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
