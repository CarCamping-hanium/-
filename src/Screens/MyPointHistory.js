import React, {useLayoutEffect, useState} from 'react';
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

const sort = ['최신순', '오래된순'];
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MyPointHistory = ({navigation}) => {
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
        data={data}
        keyExtractor={(item, index) => {
          return `pointHistory-${index}`;
        }}
        renderItem={({item, index}) => (
          <View
            style={{
              width: screenWidth / 1.2,
              height: 60,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#295eba',
              marginTop: 10,
            }}>
            <Text style={{color: 'white'}}>
              {item.date} · {item.time} · {item.path} +5
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>
              누적 포인트 : {item.point}
            </Text>
          </View>
        )}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 160,
            height: 60,
            backgroundColor: '#295eba',
            borderRadius: 8,
          }}
          onPress={() => {
            navigation.navigate('PointRanking');
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
            👑 포인트 랭킹 👑
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyPointHistory;
