import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
  useEffect,
} from 'react';
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
import {useFocusEffect} from '@react-navigation/core';
import {UserContext} from '../Context/Context';

const screenWidth = Dimensions.get('window').width;
const sort = ['최신순', '오래된순', '별점 높은순', '별점 낮은순'];
const MyReview = ({navigation}) => {
  const [list, setList] = useState([]);
  const [sorting, setSorting] = useState('myReviewDesc');
  const {mainColor, userInfo, selectedReview_ID, selectedReview_name} =
    useContext(UserContext);

  const getMyReview = () => {
    fetch(`http://3.38.85.251:8080/api/${sorting}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
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
  };

  useFocusEffect(
    useCallback(() => {
      getMyReview();
    }, []),
  );

  useEffect(() => {
    getMyReview();
  }, [sorting]);
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
            borderColor: mainColor,
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: 'white',
          }}
          buttonTextStyle={{fontSize: 17}}
          data={sort}
          defaultValue={'최신순'}
          onSelect={(selectedItem, index) => {
            if (index === 0) setSorting('myReviewDesc');
            if (index === 1) setSorting('myReview');
            if (index === 2) setSorting('myReviewScoreDesc');
            if (index === 3) setSorting('myReviewScore');
          }}
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
        data={list}
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
              selectedReview_ID(item.review_id);
              selectedReview_name(item.title);
              navigation.navigate('MyReviewInfo');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {item.title}
              </Text>
              <Text style={{position: 'absolute', right: 10, color: 'white'}}>
                {item.date.substr(0, 10)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
              }}>
              <Text style={{marginLeft: 10, color: 'white'}}>
                추천 수 : {item.recommend}
              </Text>
              <Text style={{position: 'absolute', right: 10, color: 'white'}}>
                별점 : {item.score}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Sort: {marginTop: 10, fontSize: 20},
});

export default MyReview;
