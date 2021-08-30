import React, {useState, useContext, useLayoutEffect} from 'react';
import {UserContext} from '../Context/Context';
import Modal from '../Components/Modal';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPage = ({navigation}) => {
  const {userInfo} = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  // const passwordCheckFunction = () => {
  //   fetch('http://3.36.28.39:8080/api/member/update/password', {
  //     //서버로 아이디, 비번 보내서 일치하는지 확인
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: id_data,
  //       password: password_data,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(json => {})
  //     .catch(e => console.log(e));
  //   if (password === '1234') {
  //     navigation.navigate('ModifyMember');
  //   } else {
  //     Alert.alert('비밀번호를 다시 확인해주세요.');
  //   }
  // };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 25}}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image source={require('../Assets/Images/Menu.png')} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyPointHistory');
        }}>
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 8,
            borderColor: '#295eba',
            padding: 10,
          }}>
          내 포인트 : {userInfo.point}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 35,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#295eba',
            width: 130,
            height: 50,
            borderRadius: 8,
            marginHorizontal: 10,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            회원 정보 수정
          </Text>
        </TouchableOpacity>
        <Modal visible={visible}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              width: 300,
              borderColor: '#295eba',
              borderWidth: 3,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 40,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#295eba',
                  width: 120,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginRight: 20,
                }}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('ModifyNickname');
                }}>
                <Text style={{color: 'white', fontSize: 18}}>닉네임 변경</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#295eba',
                  width: 120,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('ModifyPassword');
                }}>
                <Text style={{color: 'white', fontSize: 18}}>
                  비밀번호 변경
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', bottom: 20}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#295eba',
                  width: 100,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={{color: 'white', fontSize: 18}}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Text style={{marginTop: 30, marginLeft: '8%', fontSize: 15}}>
              현재 비밀번호를 입력하세요.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  width: '60%',
                  height: 40,
                  backgroundColor: 'white',
                  paddingLeft: 20,
                  paddingRight: 10,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  marginTop: 25,
                  borderLeftWidth: 2,
                  borderTopWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: '#295eba',
                }}
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling={false}
                placeholderTextColor="#777777"
                clearButtonMode={'while-editing'}
                secureTextEntry={true}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity
                style={{
                  marginTop: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#295eba',
                  width: 50,
                  height: 40,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
                onPress={() => {
                  passwordCheckFunction(); //구현해야함
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>확인</Text>
              </TouchableOpacity>
              </View>*/}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#295eba',
            width: 130,
            height: 50,
            borderRadius: 8,
          }}
          onPress={() => {
            navigation.navigate('MyReview');
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            내가 쓴 리뷰 확인
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../Assets/Images/mypage_background.png')}
        style={{width: screenWidth, height: screenWidth, marginTop: '15%'}}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e64f49',
            width: 130,
            height: 50,
            borderRadius: 8,
          }}
          onPress={() => {}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;
