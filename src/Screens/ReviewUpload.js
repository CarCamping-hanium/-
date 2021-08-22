import React, {useState, useEffect} from 'react';
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
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
let imageList = [];

const ReviewUpload = ({navigation}) => {
  const [image, setImage] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [score, setScore] = useState(0);

  const chooseImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenWidth,
      cropping: true,
      showCropGuidelines: true,
      compressImageMaxWidth: screenWidth,
      compressImageMaxHeight: screenWidth,
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 10,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(response => {
        //각각의 사진들을 imageList 배열에 넣는 과정
        console.log('Response: ', response);
        response.map(img => {
          imageList.push(img.path);
          //imageList = [...image, img.path];
        });
        setImage(imageList);
      })
      .catch(e => console.log('Error: ', e.message));
  };

  const removeImage = index => {
    let new_imageList = [...image];
    new_imageList.splice(index, 1);
    setImage(new_imageList);
    imageList = [...new_imageList];
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
        <FlatList
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
                source={{uri: image[index]}}
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
              /> */}
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
        />
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
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            placeholder="리뷰 내용을 입력하세요."
            multiline={true}
            onChangeText={text => {
              setReviewDescription(text);
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>이 차박지의 점수는?</Text>
          <Stars
            half={true}
            default={2.5}
            spacing={4}
            starSize={40}
            count={5}
            fullStar={require('../Assets/Images/starFilled.png')}
            emptyStar={require('../Assets/Images/starEmpty.png')}
            halfStar={require('../Assets/Images/starHalf.png')}
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
              imageList.length = 0;
              setImage([]);
              Alert.alert('차박린이', '회원님의 리뷰가 업로드 되었습니다.');
              navigation.navigate('리뷰 페이지');
            }}>
            <Text style={{color: 'white'}}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Cancel}
            onPress={() => {
              imageList.length = 0;
              setImage([]);
              navigation.navigate('리뷰 페이지');
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
  },
  uploadPhoto: {
    borderRadius: 4,
    width: 100,
    height: 40,
    marginTop: 10,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Enroll: {
    borderRadius: 4,
    width: 100,
    height: 40,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cancel: {
    borderRadius: 4,
    width: 100,
    height: 40,
    backgroundColor: '#295eba',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
export default ReviewUpload;
