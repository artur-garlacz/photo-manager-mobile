import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Post } from 'src/types';
import { PostItemView } from 'src/components/posts/PostItemView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useGetPostsQuery } from 'src/store/actions';
import { StackList } from 'src/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<StackList, 'PostsList'>;
};
export function PostsListScreen({ navigation }: Props) {
  const { data: posts, isLoading } = useGetPostsQuery({});
  const theme = useTheme();

  if (!posts || isLoading) return <ActivityIndicator />;

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItemView key={item.id} data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: theme.colors.primary,
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          navigation.navigate('CreatePost');
        }}
      >
        <MaterialCommunityIcons name="feather" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
