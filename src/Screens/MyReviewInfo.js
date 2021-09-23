import {getIsDrawerOpenFromState} from '@react-navigation/drawer';
import React, {useLayoutEffect, useState, useContext} from 'react';
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
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {UserContext} from '../Context/Context';

const screenWidth = Dimensions.get('window').width;
const MyReviewInfo = ({navigation}) => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const [score, setScore] = useState();
  const {Review_ID, userInfo} = useContext(UserContext);

  const getInfo = () => {
    fetch(`http://3.38.85.251:8080/api/campingReview/${Review_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        setImage(json.data.images);
        setScore(json.data.score);
        setDescription(json.data.contents);
        console.log(json.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useLayoutEffect(() => {
    getInfo();
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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView
        style={{
          marginTop: '5%',
          marginHorizontal: 20,
          width: screenWidth,
        }}>
        <View
          style={{
            borderColor: '#295eba',
            marginTop: 30,
          }}>
          <View>
            <Image
              source={{uri: image}}
              style={{width: screenWidth, height: 200}}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 40,
              marginLeft: 30,
            }}>
            내용
          </Text>
          <View
            style={{
              alignItems: 'center',
              height: 300,
              justifyContent: 'center',
            }}>
            <Text style={styles.content}>{description}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 40,
              marginLeft: 30,
            }}>
            별점
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Rating
              ratingCount={5}
              imageSize={40}
              readonly={true}
              jumpValue={0.5}
              showRating={true}
              fractions={10}
              startingValue={score}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.deleteReview}
            onPress={() => {
              Alert.alert('이 리뷰를 삭제하시겠습니까?', '', [
                {
                  text: '삭제',
                  onPress: () => {
                    fetch(
                      `http://3.38.85.251:8080/api/campingReview/${Review_ID}`,
                      {
                        //서버로 아이디, 비번 보내서 일치하는지 확인
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          token: userInfo.token,
                        },
                      },
                    )
                      .then(response => response.json())
                      .then(json => {
                        console.log(json);
                        if (json.msg === 'success') {
                          Alert.alert('리뷰가 삭제되었습니다.');
                          navigation.navigate('MyReview');
                        } else {
                          Alert.alert(json.msg);
                        }
                      });
                    navigation.navigate('MyReview');
                  },
                },
                {
                  text: '취소',
                },
              ]);
            }}>
            <Text style={{color: 'white', fontSize: 18}}>리뷰 삭제</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    width: screenWidth - 60,
  },
  recommend: {
    width: 100,
    height: 45,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#295eba',
    borderRadius: 8,
    flexDirection: 'row',
  },
  deleteReview: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e64f49',
    borderRadius: 8,
  },
});

export default MyReviewInfo;
