import React, {useLayoutEffect, useState, useEffect} from 'react';
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

const screenWidth = Dimensions.get('window').width;

const PointRanking = ({navigation}) => {
  const [rankingList, setRankingList] = useState();
  const [listLength, setListLength] = useState();
  const [rankNumber, setRankNumber] = useState([]);

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

  useEffect(() => {
    fetch('http://3.36.28.39:8080/api/ranking', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setRankingList(json.data);
        setListLength(json.data.length);
        console.log(rankingList);
        console.log(listLength);
        rank_num_function();
        setRankNumber(list);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  let list = [1]; //처음 사람은 1위 고정
  let temp = 0; //공동 순위 동안 누적될 순위
  let rank_number = 1; //실제 표시될 순위

  //공동 순위 구현함수
  const rank_num_function = () => {
    //for문으로 리스트 전체 탐색하면서 이전 인덱스랑 점수가 같으면 순위 그대로 유지
    //다르면 누적된 만큼 +해서 순위 출력
    for (let i = 1; i < listLength; i++) {
      if (rankingList[i].score === rankingList[i - 1].score) {
        list.push(rank_number);
        temp += 1;
      } else {
        rank_number += 1 + tmp;
        list.push(rank_number);
        temp = 0;
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <FlatList
        data={rankingList}
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
              {rankNumber[index]}위 {item.nickname} · {item.score}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PointRanking;
