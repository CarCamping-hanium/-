import React, {useState, useEffect, Component} from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';
import Modal from '../Components/Modal';
import Postcode from '@actbase/react-daum-postcode';

const screenWidth = Dimensions.get('window').width;
let imageList = [];

const ChabakjiEnrollment = ({navigation}) => {
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [comfort, setComfort] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [modifyVisible, setModifyVisible] = useState(false);
  const [location, setLocation] = useState(
    '아래 버튼을 눌러 차박지를 검색해주세요.',
  );

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
      // compressImageMaxWidth: screenWidth,
      // compressImageMaxHeight: screenWidth,
      multiple: true, //사진 여러장 불러오기
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true, //ios live photo를 jpg로 바꿔줌
      maxFiles: 10, //사진 최대 10장까지
      compressImageQuality: 1, //이미지 압축 0~1
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginTop: 20, fontWeight: '500', fontSize: 15}}>
            정방형(정사각형) 사진을 추천드려요!
          </Text>
          <TouchableOpacity
            style={styles.uploadPhoto}
            onPress={() => {
              chooseImageFromLibrary();
            }}>
            <Text style={{color: 'white', fontSize: 15}}>사진 업로드</Text>
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
                borderColor: '#295eba',
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 8,
                width: 100,
                height: 50,
              }}
              buttonTextStyle={{fontSize: 17}}
              data={['경기도', '강원도', '충청도', '전라도', '경상도']}
              defaultValue={'경기도'}
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
              borderColor: '#295eba',
              borderRadius: 8,
              width: screenWidth - 40,
              height: 40,
            }}>
            <Text
              style={{
                color: '#aaaaaa',
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
              backgroundColor: '#295eba',
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
              borderColor: '#295eba',
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
              borderColor: '#295eba',
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
              borderColor: '#295eba',
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
              Alert.alert(
                '차박린이',
                '감사합니다. 회원님의 차박지 등록 심사가 진행될 예정입니다.',
              );
              imageList.length = 0;
              setImage([]);
              setName('');
              setLocation('차박지를 검색해주세요.');
              setDescription('');
              setComfort('');
              setVideoLink('');
              navigation.navigate('HomeScreen');
            }}>
            <Text style={{color: 'white', fontSize: 15}}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Cancel}
            onPress={() => {
              imageList.length = 0;
              setImage([]);
              setName('');
              setLocation('차박지를 검색해주세요.');
              setDescription('');
              setComfort('');
              setVideoLink('');
              navigation.navigate('HomeScreen');
            }}>
            <Text style={{color: 'white', fontSize: 15}}>취소</Text>
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
    borderColor: '#295eba',
    borderRadius: 8,
  },
  uploadPhoto: {
    borderRadius: 8,
    width: 120,
    height: 50,
    marginTop: 10,
    backgroundColor: '#295eba',
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
    borderColor: '#295eba',
    borderRadius: 8,
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
export default ChabakjiEnrollment;
