import {Modal, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
const ModalComponent = ({visible, children}) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        console.log('close');
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalComponent;
