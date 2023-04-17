import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommentItem } from 'src/components/comments/CommentItem';
import { PostItemView } from 'src/components/posts/PostItemView';
import { PostsStackNavigator } from 'src/navigation';
import { useGetCommentsQuery } from 'src/store/actions';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';

type PostDetailsScreenNavigationProp = StackNavigationProp<
  PostsStackNavigator,
  'PostDetails'
>;

type PostDetailsScreenRouteProp = RouteProp<PostsStackNavigator, 'PostDetails'>;

type Props = {
  navigation: PostDetailsScreenNavigationProp;
  route: PostDetailsScreenRouteProp;
};
export function PostDetailsScreen({
  route: {
    params: { post },
  },
  navigation,
}: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const theme = useTheme();

  const { data: comments, isLoading } = useGetCommentsQuery({
    postId: post.id,
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <PostItemView data={post} />
          <View>
            <Text style={styles.info}>Comments ({comments?.length || 0}):</Text>
          </View>
        </View>
        {comments?.map((comment) => (
          <CommentItem key={comment.id} data={comment} />
        )) || []}
      </ScrollView>
      <TouchableOpacity
        style={{
          ...styles.createCommentIcon,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => {
          navigation.navigate('CreateComment', { postId: post.id });
        }}
      >
        <MaterialCommunityIcons name="feather" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comments: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: 10,
  },
  info: {
    fontWeight: '600',
    padding: 10,
  },
  content: {
    marginLeft: 35,
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
  createCommentIcon: {
    position: 'absolute',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 35,
    right: 20,
  },
});
