import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

const Signup = () => {
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
          placeholder={'example@naver.com'}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholderTextColor="#777777"
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
          onPress={() => {}}>
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
        placeholder={'4자리 이상, 32자리 이하'}
        placeholderTextColor="#777777"
      />
      <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
        비밀번호 확인
      </Text>
      <TextInput
        style={styles.Text}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        secureTextEntry={true}
        placeholder={'비밀번호 재입력'}
        placeholderTextColor="#777777"
      />
      <Text style={{marginTop: '10%', marginLeft: '8%', fontSize: 15}}>
        닉네임
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.Text}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder={'2자리 이상, 8자리 이하'}
          placeholderTextColor="#777777"
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
          }}>
          <Text style={{color: 'white'}}>중복 검사</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#295eba',
          marginLeft: '30%',
          borderRadius: 4,
          width: '40%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '60%',
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
