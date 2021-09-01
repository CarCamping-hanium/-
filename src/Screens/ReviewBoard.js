import React, {useState, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const screenWidth = Dimensions.get('window').width;
const sort = ['추천순', '최신순', '오래된순'];
const DATA = [
  {
    title: '리뷰제목1',
    recommendcount: '5',
    starcount: '★★★★★',
  },
  {
    title: '리뷰제목2',
    recommendcount: '1',
    starcount: '★★★★☆',
  },
  {
    title: '리뷰제목3',
    recommendcount: '1',
    starcount: '★★★☆☆',
  },
];
const ReviewBoard = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.MainTitle}>(차박지이름)에 달린 리뷰</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={styles.Sort}>정렬 : </Text>
        <SelectDropdown
          buttonStyle={{
            width: 130,
            height: 50,
            borderColor: '#295eba',
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: 'white',
          }}
          buttonTextStyle={{
            fontSize: 17,
          }}
          data={sort}
          defaultValue={'추천순'}
          onSelect={(selectedItem, index) => {}}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <FlatList
        style={{marginTop: 20}}
        data={DATA}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              width: screenWidth / 1.1,
              height: 70,
              backgroundColor: '#295eba',
              marginBottom: 10,
              borderRadius: 12,
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('ReviewInfo');
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
              }}>
              <Text style={{marginLeft: 10, color: 'white'}}>
                추천 수 : {item.recommendcount}
              </Text>
              <Text style={{position: 'absolute', right: 10, color: 'white'}}>
                별점 : {item.starcount}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return `review-${index}`;
        }}
      />

      <View
        style={{justifyContent: 'center', alignItems: 'center', bottom: 40}}>
        <TouchableOpacity
          style={styles.ReviewUpload}
          onPress={() => {
            navigation.navigate('ReviewUpload');
          }}>
          <Text style={{color: 'white', fontSize: 20}}>리뷰 등록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  Sort: {marginTop: 10, fontSize: 20},
  ReviewUpload: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#295eba',
    borderRadius: 8,
  },
});

export default ReviewBoard;
