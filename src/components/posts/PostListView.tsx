import { ActivityIndicator, FlatList } from 'react-native';
import { PostItemView } from 'src/components/posts/PostItemView';
import { useTheme } from 'react-native-paper';
import { GetPostsArgs, useGetPostsQuery } from 'src/store/actions';

type PostListViewProps = { filters?: GetPostsArgs };

export function PostListView({ filters }: PostListViewProps) {
  const { data: posts, isLoading } = useGetPostsQuery(filters || {});

  if (!posts || isLoading) return <ActivityIndicator />;

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItemView key={item.id} data={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
