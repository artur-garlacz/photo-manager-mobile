import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useQuery } from 'react-query';
import { commentApi } from 'src/api/actions';
import { usersApi } from 'src/api/actions/users';
import { CommentItem } from 'src/components/comments/CommentItem';
import { PostItemView } from 'src/components/posts/PostItemView';
import { useAuth } from 'src/hooks/useAuth';
import { PostsStackNavigator } from 'src/navigation';
import { authService } from 'src/services/isSignedIn';
import { Comment, User } from 'src/types';

type ProfileScreenNavigationProp = StackNavigationProp<
  PostsStackNavigator,
  'PostDetails'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
export function ProfileScreen({}: Props) {
  const { user } = useAuth();

  return <SafeAreaView style={styles.container}>{user?.username}</SafeAreaView>;
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
});
