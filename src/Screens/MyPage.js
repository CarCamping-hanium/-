import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
} from 'react';
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
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {useFocusEffect} from '@react-navigation/core';
import {isExportNamedDeclaration} from '@babel/types';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPage = ({navigation}) => {
  const {mainColor, userInfo, getUserInfo, deleteMember} =
    useContext(UserContext);
  const [password, setPassword] = useState('');
  const [modifyVisible, setModifyVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [point, setPoint] = useState(0);
  const scrollRef = useRef();

  const styles = StyleSheet.create({
    Text: {
      width: 200,
      height: 40,
      borderWidth: 2,
      borderColor: mainColor,
      backgroundColor: 'white',
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 8,
      marginTop: 15,
    },
  });

  //사진을 서버로 보내는 함수
  const uploadProfile = () => {
    if (profileImage !== null) {
      const formData = new FormData();
      formData.append('images', {
        name: 'profile',
        type: 'image/jpeg',
        uri: profileImage.path,
      });
      fetch('http://3.38.85.251:8080/api/updateProfile', {
        //서버로 아이디, 비번 보내서 일치하는지 확인
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          token: userInfo.token,
        },
        body: formData,
      })
        .then(response => response.json())
        .then(json => {
          console.log('upload api console : ', json);
          if (json.msg === 'success') {
            console.log('succe:', json);
            getUserInfo();
          } else {
            Alert.alert(json.msg);
          }
        });
    }
  };

  //프사 삭제 함수
  const deleteProfile = () => {
    fetch('http://3.38.85.251:8080/api/deleteProfile', {
      //서버로 아이디, 비번 보내서 일치하는지 확인
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success === true) {
          setProfileImage(null);
          getUserInfo();
          Alert.alert('프로필 사진이 삭제되었습니다.');
        }
      });
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
    }).then(response => {
      //각각의 사진들을 imageList 배열에 넣는 과정
      // response.map(img => {
      //   imageList.push(img.path);
      //   console.log(typeof img.path);
      //   //imageList = [...image, img.path];
      // });
      setProfileImage(response);
      setProfileModalVisible(false);
    });
  };

  const isAdmin = () => {
    if (userInfo.id === 'admin') {
      return (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: screenWidth,
              height: 60,
              paddingLeft: 30,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate('CheckChabakji');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>차박지 승인</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#aaaaaa',
                  position: 'absolute',
                  right: 20,
                }}>
                {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const scrollToTop = () => {
    scrollRef.current.scrollTo({y: 0});
  };

  useFocusEffect(
    useCallback(() => {
      scrollToTop();
      getUserInfo();
    }, []),
  );

  //프사가 변경될 때마다 프로필을 변경된 프사로 새로고침 하기 위함
  useEffect(() => {
    uploadProfile();
    getUserInfo();
  }, [profileImage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 25}}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image
            source={require('../Assets/Images/Menu.png')}
            style={{marginBottom: 10}}
          />
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
        //backgroundColor: 'white',
      }}>
      <ScrollView style={{marginTop: 0}} ref={scrollRef}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setProfileModalVisible(true);
              }}>
              <Image
                source={
                  userInfo.profile === null
                    ? require('../Assets/Images/empty_profile.png')
                    : {uri: userInfo.profile}
                }
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
            <Modal visible={profileModalVisible}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  height: 300,
                  borderWidth: 3,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  borderColor: mainColor,
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 250,
                    height: 50,
                    backgroundColor: mainColor,
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
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 250,
                    height: 50,
                    backgroundColor: mainColor,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setProfileModalVisible(false);
                    if (profileImage === null) {
                      Alert.alert('프로필 사진이 설정되어 있지 않습니다.');
                    } else {
                      Alert.alert('프로필 사진을 삭제하시겠습니까?', '', [
                        {
                          text: '삭제',
                          onPress: () => {
                            deleteProfile();
                          },
                        },
                        {
                          text: '취소',
                          onPress: () => {
                            setProfileImage(userInfo.profile);
                          },
                        },
                      ]);
                    }
                  }}>
                  <Text style={{color: 'white', fontSize: 18}}>
                    프로필 사진 삭제
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 120,
                    height: 50,
                    backgroundColor: mainColor,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setProfileModalVisible(false);
                  }}>
                  <Text style={{color: 'white', fontSize: 18}}>취소</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>환영해요, {userInfo.nickname}님!</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 2,
            width: screenWidth,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                marginRight: 2,
              }}>
              <TouchableOpacity
                style={{
                  width: screenWidth / 2,
                  height: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigation.navigate('MyPointHistory');
                }}>
                <Image
                  source={require('../Assets/Images/point.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={{fontSize: 18, marginTop: 7}}>
                  내 포인트 : {userInfo.point}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  width: screenWidth / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModifyVisible(true);
                }}>
                <Image
                  source={require('../Assets/Images/edit.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={{fontSize: 18, marginTop: 7}}>회원 정보 수정</Text>
              </TouchableOpacity>
              <Modal visible={modifyVisible}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 200,
                    width: 300,
                    borderColor: mainColor,
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
                        backgroundColor: mainColor,
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
                      <Text style={{color: 'white', fontSize: 18}}>
                        닉네임 변경
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: mainColor,
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
                        backgroundColor: mainColor,
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
          </View>
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  width: screenWidth / 2,
                  height: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigation.navigate('MyChabakji');
                }}>
                <Image
                  source={require('../Assets/Images/tent.png')}
                  style={{width: 60, height: 50}}
                />
                <Text style={{fontSize: 18, marginTop: 7}}>
                  내가 등록한 차박지
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  width: screenWidth / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigation.navigate('MyReview');
                }}>
                <Image
                  source={require('../Assets/Images/review.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={{fontSize: 18, marginTop: 7}}>
                  내가 등록한 리뷰
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isAdmin()}
        <View
          style={{
            alignItems: 'center',
            marginTop: userInfo.id === 'admin' ? 2 : 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: screenWidth,
              height: 60,
              paddingLeft: 30,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate('Notice');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>공지사항</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#aaaaaa',
                  position: 'absolute',
                  right: 20,
                }}>
                {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 2,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: screenWidth,
              height: 60,
              paddingLeft: 30,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate('CustomerService');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>고객센터</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#aaaaaa',
                  position: 'absolute',
                  right: 20,
                }}>
                {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: screenWidth,
              height: 60,
              paddingLeft: 30,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              setDeleteVisible(true);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, color: 'red'}}>회원 탈퇴</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#aaaaaa',
                  position: 'absolute',
                  right: 20,
                }}>
                {'>'}
              </Text>
            </View>
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
              borderColor: mainColor,
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
                  backgroundColor: mainColor,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;
