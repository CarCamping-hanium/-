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
import SplashScreen from 'react-native-splash-screen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Login = ({navigation}) => {
  const {mainColor, login} = useContext(UserContext);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 20,
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
            paddingLeft: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#aaaaaa',
            marginTop: 20,
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
            paddingLeft: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#aaaaaa',
            marginTop: 10,
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
            marginTop: 20,
            width: '60%',
            height: 40,
            borderRadius: 8,
            backgroundColor: mainColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            login(ID, password);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>로그인</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <Text>아직 회원이 아니신가요? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#295eba',
                fontSize: 15,
              }}>
              {' '}
              회원가입하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
