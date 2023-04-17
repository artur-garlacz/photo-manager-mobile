import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Album, Post } from 'src/types';

export type PostsStackNavigator = {
  PostsList: undefined;
  PostDetails: { post: Post };
  CreatePost: undefined;
  CreateComment: { postId: Post['id'] };
};

export type PostsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<PostsStackNavigator, 'PostsList'>,
  StackNavigationProp<PostsStackNavigator>
>;

export type StackList = PostsStackNavigator & {
  FeedList: undefined;
  FeedSettings: undefined;
  LogIn: undefined;
};
