import * as Font from 'expo-font';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { LogBox, useColorScheme } from 'react-native';
import { RootStack } from 'src/navigation/RootStack';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from 'src/store';
import { Colors } from 'src/utils/colors';

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Material Design Icons': require('src/assets/fonts/MaterialCommunityIcons.ttf'),
      });
    }

    loadFonts();
  }, []);

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, primary: Colors.black },
        }}
      >
        <RootStack />
      </PaperProvider>
    </Provider>
  );
}
