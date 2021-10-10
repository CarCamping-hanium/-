import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
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
const ReportedReviewInfo = ({navigation}) => {
  const {mainColor, userInfo, Review_ID} = useContext(UserContext);
  const [reviewInfo, setReviewInfo] = useState({});

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
  });

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
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const getInfo = () => {
    var url = `http://3.38.85.251:8080/api/campingReview/${Review_ID}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        setReviewInfo(json.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const resetReportCount = () => {
    Alert.alert('신고를 무효시키겠습니까?', '', [
      {
        text: '네',
        onPress: () => {
          var url = `http://3.38.85.251:8080/api/admin/campingReview/${Review_ID}`;
          fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              token: userInfo.token,
            },
          })
            .then(response => response.json())
            .then(json => {
              console.log(json);
              if (json.success === 'true') {
                Alert.alert('신고가 취소되었습니다.');
              } else Alert.alert(json.msg);
              navigation.navigate('ReportedReviewList');
            })
            .catch(e => {
              console.log(e);
            });
          navigation.navigate('ReportedReviewList');
        },
      },
      {
        text: '취소',
      },
    ]);
  };

  const deleteReview = () => {
    Alert.alert('이 리뷰를 삭제하시겠습니까?', '', [
      {
        text: '삭제',
        onPress: () => {
          fetch(
            `http://3.38.85.251:8080/api/admin/campingReview/${Review_ID}`,
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
          navigation.navigate('ReportedReviewList');
        },
      },
      {
        text: '취소',
      },
    ]);
  };

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
            borderColor: mainColor,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 50, width: 50, marginLeft: 10, borderRadius: 8}}
              source={
                reviewInfo.profile === null
                  ? require('../Assets/Images/empty_profile.png')
                  : {uri: reviewInfo.profile}
              }></Image>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 10,
                fontWeight: 'bold',
                justifyContent: 'center',
                fontSize: 20,
              }}>
              {reviewInfo.writer}
            </Text>
          </View>
          <Image
            source={{uri: reviewInfo.images}}
            style={{
              marginTop: 25,
              width: screenWidth,
              height: screenWidth,
            }}
          />
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
            }}>
            <Text style={styles.content}>{reviewInfo.contents}</Text>
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
              startingValue={reviewInfo.score}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              width: 120,
              height: 50,
              backgroundColor: mainColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 50,
            }}
            onPress={resetReportCount}>
            <Text style={{color: 'white', fontSize: 18}}>신고 무효</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              width: 120,
              height: 50,
              backgroundColor: '#e64f49',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 50,
            }}
            onPress={deleteReview}>
            <Text style={{color: 'white', fontSize: 18}}>리뷰 삭제</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportedReviewInfo;
