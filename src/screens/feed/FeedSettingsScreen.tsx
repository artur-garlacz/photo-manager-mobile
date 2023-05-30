import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Appbar, List, useTheme } from 'react-native-paper';
import { TextInputDropdown } from 'src/components/TextInputDropdown';
import { useFeedSettings } from 'src/components/feed/hooks/useFeedSettings';
import { useGetAlbumsQuery, useGetPhotosQuery } from 'src/store/actions';
import { Album, Photo } from 'src/types';

export function FeedSettingsScreen() {
  const { dispatch } = useFeedSettings();
  const [filterBy, setFilterBy] = useState<{
    albumId?: number;
    photoId?: number;
  }>({});
  const { data: albums } = useGetAlbumsQuery({});
  const { data: photos } = useGetPhotosQuery({});
  const navigation = useNavigation();
  const theme = useTheme();

  const handleSubmit = useCallback(() => {
    dispatch({ type: 'APPLY_FILTER', payload: { ...filterBy } });
    navigation.goBack();
  }, [filterBy]);

  const handleClear = useCallback(() => {
    setFilterBy({});
  }, []);

  const handleSelectFilter = useCallback((item: Album | Photo) => {
    if ('albumId' in item) {
      setFilterBy({ ...filterBy, photoId: item.id });
    } else {
      setFilterBy({ ...filterBy, albumId: item.id });
    }
  }, []);

  return (
    <View>
      <Appbar.Header>
        <TouchableOpacity style={styles.submitBtn} onPress={handleClear}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: theme.colors.error,
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>

        <Appbar.Content
          titleStyle={{ fontWeight: '700', fontSize: 16 }}
          title="Filter items"
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <List.AccordionGroup>
        <List.Accordion
          title="By album"
          titleStyle={{ fontWeight: '500' }}
          id="1"
        >
          <View>
            <TextInputDropdown<Album>
              data={albums || []}
              filterBy="title"
              setItemTitle={(item) => item.title}
              selectItem={(item) => handleSelectFilter(item)}
            />
          </View>
        </List.Accordion>
        <List.Accordion
          title="By photo"
          titleStyle={{ fontWeight: '500' }}
          id="2"
        >
          <View>
            <TextInputDropdown<Photo>
              data={photos || []}
              filterBy="title"
              setItemTitle={(item) => item.title}
              selectItem={(item) => handleSelectFilter(item)}
            />
          </View>
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
