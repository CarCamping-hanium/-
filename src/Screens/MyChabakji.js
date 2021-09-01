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

const sort = ['최신순', '오래된순'];
const DATA = [
  {
    title: '차박지1',
    recommendcount: '5',
    starcount: '★★★★★',
  },
  {
    title: '차박지2',
    recommendcount: '1',
    starcount: '★★★★☆',
  },
  {
    title: '차박지3',
    recommendcount: '1',
    starcount: '★★★☆☆',
  },
];
const MyChabakji = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('MyPage');
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
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
          buttonTextStyle={{fontSize: 17}}
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
              navigation.navigate('MyChabakjiInfo');
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
          return `MyReview-${index}`;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Sort: {marginTop: 10, fontSize: 20},
});

export default MyChabakji;
