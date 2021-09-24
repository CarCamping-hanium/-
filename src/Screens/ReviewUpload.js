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
import {Rating} from 'react-native-ratings';
import {UserContext} from '../Context/Context';
const screenWidth = Dimensions.get('window').width;
let imageList = [];
const ReviewUpload = ({navigation}) => {
  const {userInfo, chabak_ID} = useContext(UserContext);
  const [changedImage, setChangedImage] = useState(''); //S3에 의해 변환된 후의 주소
  const [image, setImage] = useState(''); //image
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [score, setScore] = useState(2.5);
  useEffect(() => {
    if (image !== '') uploadPhoto();
  }, [image]);

  const showImage = () => {
    if (image === '') {
      return (
        <View>
          <Image
            source={require('../Assets/Images/wait_photo.png')}
            style={{width: screenWidth, height: screenWidth}}
          />
        </View>
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

  const ReviewUpload = () => {
    if (image === '' || reviewTitle === '' || reviewDescription === '') {
      Alert.alert('입력되지 않은 정보가 있습니다.');
    } else {
      console.log(image);
      var url = 'http://3.38.85.251:8080/api/review/' + chabak_ID;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: userInfo.token,
        },
        body: JSON.stringify({
          content: reviewDescription,
          images: changedImage,
          score: score,
          title: reviewTitle,
        }),
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (json.success === true) {
            imageList.length = 0;
            setImage([]);
            Alert.alert('차박린이', '회원님의 소중한 리뷰가 등록되었습니다.');
            navigation.navigate('ReviewBoard');
          }
        })
        .catch(e => {
          console.log(e);
        });
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
      <TextInput
        style={styles.name}
        placeholder="리뷰 제목을 입력하세요."
        placeholderTextColor="#aaaaaa"
        multiline={true}
        onChangeText={text => {
          setReviewTitle(text);
        }}
      />
      <ScrollView
        style={{
          marginTop: '5%',
          marginHorizontal: 20,
          width: screenWidth,
        }}>
        {showImage()}
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: 20, fontWeight: '500', fontSize: 15}}>
            정방형(정사각형) 사진을 추천드려요!
          </Text>
          <TouchableOpacity
            style={styles.uploadPhoto}
            onPress={chooseImageFromLibrary}>
            <Text style={{color: 'white'}}>사진 업로드</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: '300',
              marginTop: 10,
              marginLeft: 30,
              width: screenWidth - 60,
              height: 200,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: '#295eba',
              borderRadius: 8,
            }}
            placeholder="리뷰 내용을 입력하세요."
            placeholderTextColor="#aaaaaa"
            multiline={true}
            onChangeText={text => {
              setReviewDescription(text);
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={{marginBottom: 20, fontSize: 18}}>
            이 차박지의 점수는?
          </Text>
          <Rating
            onStartRating={0}
            ratingCount={5}
            imageSize={40}
            jumpValue={0.5}
            showRating={true}
            fractions={10}
            onFinishRating={rating => {
              setScore(rating);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.Enroll}
            onPress={() => {
              ReviewUpload();
            }}>
            <Text style={{color: 'white'}}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Cancel}
            onPress={() => {
              imageList.length = 0;
              setImage([]);
              navigation.navigate('ReviewBoard');
            }}>
            <Text style={{color: 'white'}}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 15,
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
    borderColor: '#295eba',
    borderRadius: 8,
  },
  uploadPhoto: {
    borderRadius: 8,
    width: 100,
    height: 40,
    marginTop: 10,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Enroll: {
    borderRadius: 8,
    width: 100,
    height: 40,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cancel: {
    borderRadius: 8,
    width: 100,
    height: 40,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
});
export default ReviewUpload;
