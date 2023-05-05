import * as Font from 'expo-font';
import { DarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AppStateStatus, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import { RootStack } from 'src/navigation/RootStack';
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import store from 'src/store';
import { Colors } from 'src/utils/colors';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Material Design Icons': require('src/assets/fonts/MaterialCommunityIcons.ttf'),
      });
    }

    loadFonts();
  }, []);

  function toggleTheme() {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  const preferences = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    // <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PaperProvider
        theme={
          theme === 'light'
            ? {
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, primary: Colors.black },
              }
            : {
                ...DarkTheme,
                colors: { ...DarkTheme.colors, primary: '#1ba1f2' },
              }
        }
      >
        <RootStack />
      </PaperProvider>
    </Provider>

    // </QueryClientProvider>
  );
}
