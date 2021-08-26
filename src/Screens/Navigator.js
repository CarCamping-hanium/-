import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {UserContext} from '../Context/Context';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './Login';
import Signup from './Signup';
import ChabakjiEnrollment from './ChabakjiEnrollment';
import HomeScreen from './HomeScreen';
import MyPage from './MyPage';
import myReview from './myReview';
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoginNavigator = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="로그인" component={Login} />
        <Stack.Screen name="회원가입" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreenNavigator = navigation => {
  const {area} = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="홈화면"
        component={HomeScreen}
        options={{
          title: '지역을 선택하세요',
        }}
      />
      <Stack.Screen
        name="경기도"
        component={Gyeonggi}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="강원도"
        component={Gangwon}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="충청도"
        component={Chungcheong}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="경상도"
        component={Gyeongsang}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="전라도"
        component={Jeolla}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="차박지 리스트"
        component={ChabakjiList}
        options={{
          title: '선택된 지역  :  ' + area,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="차박지 정보"
        component={ChabakjiInfo}
        options={{title: '차박지명', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="리뷰 페이지"
        component={ReviewBoard}
        options={{
          title: '리뷰 페이지',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="리뷰 등록"
        component={ReviewUpload}
        options={{
          title: '리뷰 등록',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="리뷰 정보"
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
      <Stack.Screen name="차박지 등록" component={ChabakjiEnrollment} />
    </Stack.Navigator>
  );
};

const MyPageNavigator = navigation => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="개인 정보"
        component={MyPage}
        options={{
          title: '마이 페이지',
        }}
      />
      <Stack.Screen
        name="내 리뷰 페이지"
        component={myReview}
        options={{
          title: '내가 쓴 리뷰',
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
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="로그아웃"
                  onPress={() => {
                    logout();
                  }}
                />
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
