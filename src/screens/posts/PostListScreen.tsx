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
import { StackList } from 'src/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { CreatePostModal } from 'src/components/posts/CreatePostModal';

type Props = {
  navigation: StackNavigationProp<StackList, 'PostsList'>;
};
export function PostsListScreen({ navigation }: Props) {
  //   const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  //   const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  //   const handleToggle = useCallback(() => {
  //     setOpenCreateModal((state) => !state);
  //   }, []);

  const [selectedPost, setPost] = useState<Post>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
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

      {/* {!!selectedPost && (
        <DeletePostModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => handleSelect()}
        />
      )} */}

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

      {/* <CreatePostModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        
      </CreatePostModal> */}
    </View>
  );
}
