import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { useQuery } from 'react-query';
import { commentApi } from 'src/api/actions';
import { usersApi } from 'src/api/actions/users';
import { CommentItem } from 'src/components/comments/CommentItem';
import { PostItemView } from 'src/components/posts/PostItemView';
import { useAuth } from 'src/hooks/useAuth';
import { PostsStackNavigator } from 'src/navigation';
import { authService } from 'src/services/isSignedIn';
import { Comment, User } from 'src/types';

export function LogInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
    </SafeAreaView>
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
  input: {
    height: 40,
    margin: 12,
    borderRadius: 12,
    backgroundColor: 'red',
    padding: 10,
  },
});
