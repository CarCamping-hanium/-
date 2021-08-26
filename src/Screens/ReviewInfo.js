import React, {useLayoutEffect, useState} from 'react';
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
} from 'react-native';
import {Rating} from 'react-native-ratings';

const screenWidth = Dimensions.get('window').width;
const ChabakjiInfo = ({navigation}) => {
  const [image, setImage] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('홈화면');
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
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            제목
          </Text>
        </View>
        <View
          style={{
            borderColor: '#295eba',
          }}>
          <FlatList
            style={{height: 200, width: screenWidth}}
            horizontal={true}
            pagingEnabled={true}
            data={image}
            keyExtractor={(item, index) => {
              return `image-${index}`;
            }}
            renderItem={({item, index}) => (
              <View>
                <Image
                  source={{uri: image[index]}}
                  style={{width: screenWidth, height: 200}}
                />
              </View>
            )}
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
            <Text style={styles.content}>
              너무 좋았습니다. 볼거리 굉장히 많았어요. 차박 장소로 강추!!
            </Text>
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
          <TouchableOpacity style={styles.recommend}>
            <Text style={{color: 'white', fontSize: 18}}>추천</Text>
            <Image
              source={require('../Assets/Images/recommend.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommend}>
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
              navigation.navigate('리뷰 페이지');
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

export default ChabakjiInfo;
