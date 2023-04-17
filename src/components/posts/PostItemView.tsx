import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserBriefView } from 'src/components/posts/UserInfo';
import { PostsScreenNavigationProp } from 'src/navigation';
import { Post, User } from 'src/types';

type PostItemProps = {
  data?: Post;
};

export function PostItemView(props: PostItemProps) {
  const { data } = props;
  const navigation = useNavigation<PostsScreenNavigationProp>();

  const handlePress = () => {
    if (!data) return;

    navigation.navigate('PostDetails', { post: data });
  };

  if (!data) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <UserBriefView userId={data.userId} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.body}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  content: {
    marginLeft: 46,
    marginTop: -15,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
