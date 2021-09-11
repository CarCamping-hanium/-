import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {UserContext} from '../Context/Context';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer,useFocusEffect} from '@react-navigation/native';

import Login from './Login';
import Signup from './Signup';
import ChabakjiEnrollment from './ChabakjiEnrollment';
import HomeScreen from './HomeScreen';
import MyPage from './MyPage';
import MyReview from './MyReview';
import MyChabakji from './MyChabakji';
import ModifyPassword from './ModifyPassword';
import ModifyNickname from './ModifyNickname';
import ChabakjiList from './ChabakjiList';
import ReviewBoard from './ReviewBoard';
import ReviewUpload from './ReviewUpload';
import ReviewInfo from './ReviewInfo';
import Gyeonggi from './ChabakjiLocation/Gyeonggi';
import Gangwon from './ChabakjiLocation/Gangwon';
import Chungcheong from './ChabakjiLocation/Chungcheong';
import Gyeongsang from './ChabakjiLocation/Gyeongsang';
import Jeolla from './ChabakjiLocation/Jeolla';
import ChabakjiInfo from './ChabakjiInfo';
import MyReviewInfo from './MyReviewInfo';
import MyChabakjiInfo from './MyChabakjiInfo';
import MyPointHistory from './MyPointHistory';
import PointRanking from './PointRanking';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenHeight = Dimensions.get('window').height;

const LoginNavigator = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: '회원가입'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreenNavigator = navigation => {
  const {area} = useContext(UserContext);
  const {chabak_name} = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '지역을 선택하세요',
        }}
      />
      <Stack.Screen
        name="Gyeonggi"
        component={Gyeonggi}
        options={{title: '경기도', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Gangwon"
        component={Gangwon}
        options={{title: '강원도', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Chungcheong"
        component={Chungcheong}
        options={{title: '충청도', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Gyeongsang"
        component={Gyeongsang}
        options={{title: '경상도', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Jeolla"
        component={Jeolla}
        options={{title: '전라도', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="ChabakjiList"
        component={ChabakjiList}
        options={{
          title: '선택된 지역  :  ' + area,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ChabakjiInfo"
        component={ChabakjiInfo}
        options={{
          title:  chabak_name,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ReviewBoard"
        component={ReviewBoard}
        options={{
          title: '리뷰 페이지',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ReviewUpload"
        component={ReviewUpload}
        options={{
          title: '리뷰 등록',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ReviewInfo"
        component={ReviewInfo}
        options={{
          title: '리뷰 정보',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ChabakjiEnrollmentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChabakjiEnrollment"
        component={ChabakjiEnrollment}
        options={{title: '차박지 등록'}}
      />
    </Stack.Navigator>
  );
};

const MyPageNavigator = navigation => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: '마이 페이지',
        }}
      />
      <Stack.Screen
        name="MyPointHistory"
        component={MyPointHistory}
        options={{
          title: '포인트 적립 내역',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PointRanking"
        component={PointRanking}
        options={{
          title: '포인트 랭킹',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MyReview"
        component={MyReview}
        options={{
          title: '내가 등록한 리뷰',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MyChabakji"
        component={MyChabakji}
        options={{
          title: '내가 등록한 차박지',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MyChabakjiInfo"
        component={MyChabakjiInfo}
        options={{
          title: '차박지 정보',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MyReviewInfo"
        component={MyReviewInfo}
        options={{
          title: '리뷰 정보',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ModifyNickname"
        component={ModifyNickname}
        options={{
          title: '닉네임 변경',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ModifyPassword"
        component={ModifyPassword}
        options={{
          title: '비밀번호 변경',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const {logout} = useContext(UserContext);
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={props => {
            return (
              <DrawerContentScrollView>
                <DrawerItemList {...props} />
                {/* <DrawerItem
                  label="로그아웃"
                  onPress={() => {
                    logout();
                  }}
                /> */}
                <View style={{marginTop: screenHeight / 1.5}}>
                  <TouchableOpacity
                    onPress={() => {
                      logout();
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          marginHorizontal: 16,
                          width: 24,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../Assets/Images/logout.png')}
                          style={{
                            width: 24,
                            height: 24,
                          }}></Image>
                      </View>
                      <Text style={{color: '#505050'}}>로그아웃</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen name="차박지 지도" component={HomeScreenNavigator} />
          <Drawer.Screen
            name="차박지 등록"
            component={ChabakjiEnrollmentNavigator}
          />
          <Drawer.Screen name="마이 페이지" component={MyPageNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  const {userInfo} = useContext(UserContext);
  console.log(userInfo);

  return userInfo ? <MainNavigator /> : <LoginNavigator />;
};
