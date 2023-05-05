import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from 'src/screens/users/ProfileScreen';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { FeedScreen } from 'src/screens/feed/FeedScreen';
import { PostsListScreen } from 'src/screens/posts/PostListScreen';
import { Colors } from 'src/utils/colors';
import { Appbar, useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export function BottomTabStack() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          header: ({ options, route, navigation }) => {
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : route.name;

            console.log(route.name);

            return (
              <Appbar.Header
                theme={{ colors: { primary: theme.colors.surface } }}
              >
                <Appbar.Content
                  title={
                    //   title === 'Feed' ? (
                    (
                      // <MaterialCommunityIcons
                      //   style={{ marginRight: 10 }}
                      //   name="twitter"
                      //   size={40}
                      //   color={theme.colors.primary}
                      // />
                      <FontAwesome5
                        style={{ marginRight: 10 }}
                        name="hippo"
                        size={40}
                        color={theme.colors.primary}
                      />
                    ) as any
                  }
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}
                />
                <Appbar.Action
                  icon={() => (
                    <Ionicons
                      name="ios-settings-outline"
                      size={24}
                      color={theme.colors.primary}
                    />
                  )}
                  color={theme.colors.primary}
                  onPress={() => navigation.navigate('FeedSettings')}
                />
              </Appbar.Header>
            );
          },
        }}
        component={FeedScreen}
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
        component={PostsListScreen}
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
