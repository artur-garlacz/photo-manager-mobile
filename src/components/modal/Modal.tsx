import { useHeaderHeight } from '@react-navigation/elements';
import {
  Button,
  Pressable,
  Modal as RNModal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

export type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children: React.ReactNode | React.ReactNode[];
  onConfirm?: () => void;
};

export function Modal({
  modalVisible,
  setModalVisible,
  onConfirm,
  children,
}: ModalProps) {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  return (
    <View style={styles.centeredView}>
      <RNModal
        animationType="slide"
        presentationStyle="fullScreen"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            height: headerHeight,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: 22,
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ color: theme.colors.primary, fontWeight: '500' }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.submitBtn,
              backgroundColor: theme.colors.primary,
            }}
            onPress={onConfirm}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>{children}</View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  submitBtn: {
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
