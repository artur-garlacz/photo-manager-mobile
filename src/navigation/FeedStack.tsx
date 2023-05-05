import { PostsStackNavigator, StackList } from 'src/navigation';
import { Appbar, useTheme } from 'react-native-paper';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { BottomTabStack } from 'src/navigation/BottomTabStack';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { FeedSettingsScreen } from 'src/screens/feed/FeedSettingsScreen';
import { FeedSettingsProvider } from 'src/components/feed/context/FeedSettingsContext';
import { FeedScreen } from 'src/screens/feed/FeedScreen';
import { AlbumDetailsScreen } from 'src/screens/feed/AlbumDetailsScreen';

const Stack = createStackNavigator<StackList>();

export function FeedStack() {
  const theme = useTheme();

  return (
    <FeedSettingsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            header: ({ navigation }) => {
              return (
                <Appbar.Header
                  theme={{ colors: { primary: theme.colors.surface } }}
                >
                  <Appbar.Content
                    title={
                      (
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
        />

        <Stack.Screen
          options={{
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
          name="FeedSettings"
          component={FeedSettingsScreen}
        />

        <Stack.Screen
          options={{
            header: ({ navigation }) => {
              return (
                <Appbar.Header
                  theme={{ colors: { primary: theme.colors.surface } }}
                >
                  <Appbar.Content
                    title={
                      (
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
          name="AlbumDetails"
          component={AlbumDetailsScreen}
        />
      </Stack.Navigator>
    </FeedSettingsProvider>
  );
}
