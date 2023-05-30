import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { PhotoList } from 'src/components/photos/PhotoList';
import { AlbumsStackNavigator } from 'src/navigation';

type AlbumDetailsScreenNav = StackNavigationProp<
  AlbumsStackNavigator,
  'AlbumDetails'
>;

type AlbumDetailsScreenRoute = RouteProp<AlbumsStackNavigator, 'AlbumDetails'>;

type AlbumDetailsScreenProps = {
  navigation: AlbumDetailsScreenNav;
  route: AlbumDetailsScreenRoute;
};

export function AlbumDetailsScreen({
  route: {
    params: { album },
  },
}: AlbumDetailsScreenProps) {
  return (
    <>
      <PhotoList
        ListHeaderComponent={
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}
            >
              {album.title}
            </Text>
          </View>
        }
        albumId={album.id}
      />
    </>
  );
}
