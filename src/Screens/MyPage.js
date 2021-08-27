import React, {useContext, useLayoutEffect} from 'react';
import {UserContext} from '../Context/Context';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPage = ({navigation}) => {
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginRight: 80, marginTop: 50, fontSize: 20}}>
          내 포인트 : 50
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginTop: 35,
            backgroundColor: '#295eba',
            padding: 20,
            borderRadius: 8,
          }}
          onPress={() => {
            navigation.navigate('MyReview');
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            내가 쓴 리뷰 확인
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../Assets/Images/mypage_background.png')}
        style={{width: screenWidth, height: screenWidth, marginTop: '15%'}}
      />
    </SafeAreaView>
  );
};

export default MyPage;
