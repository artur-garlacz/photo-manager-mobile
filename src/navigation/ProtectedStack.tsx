import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FeedStack } from 'src/navigation/FeedStack';
import { useAppSelector } from 'src/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'src/utils/colors';
import { ProfileScreen } from 'src/screens/users/ProfileScreen';
import { PostsStack } from 'src/navigation/PostsStack';

const Tab = createBottomTabNavigator();

export function ProtectedStack() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('LogIn');
    }
  }, [isAuthenticated]);

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
  );
}
