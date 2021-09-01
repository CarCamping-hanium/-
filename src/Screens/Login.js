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
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../Assets/Images/app_icon.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TextInput
          style={{
            width: '60%',
            height: 40,
            paddingLeft: 16,
            borderRadius: 8,
            backgroundColor: '#cccccc',
            marginTop: 10,
          }}
          selectionColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder="아이디"
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
            borderRadius: 8,
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
            width: 120,
            height: 40,
            borderRadius: 8,
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
    </SafeAreaView>
  );
};

export default Login;
