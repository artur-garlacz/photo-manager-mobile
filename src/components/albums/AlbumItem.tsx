import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import { AlbumsScreenNavigationProp } from 'src/navigation';
import { Album } from 'src/types';

type AlbumItemProps = {
  data: Album;
};

export function AlbumItem({ data }: AlbumItemProps) {
  const navigation = useNavigation<AlbumsScreenNavigationProp>();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        padding: 8,
        height: 120,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('AlbumDetails', { album: data })}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>{data.title}</Text>
    </TouchableOpacity>
  );
}
