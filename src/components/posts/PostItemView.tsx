import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { UserBriefView } from 'src/components/posts/UserInfo';
import { PostsScreenNavigationProp } from 'src/navigation';
import { useDeletePostMutation } from 'src/store/actions';
import { Post, User } from 'src/types';
import { Colors } from 'src/utils/colors';

type PostItemProps = {
  data: Post;
};

export function PostItemView({ data }: PostItemProps) {
  const navigation = useNavigation<PostsScreenNavigationProp>();
  const [deletePost] = useDeletePostMutation();

  const handlePress = () => {
    navigation.navigate('PostDetails', { post: data });
  };

  const handleDelete = () => {
    deletePost(data.id);
  };

  const renderRightActions = (
    _: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
    });
    return (
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          width: 80,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Ionicons name="trash-bin" size={28} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      useNativeAnimations
      overshootRight={true}
      renderRightActions={renderRightActions}
      containerStyle={{ backgroundColor: Colors.black }}
    >
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <UserBriefView userId={data.userId} />
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <Text>{data.body}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  content: {
    marginLeft: 46,
    marginTop: -15,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
