import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { AlbumItem } from 'src/components/albums/AlbumItem';
import { useGetAlbumsQuery } from 'src/store/actions';

type AlbumListProps = {
  userId?: number;
};

export function AlbumList({ userId }: AlbumListProps) {
  const { data: albums, isLoading } = useGetAlbumsQuery({ userId });

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
    padding: 10,
    flexDirection: 'column',
  },
  list: {
    justifyContent: 'space-between',
  },
});
