import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { PostDetailsScreen } from 'src/screens/posts/PostDetailsScreen';
import { StackList } from 'src/navigation';
import { LoginScreen } from 'src/screens/auth/LoginScreen';
import { FeedStack } from 'src/navigation/FeedStack';
import { CreateCommentScreen } from 'src/screens/posts/CreateCommentScreen';

const Stack = createStackNavigator<StackList>();

export function RootStack() {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FeedList"
          component={FeedStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PostDetails"
          component={PostDetailsScreen}
          options={({ route }) => ({
            title: route.params.post.title,
            headerBackTitle: 'All',
          })}
        />
        <Stack.Screen
          name="CreateComment"
          options={{
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
          component={CreateCommentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*

  1. FeedScreen
    1.1. PhotoListScreen
    1.2. AlbumListScreen
      1.2.1. AlbumDetailsScreen
  2. PostListScreen
    2.1. PostDetailsScreen
  3. ProfileScreen
    3.1. LoginScreen

*/
