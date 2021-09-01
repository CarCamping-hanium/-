import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const sort = ['최신순', '오래된순'];
const screenWidth = Dimensions.get('window').width;

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

const ChabakjiList = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Search}>
        <TextInput
          style={styles.textBox}
          placeholder="차박지명을 검색하세요."
          placeholderTextColor="#888888"
          autoCorrect={false}
          autoCapitalize="none"
          allowFontScaling={false}
          clearButtonMode={'while-editing'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={{color: 'white', fontSize: 18}}>검색</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
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
      <View style={styles.List}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => {
            return `ChabakjiList-${index}`;
          }}
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
                navigation.navigate('ChabakjiInfo');
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
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Search: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#295eba',
    width: '70%',
    height: 40,
    paddingLeft: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  searchButton: {
    backgroundColor: '#295eba',
    height: 40,
    width: screenWidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  List: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default ChabakjiList;
