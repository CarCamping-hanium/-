import AsyncStorage from '@react-native-async-storage/async-storage';
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

const ModifyNickname = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState(''); //닉네임 중복 확인 완료 상태 임시 저장
  const {mainColor, userInfo, getUserInfo} = useContext(UserContext);

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
      fetch('http://3.38.85.251:8080/api/checkNickName', {
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
            setNicknameCheck(nickname);
            setNicknameCheckMsg('사용 가능한 닉네임입니다.');
            Alert.alert('사용 가능한 닉네임입니다.');
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const UpdateCheckingFunction = () => {
    if (
      nickname === nicknameCheck &&
      nicknameCheckMsg === '사용 가능한 닉네임입니다.'
    ) {
      fetch('http://3.38.85.251:8080/api/member/update/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: userInfo.token,
        },
        body: JSON.stringify({
          nickname: nickname,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.msg === 'success') {
            Alert.alert('닉네임이 변경되었습니다.');

            //닉네임 변경 시 로컬스토리지에 userInfo 최신화
            getUserInfo();
            navigation.navigate('MyPage');
          } else {
            Alert.alert('닉네임을 다시 확인해주세요.');
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Alert.alert('닉네임을 다시 확인해주세요.');
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
        <Text style={{marginTop: 30, fontSize: 20}}>현재 닉네임</Text>
        <Text style={{marginTop: 10, fontSize: 24}}>{userInfo.nickname}</Text>
        <Text style={{marginTop: 30, fontSize: 20}}>변경할 닉네임</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
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
              backgroundColor: mainColor,
              marginLeft: 20,
              marginTop: 5,
              borderRadius: 8,
              width: 80,
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
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: mainColor,
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
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#aaaaaa',
    marginTop: 5,
  },
});

export default ModifyNickname;
