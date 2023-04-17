import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Comment } from 'src/types';

type CommentItemProps = {
  data?: Comment;
};

export function CommentItem({ data }: CommentItemProps) {
  const handlePress = () => {
    if (!data) return;
  };

  if (!data) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.email}</Text>
        <Text>{data.name}</Text>
        <Text>{data.body}</Text>
      </View>
    </TouchableOpacity>
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
