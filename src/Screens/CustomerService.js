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
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          개발자 이메일 : chabakrini@gmail.com
        </Text>
        <Text style={{marginTop: 5, fontSize: 15}}>
          피드백 및 건의사항이 있으시다면 위 메일로 보내주세요!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomerService;
