import { PostsListScreen } from 'src/screens/posts/PostListScreen';
import { PostDetailsScreen } from 'src/screens/posts/PostDetailsScreen';
import { PostsStackNavigator } from 'src/navigation';
import { CreateCommentScreen } from 'src/screens/posts/CreateCommentScreen';
import {
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { CreatePostScreen } from 'src/screens/posts/CreatePostScreen';

const Stack = createStackNavigator<PostsStackNavigator>();

export function PostsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostsList" component={PostsListScreen} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
        options={({ route }) => ({ title: route.params.post.title })}
      />
      <Stack.Screen
        name="CreatePost"
        options={modalSettings}
        component={CreatePostScreen}
      />
      <Stack.Screen
        name="CreateComment"
        options={modalSettings}
        component={CreateCommentScreen}
      />
    </Stack.Navigator>
  );
}

const modalSettings: StackNavigationOptions = {
  animationEnabled: true,
  animationTypeForReplace: 'pop',
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
