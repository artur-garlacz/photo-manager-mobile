import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Photo } from 'src/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

type PhotoItemProps = {
  data: Photo;
};

export function PhotoItem({ data }: PhotoItemProps) {
  const theme = useTheme();

  return (
    <TouchableHighlight
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.5,
        marginBottom: 20,
        position: 'relative',
      }}
    >
      <>
        <Image
          source={require('../../assets/images/city-random.jpg')}
          style={{ width: '100%', height: 380, borderRadius: 12 }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: '#fff',
            borderRadius: 50,
            padding: 10,
            overflow: 'hidden',
            maxWidth: '90%',
          }}
        >
          <Text>{data.title}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}
