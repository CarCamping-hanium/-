import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordRight, setPasswordRight] = useState(''); //비밀번호가 일치하는지 아닌지 출력
  const [nickname, setNickname] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState('');
  const [msgColor, setMsgColor] = useState(''); //passwordRight TextColor

  const checkEmail = str => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  const emailChecking = () => {
    if (checkEmail(email) === false) {
      Alert.alert('이메일 형식이 유효하지 않습니다.');
      setEmail('');
      setEmailCheck('');
    } else {
      //fetch
      Alert.alert('유효');
    }
  };

  const checkPassword = str => {
    var regExp = /^[A-Za-z0-9]{4,16}$/;
    return regExp.test(str) ? true : false;
  };

  const passwordChecking = () => {
    if (!checkPassword(password)) {
      Alert.alert(
        '비밀번호는 영문, 숫자를 혼합하여 4자리 이상, 16자리 이하여야 합니다.',
      );
      setPassword('');
      setPasswordCheck('');
      setPasswordRight('');
    } else if (password === passwordCheck) {
      setPasswordRight('비밀번호가 일치합니다.');
      setMsgColor('#295eba');
    } else {
      setPasswordRight('비밀번호가 일치하지 않습니다.');
      setMsgColor('red');
    }
  };

  const checkNickname = str => {
    var regExp = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,8}$/;
    return regExp.test(str) ? true : false;
  };

  const nicknameChecking = () => {
    if (!checkNickname(nickname)) {
      Alert.alert(
        '닉네임은 한글, 영문 대소문자 2자리 이상, 8자리 이하여야 합니다.',
      );
      setNickname('');
      setNicknameCheck('');
    } else {
      //fetch
    }
  };

  const signupChecking = () => {
    if (
      emailCheck === '사용 가능한 이메일입니다.' &&
      passwordCheck === '비밀번호가 일치합니다.' &&
      nicknameCheck === '사용 가능한 닉네임입니다.'
    ) {
      Alert.alert('차박린이', '회원가입을 축하드려요!');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
      }}>
      <Text style={{marginTop: '15%', marginLeft: '8%', fontSize: 15}}>
        이메일 (아이디로 사용됩니다.)
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.Text}
          placeholder={'example@example.com'}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholderTextColor="#777777"
          clearButtonMode={'while-editing'}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#295eba',
            marginLeft: '8%',
            marginTop: 5,
            borderRadius: 4,
            width: '20%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            emailChecking();
          }}>
          <Text style={{color: 'white'}}>중복 검사</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
        비밀번호
      </Text>
      <TextInput
        style={styles.Text}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        secureTextEntry={true}
        placeholder={'영문, 숫자 포함 4~16자리'}
        placeholderTextColor="#777777"
        clearButtonMode={'while-editing'}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
          비밀번호 확인
        </Text>
        <Text
          style={{
            marginTop: '10%',
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
          style={styles.Text}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          secureTextEntry={true}
          placeholder={'비밀번호 재입력'}
          placeholderTextColor="#777777"
          clearButtonMode={'while-editing'}
          onChangeText={text => {
            setPasswordCheck(text);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#295eba',
            marginLeft: '8%',
            marginTop: 5,
            borderRadius: 4,
            width: '25%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            passwordChecking();
          }}>
          <Text style={{color: 'white'}}>비밀번호 확인</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
        닉네임
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.Text}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder={'한글, 영문 대소문자 2~8자리'}
          placeholderTextColor="#777777"
          clearButtonMode={'while-editing'}
          onChangeText={text => {
            setNickname(text);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#295eba',
            marginLeft: '8%',
            marginTop: 5,
            borderRadius: 4,
            width: '20%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            nicknameChecking();
          }}>
          <Text style={{color: 'white'}}>중복 검사</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#295eba',
          marginLeft: '30%',
          borderRadius: 8,
          width: '40%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '60%',
        }}
        onPress={() => {
          signupChecking();
        }}>
        <Text style={{color: 'white', fontSize: 20}}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Text: {
    width: '50%',
    height: 40,
    backgroundColor: '#cccccc',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    marginLeft: '8%',
    marginTop: 5,
  },
});
export default Signup;
