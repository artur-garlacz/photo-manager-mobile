import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { PostsStackNavigator } from 'src/navigation';
import { useCreatePostMutation } from 'src/store/actions';
import { Colors } from 'src/utils/colors';

type CreatePostScreenNavigationProp = StackNavigationProp<
  PostsStackNavigator,
  'CreatePost'
>;

type Props = {
  navigation: CreatePostScreenNavigationProp;
};

export function CreatePostScreen({ navigation }: Props) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [createPost] = useCreatePostMutation();

  const handleCreatePost = useCallback(async () => {
    await createPost({ ...form, userId: 1 });
    navigation.goBack();
  }, [form, createPost]);
  const theme = useTheme();

  const handleChange = useCallback(
    (name: string) => (text: string) => {
      setForm({ ...form, [name]: text });
    },
    [form]
  );

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
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

        <TouchableOpacity style={styles.submitBtn} onPress={handleCreatePost}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </Appbar.Header>

      <View
        style={{ backgroundColor: Colors.white, height: '100%', padding: 16 }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            backgroundColor: Colors.white,
          }}
        >
          <Avatar.Image
            size={40}
            style={{ backgroundColor: 'transparent' }}
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
