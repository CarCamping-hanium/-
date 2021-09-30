import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  Linking,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Modal from '../Components/Modal';
import Postcode from '@actbase/react-daum-postcode';
import {UserContext} from '../Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const ChabakjiEnrollment = ({navigation}) => {
  const [changedImage, setChangedImage] = useState(''); //S3에 의해 변환된 후의 주소
  const [image, setImage] = useState(''); //image
  const [category, setCategory] = useState('지역'); //region
  const [name, setName] = useState(''); //name
  const [description, setDescription] = useState(''); //explanation
  const [comfort, setComfort] = useState(''); //facilities
  const [videoLink, setVideoLink] = useState(''); //videoLink
  const [location, setLocation] = useState(
    //address
    '아래 버튼을 눌러 차박지를 검색해주세요.',
  );
  const [modifyVisible, setModifyVisible] = useState(false);
  const {mainColor, userInfo, getUserInfo} = useContext(UserContext);

  const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    name: {
      fontSize: 18,
      fontWeight: '500',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5%',
      width: '90%',
      height: 40,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: mainColor,
      borderRadius: 8,
    },
    selectPhoto: {
      borderRadius: 8,
      width: 120,
      height: 50,
      marginTop: 10,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadPhoto: {
      marginLeft: 20,
      borderRadius: 8,
      width: 120,
      height: 50,
      marginTop: 10,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      padding: 10,
      fontSize: 18,
      fontWeight: '400',
      marginTop: 30,
      marginLeft: 30,
      width: screenWidth - 60,
      height: 200,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: mainColor,
      borderRadius: 8,
    },
    Enroll: {
      borderRadius: 8,
      width: 100,
      height: 40,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Cancel: {
      borderRadius: 8,
      width: 100,
      height: 40,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 50,
    },
  });

  //사진을 아직 선택하지 않았을 때와 선택한 후의 보여지는 이미지가 다름
  const showImage = () => {
    if (image === '') {
      return (
        <View
          style={{
            width: screenWidth,
            height: screenWidth,
            backgroundColor: '#eeeeee',
          }}
        />
      );
    } else {
      return (
        <View>
          <Image
            source={{uri: image.path}}
            style={{width: screenWidth, height: screenWidth}}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
            }}
            onPress={() => {
              removeImage();
            }}>
            <Image
              source={require('../Assets/Images/removePhoto.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  //갤러리에서 사진을 가져옴
  const chooseImageFromLibrary = () => {
    if (image === '') {
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
          setImage(response);
        })
        .catch(e => console.log('Error: ', e.message));
    } else {
      Alert.alert('이미 사진이 존재합니다.');
    }
  };

  const removeImage = index => {
    // let new_imageList = [...image];
    // new_imageList.splice(index, 1);
    // setImage(new_imageList);
    // imageList = [...new_imageList];
    setImage('');
    fetch(`http://3.38.85.251:8080/api/delete?images=${changedImage}`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //가져온 사진을 서버에 먼저 업로드하는 과정의 함수
  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append('images', {
      name: 'name',
      type: 'image/jpeg',
      uri: image.path,
    });
    fetch('http://3.38.85.251:8080/api/upload', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        token: userInfo.token,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        console.log('upload api : ', json);
        console.log(json.data);
        if (json.success === true) {
          //setCheckImageUpload(true);
          setChangedImage(json.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (image !== '') uploadPhoto();
  }, [image]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TextInput
        style={styles.name}
        placeholder="차박지 이름을 입력하세요."
        placeholderTextColor="#aaaaaa"
        multiline={true}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        onChangeText={text => {
          setName(text);
        }}
        value={name}
      />
      <ScrollView
        style={{
          marginTop: '5%',
          marginHorizontal: 20,
          width: screenWidth,
        }}>
        {/* <FlatList
          style={{height: screenWidth, width: screenWidth}}
          horizontal={true}
          pagingEnabled={true}
          data={image}
          keyExtractor={(item, index) => {
            return `image-${index}`;
          }}
          renderItem={({item, index}) => (
            <View>
              <Image
                source={{uri: `data:${image.mime};base64,${image.data}`}}
                style={{width: screenWidth, height: screenWidth}}
              />
              {/* <Image
                style={{
                  position: 'absolute',
                  right: 0,
                  height: 25,
                  width: 25,
                }}
                source={require('../Assets/Images/image_deleteButton.png')}
                onPress={() => {
                  console.warn('click');
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                }}
                onPress={() => {
                  removeImage(index);
                }}>
                <Text style={{fontSize: 30}}>❎</Text>
              </TouchableOpacity>
            </View>
          )}
        /> */}
        {showImage()}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginTop: 20, fontWeight: '500', fontSize: 15}}>
            정방형(정사각형) 사진을 추천드려요!
          </Text>
          <TouchableOpacity
            style={styles.selectPhoto}
            onPress={() => {
              chooseImageFromLibrary();
            }}>
            <Text style={{color: 'white', fontSize: 15}}>사진 선택</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <SelectDropdown
              buttonStyle={{
                borderColor: mainColor,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 8,
                width: 120,
                height: 50,
              }}
              buttonTextStyle={{fontSize: 17}}
              data={['지역', '경기도', '강원도', '충청도', '전라도', '경상도']}
              defaultValue={'지역'}
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: mainColor,
              borderRadius: 8,
              width: screenWidth - 40,
              height: 40,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
              }}>
              {location}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: mainColor,
              width: 120,
              height: 50,
              borderRadius: 8,
              marginHorizontal: 10,
              marginTop: 30,
            }}
            onPress={() => {
              setModifyVisible(true);
            }}>
            <Text style={{color: 'white', fontSize: 15}}>위치 검색하기</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modifyVisible}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 650,
              width: 310,
              borderColor: mainColor,
              borderWidth: 3,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <Postcode
              style={{width: 300, height: 590}}
              jsOptions={{animated: true, hideMapBtn: true}}
              onSelected={data => {
                setLocation(data.address);
                console.log(data.address);
                setModifyVisible(false);
              }}
            />
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
        </Modal>
        <View>
          <TextInput
            style={styles.description}
            placeholder="차박지에 대한 설명을 입력하세요."
            placeholderTextColor="#aaaaaa"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={text => {
              setDescription(text);
            }}
            value={description}
          />
        </View>
        <View>
          <TextInput
            style={{
              fontSize: 18,
              fontWeight: '400',
              marginTop: 30,
              marginLeft: 30,
              width: screenWidth - 60,
              height: 40,
              paddingLeft: 10,
              borderWidth: 2,
              borderColor: mainColor,
              borderRadius: 8,
            }}
            placeholder="근처 편의시설(선택 사항)"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={text => {
              setComfort(text);
            }}
            value={comfort}
          />
        </View>
        <View>
          <TextInput
            style={{
              fontSize: 18,
              fontWeight: '400',
              marginTop: 30,
              marginLeft: 30,
              width: screenWidth - 60,
              height: 40,
              paddingLeft: 10,
              borderWidth: 2,
              borderColor: mainColor,
              borderRadius: 8,
            }}
            placeholder="관련 영상 링크(선택 사항)"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={text => {
              setVideoLink(text);
            }}
            value={videoLink}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.Enroll}
            onPress={() => {
              if (
                image === '' ||
                location === '아래 버튼을 눌러 차박지를 검색해주세요.' ||
                description === '' ||
                name === ''
              ) {
                Alert.alert('입력되지 않은 정보가 있습니다.');
              } else if (category === '지역') {
                Alert.alert('지역을 선택하세요.');
              } else {
                fetch('http://3.38.85.251:8080/api/camping/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    token: userInfo.token,
                  },
                  body: JSON.stringify({
                    address: location,
                    explanation: description,
                    facilities: comfort,
                    images: changedImage,
                    name: name,
                    region: category,
                    videoLink: videoLink,
                  }),
                })
                  .then(response => response.json())
                  .then(json => {
                    console.log(json);
                    if (json.success === true) {
                      Alert.alert(
                        '감사합니다. 회원님의 차박지 등록 심사가 진행될 예정입니다.',
                      );
                      setImage('');
                      setName('');
                      setLocation('아래 버튼을 눌러 차박지를 검색해주세요.');
                      setDescription('');
                      setComfort('');
                      setVideoLink('');
                      setCategory('지역');
                      setChangedImage('');
                      getUserInfo();
                      navigation.navigate('HomeScreen');
                    } else {
                      Alert.alert(json.msg);
                    }
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
            }}>
            <Text style={{color: 'white', fontSize: 15}}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Cancel}
            onPress={() => {
              setImage('');
              setName('');
              setLocation('아래 버튼을 눌러 차박지를 검색해주세요.');
              setDescription('');
              setComfort('');
              setVideoLink('');
              setCategory('지역');
              setChangedImage('');
              navigation.navigate('HomeScreen');
            }}>
            <Text style={{color: 'white', fontSize: 15}}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChabakjiEnrollment;
