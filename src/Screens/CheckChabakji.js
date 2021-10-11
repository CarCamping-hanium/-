import React, {
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import {UserContext} from '../Context/Context';
import {useFocusEffect} from '@react-navigation/core';

const screenWidth = Dimensions.get('window').width;
const CheckChabakji = ({navigation}) => {
  const [list, setList] = useState([]);
  const {mainColor, selectedWaiting_id, selectedWaiting_name} =
    useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      fetch(`http://3.38.85.251:8080/api/waitingCampSite/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setList(json.data);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/back.png')}
          />
        </TouchableOpacity>
      ),
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      }}>
      <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>
        심사가 필요한 차박지 목록
      </Text>
      <FlatList
        style={{marginTop: 30}}
        data={list}
        keyExtractor={(item, index) => {
          return `WaitingList-${index}`;
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
              selectedWaiting_id(item.campsite_id);
              selectedWaiting_name(item.name);
              navigation.navigate('WaitingChabakjiInfo');
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
                위치 : {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default CheckChabakji;
