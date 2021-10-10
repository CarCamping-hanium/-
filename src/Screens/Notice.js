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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            <TouchableOpacity
              style={{
                width: screenWidth / 1.1,
                height: 70,
                backgroundColor: mainColor,
                marginBottom: 10,
                borderRadius: 12,
                justifyContent: 'center',
              }}
              onPress={() => {
                selectedNotice_id(item.id);
                selectedNotice_name(item.title);
                navigation.navigate('NoticeInfo');
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
                  {item.year}.{item.month}.{item.date}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notice;
