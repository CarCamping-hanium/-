import React, {useContext, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserContext} from '../Context/Context';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Login = ({navigation}) => {
  const {login} = useContext(UserContext);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          style={{
            width: screenWidth / 2,
            height: screenWidth / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../Assets/Images/app_icon.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 300,
          backgroundColor: 'white',
        }}>
        <TextInput
          style={{
            width: '60%',
            height: 40,
            paddingLeft: 16,
            borderRadius: 4,
            backgroundColor: '#cccccc',
          }}
          selectionColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder="이메일"
          placeholderTextColor="#777777"
          clearButtonMode="while-editing"
          onChangeText={text => {
            setID(text);
          }}
        />
        <TextInput
          style={{
            width: '60%',
            height: 40,
            paddingLeft: 16,
            borderRadius: 4,
            backgroundColor: '#cccccc',
            marginTop: 8,
          }}
          selectionColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder="비밀번호"
          placeholderTextColor="#777777"
          clearButtonMode="while-editing"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TouchableOpacity
          style={{
            marginTop: 8,
            width: '30%',
            height: 40,
            borderRadius: 4,
            backgroundColor: '#295eba',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            login(ID, password);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={{marginTop: 18, textDecorationLine: 'underline'}}>
            아직 회원이 아니신가요?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
