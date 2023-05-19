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

export type AlbumsStackNavigator = {
  AlbumsList: undefined;
  AlbumDetails: { album: Album };
  CreateAlbum: undefined;
  CreatePhoto: { albumId: Album['id'] };
};

export type PostsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<PostsStackNavigator, 'PostsList'>,
  StackNavigationProp<PostsStackNavigator>
>;

export type AlbumsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AlbumsStackNavigator, 'AlbumsList'>,
  StackNavigationProp<AlbumsStackNavigator>
>;

export type StackList = PostsStackNavigator &
  AlbumsStackNavigator & {
    Protected: undefined;
    Main: undefined;
    Feed: undefined;
    FeedSettings: undefined;
    LogIn: undefined;
  };
