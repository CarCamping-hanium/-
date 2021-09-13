import {response} from 'express';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
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
import {UserContext} from '../Context/Context';

const sort = ['최신순', '오래된순', '평점 높은 순', '평점 낮은 순'];
const screenWidth = Dimensions.get('window').width;

const ChabakjiList = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [sorting, setSorting] = useState(''); //평점 높은 순이 디폴트
  const {userInfo, area} = useContext(UserContext);

  //검색어로 차박지명 검색하는 함수
  const searchingFunction = () => {
    if (searchText === '') getList();
    else {
      const searched_list = [];
      fetch(`http://3.38.85.251:8080/api/camping?name=${searchText}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userInfo.token,
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          for (let i = 0; i < json.data.length; i++) {
            searched_list.push({
              name: json.data[i].name,
              location: json.data[i].address,
              score: json.data[i].score,
            });
          }
          setList(searched_list);
          console.log(searched_list);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const getList = () => {
    const searched_list = [];
    fetch(`http://3.38.85.251:8080/api/camping/경기도/grade`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        console.log(json.data.length);
        for (let i = 0; i < json.data.length; i++) {
          searched_list.push({
            name: json.data[i].name,
            location: json.data[i].address,
            score: json.data[i].score,
          });
        }
        setList(searched_list);
        console.log(searched_list);
      })
      .catch(e => {
        console.log(e);
      });
  };

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

  useEffect(() => {
    getList();
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
          onChangeText={text => {
            setSearchText(text);
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            searchingFunction();
          }}>
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
          onSelect={(selectedItem, index) => {
            if (index === 0) setSorting('');
            //최신순
            else if (index === 1) setSorting('');
            //오래된순
            else if (index === 2) setSorting('');
            //평점 높은 순
            else if (index === 3) setSorting(''); //평점 낮은 순
          }}
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
          data={list}
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
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{marginLeft: 10, color: 'white'}}>
                  위치 : {item.location}
                </Text>
                <Text style={{position: 'absolute', right: 10, color: 'white'}}>
                  리뷰 평점 : {item.score}
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
