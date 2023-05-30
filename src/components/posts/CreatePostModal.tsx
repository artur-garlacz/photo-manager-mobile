import { useCallback, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Modal, ModalProps } from 'src/components/modal/Modal';
import { useCreatePostMutation } from 'src/store/actions';

type CreatePostModalProps = ModalProps;

export function CreatePostModal({
  children,
  modalVisible,
  setModalVisible,
}: CreatePostModalProps) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [createPost] = useCreatePostMutation();

  const handleCreatePost = useCallback(async () => {
    await createPost({ ...form, userId: 1 });
    setModalVisible(false);
  }, [form, createPost, setModalVisible]);

  const handleChange = useCallback(
    (name: string) => (text: string) => {
      setForm({ ...form, [name]: text });
    },
    [form]
  );

  return (
    <>
      {children}

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleCreatePost}
      >
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
      </Modal>
    </>
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
    // borderColor: '#e6e6e6',
    // backgroundColor: '#e6e6e6',
    // borderWidth: 1,
    borderRadius: 10,
  },
});
