import React, {useState, useContext, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  msgColor,
  Image,
  View,
  Alert,
} from 'react-native';
import {UserContext} from '../Context/Context';

const ModifyPassword = ({navigation}) => {
  const [oldpassword, setOldpassword] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [passwordRight, setPasswordRight] = useState(''); //비밀번호가 일치하는지 아닌지 출력
  const [passwordCheck, setPasswordCheck] = useState(''); //비밀번호 중복 확인 완료 상태 임시 저장
  const [msgColor, setMsgColor] = useState(''); //passwordRight TextColor

  const [checkPasswordBoxColor, setCheckPasswordBoxColor] =
    useState('transparent');

  const {userInfo, setUserInfo} = useContext(UserContext);

  const passwordChecking = str => {
    var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return regExp.test(str) ? true : false;
  };

  const passwordCheckingFunction = () => {
    if (!passwordChecking(password)) {
      Alert.alert(
        '비밀번호는 영문, 숫자를 혼합하여 8자리 이상, 16자리 이하여야 합니다.',
      );
      setPassword('');
      setRepassword('');
      setPasswordRight('');
    } else if (password === repassword) {
      setCheckPasswordBoxColor('transparent');
      setPasswordCheck(password);
      setPasswordRight('비밀번호가 일치합니다.');
      setMsgColor('#295eba');
    } else {
      setCheckPasswordBoxColor('red');
      setPasswordRight('비밀번호가 일치하지 않습니다.');
      setMsgColor('red');
    }
  };

  const UpdateCheckingFunction = () => {
    if (oldpassword === password) {
      Alert.alert('이전과 같은 비밀번호를 사용할 수 없습니다.');
    } else if (
      password === repassword &&
      repassword === passwordCheck &&
      passwordRight === '비밀번호가 일치합니다.'
    ) {
      fetch('http://3.38.85.251:8080/api/member/update/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: userInfo.token,
        },
        body: JSON.stringify({
          newPassword: password,
          oldPassword: oldpassword,
        }),
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (json.msg === 'success') {
            navigation.navigate('MyPage');
            Alert.alert('비밀번호가 변경되었습니다.');
          } else {
            Alert.alert(json.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Alert.alert('비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style={{marginTop: 30, fontSize: 20}}>현재 비밀번호</Text>
        <TextInput
          style={styles.Text}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder={'현재 비밀번호를 입력하세요.'}
          placeholderTextColor="#777777"
          clearButtonMode={'while-editing'}
          secureTextEntry={true}
          onChangeText={text => {
            setOldpassword(text);
          }}
        />
        <Text style={{marginTop: 30, fontSize: 20}}>변경할 비밀번호</Text>
        <TextInput
          style={styles.Text}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder={'영문, 숫자 혼합 8~16자리'}
          placeholderTextColor="#777777"
          clearButtonMode={'while-editing'}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={{fontSize: 20}}>비밀번호 확인</Text>
          <Text
            style={{
              marginLeft: '10%',
              fontSize: 15,
              color: msgColor,
              fontWeight: 'bold',
            }}>
            {passwordRight}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              width: 200,
              height: 40,
              backgroundColor: '#cccccc',
              paddingLeft: 16,
              paddingRight: 16,
              borderRadius: 8,
              marginTop: 15,
              borderWidth: 2,
              borderColor: checkPasswordBoxColor,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            allowFontScaling={false}
            placeholder={'영문, 숫자 혼합 8~16자리'}
            placeholderTextColor="#777777"
            clearButtonMode={'while-editing'}
            secureTextEntry={true}
            onChangeText={text => {
              setRepassword(text);
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#295eba',
              marginLeft: 20,
              marginTop: 15,
              borderRadius: 8,
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              passwordCheckingFunction();
            }}>
            <Text style={{color: 'white', fontSize: 15}}>비밀번호 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#295eba',
            borderRadius: 8,
            width: 150,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            UpdateCheckingFunction();
          }}>
          <Text style={{color: 'white', fontSize: 20}}>변경</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Text: {
    width: 200,
    height: 40,
    backgroundColor: '#cccccc',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    marginTop: 15,
  },
});

export default ModifyPassword;
