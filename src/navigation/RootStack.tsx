import React, { useEffect } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { PostDetailsScreen } from 'src/screens/posts/PostDetailsScreen';
import { StackList } from 'src/navigation';
import { LoginScreen } from 'src/screens/auth/LoginScreen';
import { CreateCommentScreen } from 'src/screens/posts/CreateCommentScreen';
import { useAppSelector } from 'src/store';
import { ProtectedStack } from 'src/navigation/ProtectedStack';

const Stack = createStackNavigator<StackList>();

export function RootStack() {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={ProtectedStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
