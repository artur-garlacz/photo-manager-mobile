import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from 'src/screens/users/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FeedScreen } from 'src/screens/feed/FeedScreen';
import { PostsListScreen } from 'src/screens/posts/PostListScreen';

const Tab = createBottomTabNavigator();

export function BottomTabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={FeedScreen}
      />
      <Tab.Screen
        name="Posts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color={color} size={size} />
          ),
        }}
        component={PostsListScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
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
