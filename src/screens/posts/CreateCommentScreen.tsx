import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, List, useTheme } from 'react-native-paper';
import { TextInputDropdown } from 'src/components/TextInputDropdown';
import { useFeedSettings } from 'src/components/feed/hooks/useFeedSettings';
import { PostsStackNavigator } from 'src/navigation';
import {
  useCreateCommentMutation,
  useGetAlbumsQuery,
  useGetPhotosQuery,
} from 'src/store/actions';
import { Album, Photo } from 'src/types';

type CreateCommentScreenNavigationProp = StackNavigationProp<
  PostsStackNavigator,
  'CreateComment'
>;

type CreateCommentScreenRouteProp = RouteProp<
  PostsStackNavigator,
  'CreateComment'
>;

type Props = {
  navigation: CreateCommentScreenNavigationProp;
  route: CreateCommentScreenRouteProp;
};

export function CreateCommentScreen({
  route: {
    params: { postId },
  },
  navigation,
}: Props) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [createComment] = useCreateCommentMutation();

  const handleCreateComment = useCallback(async () => {
    await createComment({ ...form, postId });
    navigation.goBack();
  }, [form, createComment]);
  const theme = useTheme();

  const handleChange = useCallback(
    (name: string) => (text: string) => {
      setForm({ ...form, [name]: text });
    },
    [form]
  );

  return (
    <View>
      <Appbar.Header>
        <TouchableOpacity style={styles.submitBtn} onPress={navigation.goBack}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <Appbar.Content
          titleStyle={{ fontWeight: '700', fontSize: 16 }}
          title="Add comment"
        />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </Appbar.Header>

      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 50,
          }}
        >
          <Avatar.Image
            size={40}
            style={{ borderRadius: 6 }}
            source={require('../../assets/images/avatar1.png')}
          />

          <TextInput
            style={{ ...styles.input, fontWeight: '500', fontSize: 20 }}
            placeholder="Enter title here..."
            value={form.title}
            onChangeText={handleChange('title')}
          />
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{
            ...styles.input,
            height: 500,
            fontSize: 16,
          }}
          placeholder="Enter content here..."
          value={form.body}
          onChangeText={handleChange('body')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
  },
  inputContent: {
    padding: 10,
    borderRadius: 10,
  },
  submitBtn: {
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
