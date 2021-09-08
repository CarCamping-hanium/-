import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import {UserContext} from '../Context/Context';
import Modal from '../Components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPage = ({navigation}) => {
  const {userInfo, getUserInfo, deleteMember} = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [modifyVisible, setModifyVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  //사진을 서버로 보내는 함수
  const uploadProfile = () => {
    if (profileImage !== null) {
      const formData = new FormData();
      formData.append('images', {
        name: profileImage.filename,
        type: 'image/jpeg',
        uri: profileImage.path,
      });
      Alert.alert('프로필 사진을 변경하시겠습니까?', '', [
        {
          text: '변경',
          onPress: () => {
            fetch('http://3.38.85.251:8080/api/updateProfile', {
              //서버로 아이디, 비번 보내서 일치하는지 확인
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                token: userInfo.token,
              },
              body: formData,
            })
              .then(response => response.json())
              .then(json => {
                console.log(json);
                if (json.msg === 'success') {
                  Alert.alert('프로필 사진이 변경되었습니다.');
                  getUserInfo();
                } else {
                  Alert.alert(json.msg);
                }
              });
          },
        },
        {
          text: '취소',
          onPress: () => {
            //setProfileImage(userInfo.profile);
          },
        },
      ]);
    }
  };

  //갤러리에서 사진을 고르는 함수
  const chooseImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenWidth,
      cropping: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true, //ios live photo를 jpg로 바꿔줌
      compressImageQuality: 1, //이미지 압축 0~1
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        //각각의 사진들을 imageList 배열에 넣는 과정
        // response.map(img => {
        //   imageList.push(img.path);
        //   console.log(typeof img.path);
        //   //imageList = [...image, img.path];
        // });
        console.log('Response: ', response);
        setProfileModalVisible(false);
        setProfileImage(response);
      })
      .catch(e => console.log('Error: ', e.message));
  };

  useEffect(() => {
    setProfileImage(userInfo.profile);
    getUserInfo();
  }, []);

  //프사가 변경될 때마다 프로필을 변경된 프사로 새로고침 하기 위함
  useEffect(() => {
    getUserInfo();
  }, [userInfo.profile]);

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
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => {
          setProfileModalVisible(true);
        }}>
        <Image
          source={
            profileImage === null
              ? require('../Assets/Images/empty_profile.png')
              : {uri: userInfo.profile}
          }
          style={{width: 200, height: 200, borderRadius: 20}}
        />
      </TouchableOpacity>
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
          uploadProfile();
        }}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>사진 변경 완료</Text>
      </TouchableOpacity>
      <Modal visible={profileModalVisible}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 200,
            borderWidth: 3,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: '#295eba',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 250,
              height: 50,
              backgroundColor: '#295eba',
              borderRadius: 10,
            }}
            onPress={() => {
              chooseImageFromLibrary();
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              갤러리에서 가져오기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 250,
              height: 50,
              backgroundColor: '#295eba',
              borderRadius: 10,
            }}
            onPress={() => {
              setProfileImage(null);
              setProfileModalVisible(false);
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              기본 이미지로 설정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 50,
              backgroundColor: '#295eba',
              borderRadius: 10,
            }}
            onPress={() => {
              setProfileModalVisible(false);
            }}>
            <Text style={{color: 'white', fontSize: 18}}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyPointHistory');
        }}>
        <Text
          style={{
            marginTop: 20,
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
      <View style={{marginTop: 20}}>
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
            setModifyVisible(true);
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            회원 정보 수정
          </Text>
        </TouchableOpacity>
        <Modal visible={modifyVisible}>
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
                  setModifyVisible(false);
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
                  setModifyVisible(false);
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
                  setModifyVisible(false);
                }}>
                <Text style={{color: 'white', fontSize: 18}}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#295eba',
            width: 130,
            height: 50,
            borderRadius: 8,
            marginRight: 20,
          }}
          onPress={() => {
            navigation.navigate('MyChabakji');
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            내가 등록한 차박지
          </Text>
        </TouchableOpacity>
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
            내가 등록한 리뷰
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e64f49',
            width: 130,
            height: 50,
            borderRadius: 8,
          }}
          onPress={() => {
            setDeleteVisible(true);
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={deleteVisible}>
        <View
          style={{
            height: 300,
            width: 300,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 3,
            borderColor: '#295eba',
          }}>
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
              setPassword(text);
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 60}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#e64f49',
                width: 100,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                Alert.alert('정말로 회원을 탈퇴하시겠습니까?', '', [
                  {
                    text: '탈퇴',
                    onPress: () => {
                      fetch('http://3.38.85.251:8080/api/memberDelete', {
                        //서버로 아이디, 비번 보내서 일치하는지 확인
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          token: userInfo.token,
                        },
                        body: JSON.stringify({
                          check: password,
                        }),
                      })
                        .then(response => response.json())
                        .then(json => {
                          console.log(json);
                          if (json.msg === 'success') {
                            deleteMember();
                            Alert.alert('회원 탈퇴가 완료되었습니다.');
                          } else {
                            Alert.alert(json.msg);
                          }
                        });
                    },
                  },
                  {
                    text: '취소',
                  },
                ]);
              }}>
              <Text style={{color: 'white', fontSize: 18}}>회원 탈퇴</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#295eba',
                width: 100,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginLeft: 25,
              }}
              onPress={() => {
                setDeleteVisible(false);
              }}>
              <Text style={{color: 'white', fontSize: 18}}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Text: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: '#295eba',
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    marginTop: 15,
  },
});

export default MyPage;
