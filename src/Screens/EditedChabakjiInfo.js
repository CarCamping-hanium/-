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
const EditedChabakjiInfo = ({navigation}) => {
  const {mainColor, userInfo, waiting_id} = useContext(UserContext);
  const [explanation, setExplanation] = useState(''); //설명
  const [facilities, setFacilities] = useState('');
  const [images, setImages] = useState(''); //사진
  const [videoLink, setVideoLink] = useState(''); //영상링크
  const [address, setAddress] = useState(); //위치

  const approval = () => {
    fetch(`http://3.38.85.251:8080/api/change/campsite/${waiting_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success === true) {
          Alert.alert('승인이 완료되었습니다.');
          navigation.navigate('CheckEditedChabakji');
        } else {
          Alert.alert(json.msg);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const disapproval = () => {
    fetch(`http://3.38.85.251:8080/api/change/campsite/${waiting_id}`, {
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
          Alert.alert('승인을 거절했습니다.');
          navigation.navigate('CheckEditedChabakji');
        } else {
          Alert.alert(json.msg);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getInfo = () => {
    fetch(`http://3.38.85.251:8080/api/change/campsite/${waiting_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setAddress(json.data.address);
        setExplanation(json.data.explanation);
        setFacilities(json.data.facilities);
        setImages(json.data.images);
        setVideoLink(json.data.videoLink);
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
            source={{uri: images}}
            style={{width: screenWidth, height: screenWidth}}
          />
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
            <Text style={styles.content}>{address}</Text>
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
            <Text style={styles.content}>{explanation}</Text>
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
            <Text style={styles.content}>{facilities}</Text>
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
              flexDirection: 'row',
              marginTop: 40,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 8,
                width: 120,
                height: 50,
                backgroundColor: mainColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 50,
              }}
              onPress={approval}>
              <Text style={{color: 'white', fontSize: 18}}>승인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 8,
                width: 120,
                height: 50,
                backgroundColor: mainColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 50,
              }}
              onPress={disapproval}>
              <Text style={{color: 'white', fontSize: 18}}>거절</Text>
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

export default EditedChabakjiInfo;
