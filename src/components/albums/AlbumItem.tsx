import { View, Text, Dimensions } from 'react-native';
import { Album } from 'src/types';

type AlbumItemProps = {
  data: Album;
};

export function AlbumItem({ data }: AlbumItemProps) {
  return (
    <View
      style={{
        backgroundColor: '#A1A1A1',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        padding: 8,
        height: 120,
      }}
    >
      <Text>{data.title}</Text>
    </View>
  );
}
