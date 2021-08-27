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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyPointHistory');
        }}>
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 8,
            borderColor: '#295eba',
            padding: 10,
          }}>
          내 포인트 : 50
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 35,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#295eba',
            width: 130,
            height: 50,
            borderRadius: 8,
            marginHorizontal: 10,
          }}
          onPress={() => {
            // navigation.navigate('MyReview');
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            회원 정보 수정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#295eba',
            width: 130,
            height: 50,
            borderRadius: 8,
            marginHorizontal: 10,
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e64f49',
            width: 130,
            height: 50,
            borderRadius: 8,
          }}
          onPress={() => {}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;
