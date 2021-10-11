import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomerService = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/back.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  return <Text>개발자에게 문의하기</Text>;
};

export default CustomerService;
