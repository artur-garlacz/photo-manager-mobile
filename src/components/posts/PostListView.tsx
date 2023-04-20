import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetPostsArgs, postsApi } from 'src/api/actions';
import { Post, User } from 'src/types';
import { PostItemView } from 'src/components/posts/PostItemView';
import { usersApi } from 'src/api/actions/users';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useGetPostsQuery } from 'src/store/actions';

type PostListViewProps = { filters?: GetPostsArgs };

export function PostListView({ filters }: PostListViewProps) {
  const [selectedPost, setPost] = useState<Post>();
  const { data: posts, isLoading } = useGetPostsQuery(filters || {});
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
      >
        <MaterialCommunityIcons name="feather" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      {/* {!!selectedPost && (
        <DeletePostModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => handleSelect()}
        />
      )} */}
    </View>
  );
}
