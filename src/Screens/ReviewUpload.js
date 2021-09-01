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
import {Rating} from 'react-native-ratings';

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
              imageList.length = 0;
              setImage([]);
              Alert.alert('차박린이', '회원님의 소중한 리뷰가 등록되었습니다.');
              navigation.navigate('ReviewBoard');
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
});
export default ReviewUpload;
