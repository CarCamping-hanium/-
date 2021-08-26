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
import {launchImageLibrary} from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;
let imageList = [];

const ChabakjiEnrollment = ({navigation}) => {
  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [comfort, setComfort] = useState('');
  const [videoLink, setVideoLink] = useState('');

  // const chooseImageFromLibrary = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       maxHeight: 200,
  //       maxWidth: screenWidth,
  //       includeBase64: true,
  //       selectionLimit: 0, //사진 수 제한 없음
  //     },
  //     response => {
  //       console.warn('dd');
  //       console.log('Response: ', response);
  //       imageList.push(response.uri);
  //       setImage(imageList);
  //     },
  //   );
  // };
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
        placeholder="차박지 이름을 입력하세요."
        multiline={true}
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
            onPress={() => {
              chooseImageFromLibrary();
            }}>
            <Text style={{color: 'white'}}>사진 업로드</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingRight: 140}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
              marginLeft: 30,
            }}>
            위치
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              fontWeight: '300',
              marginTop: 10,
              marginLeft: 30,
              width: screenWidth - 60,
            }}
            multiline={true}
            onChangeText={text => {
              setLocation(text);
            }}
            value={location}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
              marginLeft: 30,
            }}>
            설명
          </Text>
          <TextInput
            style={styles.description}
            multiline={true}
            onChangeText={text => {
              setDescription(text);
            }}
            value={description}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
              marginLeft: 30,
            }}>
            근처 편의시설 (선택사항)
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              fontWeight: '300',
              marginTop: 10,
              marginLeft: 30,
              width: screenWidth - 60,
            }}
            multiline={true}
            onChangeText={text => {
              setComfort(text);
            }}
            value={comfort}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
              marginLeft: 30,
            }}>
            관련 영상 링크 (선택사항)
          </Text>
          <TextInput
            style={{
              fontSize: 18,
              fontWeight: '300',
              marginTop: 10,
              marginLeft: 30,
              width: screenWidth - 60,
            }}
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
              Alert.alert(
                '차박린이',
                '감사합니다. 회원님의 차박지 등록 심사가 진행될 예정입니다.',
              );
              imageList.length = 0;
              setImage([]);
              setName('');
              setLocation('');
              setDescription('');
              setComfort('');
              setVideoLink('');
              navigation.navigate('홈화면');
            }}>
            <Text style={{color: 'white'}}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Cancel}
            onPress={() => {
              imageList.length = 0;
              setImage([]);
              setName('');
              setLocation('');
              setDescription('');
              setComfort('');
              setVideoLink('');
              navigation.navigate('홈화면');
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
  description: {
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
    borderColor: '#295eba',
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
export default ChabakjiEnrollment;
