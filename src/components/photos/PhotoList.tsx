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

type PhotoListProps = {};

export function PhotoList({}: PhotoListProps) {
  const {
    state: { filterBy },
  } = useFeedSettings();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: photos, isLoading } = useGetPhotosQuery({
    albumId: filterBy.albumId,
    id: filterBy.photoId,
  });

  console.log('photos', photos?.length);

  if (!photos || isLoading) return <LoadingIndicator />;

  return (
    <>
      <FlatList
        data={photos}
        renderItem={({ item }) => <PhotoItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
