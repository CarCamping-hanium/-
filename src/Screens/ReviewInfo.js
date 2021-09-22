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
const ReviewInfo = ({navigation}) => {
  const {userInfo, Review_ID} = useContext(UserContext);
  const [image, setImage] = useState('');
  const [Description, setDescription] = useState('');
  const [Score, setScore] = useState();
  const[writer,setWriter]=useState('');
  const[profileImage,setProfileImage]=useState('');
  useLayoutEffect(() => {
    getInfo();
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
  const getInfo = () => {
    var url = 'http://3.38.85.251:8080/api/campingReview/' + Review_ID;
    fetch(url, {
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
        setWriter(json.data.writer);

setProfileImage(json.data.profile);
 
        console.log(profileImage);
        console.log(json.data);
      })
      .catch(e => {
        console.log(e);
      });
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
            borderColor: '#295eba',
            marginTop: 30,
          }}>
          <View style={{    flexDirection: 'row',}}>
          <Image style={{height:50,width:50,marginLeft:30,}}
  source={
   profileImage=== null
      ? require('../Assets/Images/empty_profile.png')
      : {uri: profileImage}
  }
>
</Image>
<Text style={{
  marginTop:10,
  marginLeft:10,
fontWeight:'bold',
justifyContent:'center',
fontSize:15,
}}>{writer}</Text>
              </View> 
                <Image
                  source={{uri: image}}
                  style={{
                    marginTop:25,width: screenWidth,   width: screenWidth,
                    height: screenWidth,}}
                />
              </View>
         
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
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
            <Text style={styles.content}>{Description}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '10%',
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
              startingValue={Score}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 80,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            해당 리뷰가 도움이 되었다면?
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.recommend}
            onPress={() => {
              var url =
                'http://3.38.85.251:8080/api/review/' + Review_ID + '/up';
              fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token: userInfo.token,
                },
              })
                .then(response => response.json())
                .then(json => {
                  if (json.success === false) {
                    Alert.alert(json.msg);
                  } else {
                    Alert.alert('해당 리뷰를 추천하였습니다.');
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            }}>
            <Text style={{color: 'white', fontSize: 18}}>추천</Text>
            <Image
              source={require('../Assets/Images/recommend.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recommend}
            onPress={() => {
              var url =
                'http://3.38.85.251:8080/api/review/' + Review_ID + '/down';
              fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token: userInfo.token,
                },
              })
                .then(response => response.json())
                .then(json => {
                  if (json.success === false) {
                    Alert.alert(json.msg);
                  } else {
                    Alert.alert('해당 리뷰를 비추천하였습니다.');
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            }}>
            <Text style={{color: 'white', fontSize: 18}}>비추천</Text>
            <Image
              source={require('../Assets/Images/unrecommend.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.toReviewList}
            onPress={() => {
              navigation.navigate('ReviewBoard');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>리뷰 목록으로</Text>
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
  toReviewList: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#295eba',
    borderRadius: 8,
  },
});

export default ReviewInfo;
