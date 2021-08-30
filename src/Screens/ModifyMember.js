import React, {useState, useLayoutEffect} from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';
const ModifyMember = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordRight, setPasswordRight] = useState(''); //비밀번호가 일치하는지 아닌지 출력
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(''); //비밀번호 중복 확인 완료 상태 임시 저장
  const [nicknameCheck, setNicknameCheck] = useState(''); //닉네임 중복 확인 완료 상태 임시 저장
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
      fetch('http://3.36.28.39:8080/api/checkNickName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          check: nickname,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.data === true) {
            Alert.alert('이미 사용중인 닉네임입니다.');
          } else {
            Alert.alert('사용 가능한 닉네임입니다.');
            setNicknameCheck(nickname);
            setNicknameCheckMsg('사용 가능한 닉네임입니다.');
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const UpdateCheckingFunction = () => {
    /*  if (
          password === repassword &&
          repassword === passwordCheck &&
          nickname === nicknameCheck &&
          passwordRight === '비밀번호가 일치합니다.' &&
          nicknameCheckMsg === '사용 가능한 닉네임입니다.'
        ) {
         
        ni
          })*/
    Alert.alert('회원 정보가 수정되었습니다.');
    navigation.navigate('MyPage');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('MyPage');
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
      }}>
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
        placeholder={'영문, 숫자 혼합 8~16자리'}
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
          UpdateCheckingFunction();
        }}>
        <Text style={{color: 'white', fontSize: 20}}>수정</Text>
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

export default ModifyMember;
