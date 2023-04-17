import { PostsStackNavigator, StackList } from 'src/navigation';
import { Appbar, useTheme } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabStack } from 'src/navigation/BottomTabStack';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { FeedSettingsScreen } from 'src/screens/feed/FeedSettingsScreen';
import { FeedSettingsProvider } from 'src/components/feed/context/FeedSettingsContext';

const Stack = createStackNavigator<StackList>();

export function FeedStack() {
  const theme = useTheme();

  return (
    <FeedSettingsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="FeedList"
          options={{
            header: ({ options, route, navigation }) => {
              const title =
                options.headerTitle !== undefined
                  ? options.headerTitle
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              return (
                <Appbar.Header
                  theme={{ colors: { primary: theme.colors.surface } }}
                >
                  <Appbar.Content
                    title={
                      //   title === 'Feed' ? (
                      (
                        <MaterialCommunityIcons
                          style={{ marginRight: 10 }}
                          name="twitter"
                          size={40}
                          color={theme.colors.primary}
                        />
                      ) as any
                      //   ) : (
                      //     <Text>{title.toString()}</Text>
                      //   )
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
          component={BottomTabStack}
          // options={({ route }) => {
          //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
          //   return { headerTitle: routeName };
          // }}
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
      </Stack.Navigator>
    </FeedSettingsProvider>
  );
}
