import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AlbumList } from 'src/components/albums/AlbumList';
import { PostListView } from 'src/components/posts';
import { PostsStackNavigator } from 'src/navigation';
import { useAppSelector } from 'src/store';
import { Colors } from 'src/utils/colors';

type ProfileScreenNavigationProp = StackNavigationProp<
  PostsStackNavigator,
  'PostDetails'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
export function ProfileScreen({}: Props) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 50 }}>
        <Avatar.Image
          size={120}
          style={{ backgroundColor: 'transparent' }}
          source={require('../../assets/images/avatar1.png')}
        />
        <Text style={{ fontWeight: '700', fontSize: 22, paddingTop: 10 }}>
          {user?.name}
        </Text>
        <Text style={{ color: 'gray', paddingTop: 6 }}>
          Company: {user?.company.name}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: Colors.white,
          margin: 16,
          borderRadius: 12,
          padding: 10,
        }}
      >
        <View
          style={{
            ...styles.field,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Email</Text>
          <Text>{user?.email}</Text>
        </View>
        <View
          style={{
            ...styles.field,
            paddingVertical: 14,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Phone</Text>
          <Text>{user?.phone}</Text>
        </View>
        <View
          style={{
            ...styles.field,
            paddingVertical: 14,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Website</Text>
          <Text>{user?.website}</Text>
        </View>
        <View
          style={{
            ...styles.field,
            paddingVertical: 14,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>City</Text>
          <Text>
            {user?.address.city} {user?.address.zipcode}, st.{' '}
            {user?.address.street}
          </Text>
        </View>

        <View
          style={{
            ...styles.field,
            paddingVertical: 14,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Suite</Text>
          <Text>{user?.address.suite}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Geo</Text>
          <Text>
            {user?.address.geo.lat}, {user?.address.geo.lng}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.white,
          margin: 16,
          borderRadius: 12,
          padding: 10,
        }}
      >
        <View
          style={{
            ...styles.field,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Company</Text>
          <Text>{user?.company.name}</Text>
        </View>
        <View
          style={{
            ...styles.field,
            paddingVertical: 14,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={styles.label}>Catch phrase</Text>
          <Text>{user?.company.catchPhrase}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Bs</Text>
          <Text>{user?.company.bs}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
        <Text style={styles.label}>User Posts</Text>
      </View>
      <PostListView filters={{ userId: user?.id }} />
      <View style={{ paddingHorizontal: 14, paddingTop: 10 }}>
        <Text style={styles.label}>User albums</Text>
      </View>
      <AlbumList userId={user?.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
  },
  value: {},
});
