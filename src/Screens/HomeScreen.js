import React, {useState,useLayoutEffect, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
const [LocationList, setLocationList] = useState();
const [LocationLength, setLocationLength] = useState();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const {userInfo} = useContext(UserContext);
const HomeScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 25}}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image source={require('../Assets/Images/Menu.png')} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const getChabakLocation = () => {
    fetch('http://3.36.28.39:8080/api/camping/map', {
      method: 'GET',
      headers: {
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        setLocationList(json.data);
        setLocationLength(json.data.length);
        setMarker();
     
      })
      .catch(e => {
        console.log(e);
      });
      
  };
  useEffect(() => {
    getChabakLocation();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../Assets/Images/main_map.png')}
        style={{width: screenWidth, height: screenHeight}}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: screenWidth / 4,
          top: '20%',
          borderRadius: 8,
          backgroundColor: '#295eba',
        }}
        onPress={() => {
          navigation.navigate('Gyeonggi');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 5,
          }}>
          경기도
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: screenWidth / 3.6,
          top: '15%',
          borderRadius: 8,
          backgroundColor: '#295eba',
        }}
        onPress={() => {
          navigation.navigate('Gangwon');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 5,
          }}>
          강원도
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: screenWidth / 3.5,
          top: '40%',
          borderRadius: 8,
          backgroundColor: '#295eba',
        }}
        onPress={() => {
          navigation.navigate('Chungcheong');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 5,
          }}>
          충청도
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: screenWidth / 5,
          bottom: '50%',
          borderRadius: 8,
          backgroundColor: '#295eba',
        }}
        onPress={() => {
          navigation.navigate('Gyeongsang');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 5,
          }}>
          경상도
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: screenWidth / 4,
          bottom: '40%',
          borderRadius: 8,
          backgroundColor: '#295eba',
        }}
        onPress={() => {
          navigation.navigate('Jeolla');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 5,
          }}>
          전라도
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
