import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { AlbumList } from 'src/components/albums/AlbumList';
import { PhotoList } from 'src/components/photos/PhotoList';

const initialLayout = {
  width: Dimensions.get('window').width,
};

export function FeedScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'photos', title: 'Photos' },
    { key: 'albums', title: 'Albums' },
  ]);

  const theme = useTheme();

  const renderScene = SceneMap({
    photos: PhotoList,
    albums: AlbumList,
  });

  const tabBarColor = theme.dark ? theme.colors.surface : theme.colors.surface;

  const rippleColor = theme.dark ? tabBarColor : tabBarColor;

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: tabBarColor }}
      labelStyle={{ color: theme.colors.primary }}
      pressColor={rippleColor}
    />
  );

  return (
    <React.Fragment>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </React.Fragment>
  );
}
