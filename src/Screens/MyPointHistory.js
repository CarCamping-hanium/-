import React, {useLayoutEffect, useState, useCallback, useContext} from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';
import {useFocusEffect} from '@react-navigation/core';
import {UserContext} from '../Context/Context';

const sort = ['최신순', '오래된순'];
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPointHistory = ({navigation}) => {
  const {userInfo} = useContext(UserContext);
  const [pointInfo, setPointInfo] = useState([]);
  const getPointHistory = () => {
    fetch(`http://3.38.85.251:8080/api/point`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let list = [];
        for (let i = 0; i < json.data.length; i++) {
          list.push({
            contents: json.data[i].contents,
            date: json.data[i].date.substr(0, 10),
            time: json.data[i].date.substr(11, 5),
            score: json.data[i].score,
            scoreSum: json.data[i].scoresum,
          });
        }
        console.log(list);
        setPointInfo(list);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getPointHistory();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('PointRanking');
          }}>
          <Image
            style={{height: 25, width: 25}}
            source={require('../Assets/Images/crown.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const data = [
    {
      date: '2021-08-28',
      time: '02:40',
      path: '리뷰 등록',
      point: 25,
    },
    {
      date: '2021-08-25',
      time: '12:40',
      path: '차박지 등록',
      point: 20,
    },
    {
      date: '2021-08-18',
      time: '16:40',
      path: '리뷰 등록',
      point: 15,
    },
    {
      date: '2021-07-28',
      time: '23:40',
      path: '추천',
      point: 10,
    },
    {
      date: '2021-06-28',
      time: '02:40',
      path: '리뷰 등록',
      point: 5,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <SelectDropdown
        buttonStyle={{
          width: 130,
          height: 50,
          marginTop: 20,
          backgroundColor: '#295eba',
          borderRadius: 8,
        }}
        buttonTextStyle={{fontSize: 17, color: 'white'}}
        data={sort}
        defaultValue={'최신순'}
        onSelect={(selectedItem, index) => {}}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <FlatList
        data={pointInfo}
        keyExtractor={(item, index) => {
          return `pointHistory-${index}`;
        }}
        renderItem={({item, index}) => (
          <View
            style={{
              width: screenWidth / 1.2,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              borderRadius: 8,
              borderColor: '#295eba',
              borderWidth: 2,
            }}>
            <Text>
              {item.date} · {item.time} · {item.contents} · {item.score}점
            </Text>
            <Text style={{fontSize: 18}}>누적 포인트 : {item.scoreSum}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MyPointHistory;
