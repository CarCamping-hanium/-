import React, {useLayoutEffect, useState, useContext} from 'react';
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
} from 'react-native';
import {UserContext} from '../Context/Context';
const screenWidth = Dimensions.get('window').width;
const ChabakjiInfo = ({navigation}) => {
  const {mainColor, userInfo, chabak_ID} = useContext(UserContext);
  const [address, setAddress] = useState(); //위치
  const [description, setDescription] = useState(''); //설명
  const [videoLink, setVideoLink] = useState(''); //영상링크
  const [image, setImage] = useState(); //사진
  const [facilities, setFacilities] = useState('');
  const [registrant, setRegistrant] = useState('');

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
    reviewShow: {
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mainColor,
      borderRadius: 8,
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
        setVideoLink(json.data.videoLink);
        setDescription(json.data.explanation);
        setFacilities(json.data.facilities);
        setRegistrant(json.data.registrant);
      })
      .catch(e => {
        console.log(e);
      });
  };

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
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('HomeScreen');
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
        <Image
          source={{uri: image}}
          style={{
            width: screenWidth,
            height: screenWidth,
          }}
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
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '300',
              marginTop: 50,
            }}>
            {registrant}님께서 등록해주신 차박지입니다.
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={styles.reviewShow}
            onPress={() => {
              navigation.navigate('ReviewBoard');
            }}>
            <Text style={{color: 'white', fontSize: 20}}>리뷰 보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChabakjiInfo;
