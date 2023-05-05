import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { StackList } from 'src/navigation';
import { FeedStack } from 'src/navigation/FeedStack';
import { useAppSelector } from 'src/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'src/utils/colors';
import { ProfileScreen } from 'src/screens/users/ProfileScreen';
import { PostsStack } from 'src/navigation/PostsStack';

const Stack = createStackNavigator<StackList>();
const Tab = createBottomTabNavigator();

export function ProtectedStack() {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   console.log('isAuthenticated', isAuthenticated);
  //   if (!isAuthenticated) {
  //     navigation.navigate('LogIn');
  //   }
  // }, [isAuthenticated]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          display: 'none',
        },
      }}
      initialRouteName="Feed"
    >
      <Tab.Screen
        name="Feed"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={FeedStack}
      />
      <Tab.Screen
        name="Posts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={PostsStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>

    //   {/* <Stack.Screen
    //     name="PostDetails"
    //     component={PostDetailsScreen}
    //     options={({ route }) => ({
    //       title: route.params.post.title,
    //       headerBackTitle: 'All',
    //     })}
    //   />
    //   <Stack.Screen
    //     name="CreateComment"
    //     options={{
    //       animationEnabled: true,
    //       animationTypeForReplace: 'pop',
    //       headerShown: false,
    //       ...TransitionPresets.ModalSlideFromBottomIOS,
    //     }}
    //     component={CreateCommentScreen}
    //   /> */}
    // {/* </Stack.Navigator> */}
  );
}
