import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Modal, ModalProps } from 'src/components/modal/Modal';
import { useCreateCommentMutation } from 'src/store/actions';
import { Post } from 'src/types';

type CreateCommentModalProps = ModalProps & {
  postId: Post['id'];
};

export function CreateCommentModal({
  children,
  modalVisible,
  setModalVisible,
  postId,
}: CreateCommentModalProps) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [createComment] = useCreateCommentMutation();

  const handleCreateComment = useCallback(async () => {
    await createComment({ ...form, postId });
    setModalVisible(false);
  }, [form, createComment, setModalVisible]);

  const handleChange = useCallback(
    (name: string) => (text: string) => {
      setForm({ ...form, [name]: text });
    },
    [form]
  );

  const isValid = !!form.title.length && !!form.body.length;

  return (
    <>
      {children}

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={isValid ? handleCreateComment : undefined}
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
    borderRadius: 10,
  },
});
