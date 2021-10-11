import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  View,
  Linking,
  Alert,
} from 'react-native';
import {UserContext} from '../Context/Context';

const screenWidth = Dimensions.get('window').width;
const MyChabakjiInfo = ({navigation}) => {
  const {userInfo, chabak_ID, getUserInfo} = useContext(UserContext);
  const [address, setAddress] = useState(); //위치
  const [description, setDescription] = useState(''); //설명
  const [videoLink, setVideoLink] = useState(''); //영상링크
  const [image, setImage] = useState(); //사진
  const [facilities, setFacilities] = useState('');
  const [campsite_id, setCampsite_id] = useState('');

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
        setVideoLink(json.data.videoLink);
        setDescription(json.data.explanation);
        setFacilities(json.data.facilities);
        setCampsite_id(json.data.campsite_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  useLayoutEffect(() => {
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
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('MyPage');
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView
        style={{
          marginTop: '5%',
          marginHorizontal: 20,
          width: screenWidth,
        }}>
        <View>
          <Image
            source={{uri: image}}
            style={{width: screenWidth, height: screenWidth}}
          />
          <View style={{paddingRight: 140}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 40,
                marginLeft: 30,
              }}>
              위치
            </Text>
            <Text style={styles.content}>{address}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 40,
                marginLeft: 30,
              }}>
              설명
            </Text>
            <Text style={styles.content}>{description}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 40,
                marginLeft: 30,
              }}>
              근처 편의시설
            </Text>
            <Text style={styles.content}>{facilities}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 40,
                marginLeft: 30,
              }}>
              관련 영상 링크
            </Text>
            <Text
              onPress={() => {
                if (videoLink !== '') {
                  if (videoLink.substr(0, 4) !== 'http')
                    Linking.openURL('https://' + videoLink);
                  else Linking.openURL(videoLink);
                }
              }}
              style={styles.videoLink}>
              {videoLink}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <TouchableOpacity
              style={styles.Delete}
              onPress={() => {
                Alert.alert('이 차박지를 삭제하시겠습니까?', '', [
                  {
                    text: '삭제',
                    onPress: () => {
                      fetch(
                        `http://3.38.85.251:8080/api/camping/delete/${campsite_id}`,
                        {
                          //서버로 아이디, 비번 보내서 일치하는지 확인
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                            token: userInfo.token,
                          },
                        },
                      )
                        .then(response => response.json())
                        .then(json => {
                          console.log(json);
                          if (json.msg === 'success') {
                            Alert.alert('차박지가 삭제되었습니다.');
                            navigation.navigate('MyChabakji');
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
              <Text style={{color: 'white', fontSize: 20}}>차박지 삭제</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    marginLeft: 30,
    width: screenWidth - 60,
  },
  videoLink: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    marginLeft: 30,
    width: screenWidth - 60,
    textDecorationLine: 'underline',
  },
  Delete: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e64f49',
    borderRadius: 8,
  },
});

export default MyChabakjiInfo;
