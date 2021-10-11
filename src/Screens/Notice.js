import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import {UserContext} from '../Context/Context';

const screenWidth = Dimensions.get('window').width;

const Notice = ({navigation}) => {
  const {userInfo, mainColor, selectedNotice_id, selectedNotice_name} =
    useContext(UserContext);
  const scrollRef = useRef();
  const [list, setList] = useState([]);

  const scrollToTop = () => {
    scrollRef.current.scrollToOffset({offset: 0, animated: true});
  };

  const isAdmin = () => {
    if (userInfo.id === 'admin') {
      return (
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: mainColor,
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate('NoticeUpload');
            }}>
            <Text style={{color: 'white', fontSize: 20}}>공지사항 작성</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const getNoticeList = () => {
    fetch(`http://3.38.85.251:8080/api/notice/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let data = [];
        for (let i = 0; i < json.data.length; i++) {
          data.push({
            id: json.data[i].id,
            title: json.data[i].title,
            year: json.data[i].date.substr(0, 4),
            month: json.data[i].date.substr(5, 2),
            date: json.data[i].date.substr(8, 2),
          });
        }
        setList(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useFocusEffect(
    useCallback(() => {
      scrollToTop();
      getNoticeList();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('MyPage');
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <FlatList
          ref={scrollRef}
          data={list}
          keyExtractor={(item, index) => {
            return `Notice-${index}`;
          }}
          renderItem={({item, index}) => (
            <View
              style={{
                alignItems: 'center',
                marginTop: 2,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  width: screenWidth,
                  height: 80,
                  paddingLeft: 30,
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
                onPress={() => {
                  selectedNotice_id(item.id);
                  selectedNotice_name(item.title);
                  navigation.navigate('NoticeInfo');
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={{fontSize: 18}}>{item.title}</Text>
                    <Text style={{marginTop: 5, color: '#777777'}}>
                      {item.year}.{item.month}.{item.date}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#aaaaaa',
                      position: 'absolute',
                      right: 20,
                      top: 10,
                    }}>
                    {'>'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        {isAdmin()}
      </View>
    </SafeAreaView>
  );
};

export default Notice;
