import { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StyleProp,
  Alert,
} from 'react-native';
import { useAppSelector } from 'src/store';
import { useDeleteCommentMutation } from 'src/store/actions';
import { Comment } from 'src/types';

type CommentItemProps = {
  data?: Comment;
};

export function CommentItem({ data }: CommentItemProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [deleteComment] = useDeleteCommentMutation();

  const handlePress = () => {
    if (!data) return;

    Alert.alert('Delete comment', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteComment(data.id),
        style: 'destructive',
      },
    ]);
  };

  if (!data) return null;

  return (
    <Wrapper onLongPress={user?.email === data.email ? handlePress : undefined}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.email}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray' }}>
          {data.name}
        </Text>
        <Text>{data.body}</Text>
      </View>
    </Wrapper>
  );
}

function Wrapper({
  onLongPress,
  children,
}: {
  onLongPress: (() => void) | undefined;
  children: ReactNode;
}) {
  if (onLongPress) {
    return (
      <TouchableOpacity
        testID="comment-item"
        style={styles.container}
        onLongPress={onLongPress}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View testID="comment-item" style={styles.container}>
      {children}
    </View>
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
    marginLeft: 35,
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
