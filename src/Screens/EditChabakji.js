import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
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

const EditChabakji = ({navigation}) => {
  const {mainColor, userInfo, selectedChabak_name, chabak_ID, chabak_name} =
    useContext(UserContext);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(''); //image
  const [videoLink, setVideoLink] = useState(''); //videoLink
  const [explanation, setExplanation] = useState(''); //explanation
  const [facilities, setFacilities] = useState(''); //facilities
  const [campsite_id, setCampsite_id] = useState('');
  const [changedImage, setChangedImage] = useState(''); //S3에 의해 변환된 후의 주소
  const [name, setName] = useState(chabak_name); //name

  //기존 정보와 변동 여부를 체크하는 state
  const [cmpImage, setCmpImage] = useState('');
  const [cmpName, setCmpName] = useState('');
  const [cmpExp, setCmpExp] = useState('');
  const [cmpFaci, setCmpFaci] = useState('');
  const [cmpVideo, setCmpVideo] = useState('');

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
      marginTop: 30,
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

  const getInfo = () => {
    fetch(`http://3.38.85.251:8080/api/camping/${chabak_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        setAddress(json.data.address);
        setImage(json.data.image);
        setChangedImage(json.data.image);
        setCmpImage(json.data.image);
        setVideoLink(json.data.videoLink);
        setCmpVideo(json.data.videoLink);
        setExplanation(json.data.explanation);
        setCmpExp(json.data.explanation);
        setFacilities(json.data.facilities);
        setCmpFaci(json.data.facilities);
        setCampsite_id(json.data.campsite_id);
        setCmpName(json.data.name);
      })
      .catch(e => {
        console.log(e);
      });
  };

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
            source={{uri: image === changedImage ? image : image.path}}
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
          setChangedImage(json.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const apply = () => {
    if (
      cmpName === name &&
      cmpImage === changedImage &&
      cmpExp === explanation &&
      cmpFaci === facilities &&
      cmpVideo === videoLink
    ) {
      Alert.alert('변동 사항이 없습니다.');
      navigation.goBack();
    } else {
      if (changedImage === '' || explanation === '' || name === '') {
        Alert.alert('입력되지 않은 정보가 있습니다.');
      } else {
        fetch('http://3.38.85.251:8080/api/change/campsite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: userInfo.token,
          },
          body: JSON.stringify({
            address,
            campsite_id,
            explanation,
            facilities,
            images: changedImage,
            name,
            videoLink,
          }),
        })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            if (json.success === true) {
              if (userInfo.id === 'admin') {
                selectedChabak_name(name);
                Alert.alert('차박지가 수정되었습니다.');
              } else
                Alert.alert(
                  '감사합니다. 회원님의 차박지 수정 심사가 진행될 예정입니다.',
                );
              navigation.navigate('MyChabakjiInfo');
            } else {
              Alert.alert(json.msg);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };

  useEffect(() => {
    if (image.path !== undefined && image !== changedImage) uploadPhoto();
  }, [image]);

  useLayoutEffect(() => {
    getInfo();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            apply();
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            완료
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => {
          apply();
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          완료
        </Text>
      </TouchableOpacity>
    ),
  });

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
          <View
            style={{
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
              {address}
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.description}
            placeholder="차박지에 대한 설명을 입력하세요."
            placeholderTextColor="#aaaaaa"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={text => {
              setExplanation(text);
            }}
            value={explanation}
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
              setFacilities(text);
            }}
            value={facilities}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditChabakji;
