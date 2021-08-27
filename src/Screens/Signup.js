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
import {check} from 'react-native-permissions';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailCheckMsg, setEmailCheckMsg] = useState('');
  const [passwordRight, setPasswordRight] = useState(''); //비밀번호가 일치하는지 아닌지 출력
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('');

  const [emailCheck, setEmailCheck] = useState(''); //이메일 중복 확인 완료 상태 임시 저장
  const [passwordCheck, setPasswordCheck] = useState(''); //비밀번호 중복 확인 완료 상태 임시 저장
  const [nicknameCheck, setNicknameCheck] = useState(''); //닉네임 중복 확인 완료 상태 임시 저장

  const [msgColor, setMsgColor] = useState(''); //passwordRight TextColor

  const emailChecking = str => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  const emailCheckingFunction = () => {
    if (emailChecking(email) === false) {
      Alert.alert('이메일 형식이 유효하지 않습니다.');
      setEmail('');
      setEmailCheckMsg('');
    } else {
      fetch(
        'http://3.36.28.39:8080/api/signUp',
        // , {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(email),
        // }
      )
        .then(response => response.json())
        .then(json => {
          console.warn(json.point);
        });
    }
  };

  const passwordChecking = str => {
    var regExp = /^[A-Za-z0-9]{4,16}$/;
    return regExp.test(str) ? true : false;
  };

  const passwordCheckingFunction = () => {
    if (!passwordChecking(password)) {
      Alert.alert(
        '비밀번호는 영문, 숫자를 혼합하여 4자리 이상, 16자리 이하여야 합니다.',
      );
      setPassword('');
      setRepassword('');
      setPasswordRight('');
    } else if (password === repassword) {
      setPasswordCheck(password);
      setPasswordRight('비밀번호가 일치합니다.');
      setMsgColor('#295eba');
    } else {
      setPasswordRight('비밀번호가 일치하지 않습니다.');
      setMsgColor('red');
    }
  };

  const nicknameChecking = str => {
    var regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,7}$/;
    return regExp.test(str) ? true : false;
  };

  const nicknameCheckingFunction = () => {
    if (!nicknameChecking(nickname)) {
      Alert.alert(
        '닉네임은 한글, 영문, 숫자만 가능하며 2자리 이상, 8자리 이하여야 합니다.',
      );
      setNickname('');
      setNicknameCheckMsg('');
    } else {
      //fetch
    }
  };

  const signupCheckingFunction = () => {
    if (
      emailCheckMsg === '사용 가능한 이메일입니다.' &&
      passwordRight === '비밀번호가 일치합니다.' &&
      nicknameCheckMsg === '사용 가능한 닉네임입니다.'
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
            emailCheckingFunction();
          }}>
          <Text style={{color: 'white'}}>중복 검사</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
        비밀번호
      </Text>
      <TextInput
        style={styles.Text}
        // textContentType={'newPassword'}
        blurOnSubmit={false}
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
            setRepassword(text);
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
            passwordCheckingFunction();
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
          placeholder={'한글, 영문, 숫자 2~8자리'}
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
            nicknameCheckingFunction();
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
          signupCheckingFunction();
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
