import React, {
  useState,
  useLayoutEffect,
  useContext,
  useCallback,
  useRef,
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
import {UserContext} from '../Context/Context';
import {useFocusEffect} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const sort = ['별점 높은순', '별점 낮은순', '최신순', '오래된순'];
const ReviewBoard = ({navigation}) => {
  const [ReviewList, setReviewList] = useState();
  const {userInfo, chabak_name, chabak_ID} = useContext(UserContext);
  const [sorting, setSorting] = useState('gradeUp');
  const {mainColor, selectedReview_ID, selectedReview_name} =
    useContext(UserContext);
  const scrollRef = useRef();

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Sort: {marginTop: 10, fontSize: 20},
    ReviewUpload: {
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mainColor,
      borderRadius: 8,
    },
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     getReview();
  //   }, []),
  // );
  useEffect(() => {
    getReview();
  }, [sorting]);

  useLayoutEffect(() => {
    getReview();
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
            navigation.navigate('HomeScreen');
          }}>
          <Image
            style={{height: 30, width: 30, marginBottom: 10}}
            source={require('../Assets/Images/Home.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollToTop = () => {
    scrollRef.current.scrollToOffset({offset: 0, animated: true});
  };

  const getReview = () => {
    console.log(sorting);
    var url = `http://3.38.85.251:8080/api/campingReview/${chabak_ID}/${sorting}`;
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        setReviewList(json.data);
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 1,
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
          buttonTextStyle={{
            fontSize: 17,
          }}
          data={sort}
          defaultValue={'별점 높은순'}
          onSelect={(selectedItem, index) => {
            if (index === 0) {
              setSorting('gradeUp');
              scrollToTop();
            } else if (index === 1) {
              setSorting('gradeDown');
              scrollToTop();
            } else if (index === 2) {
              setSorting('latestUP');
              scrollToTop();
            } else if (index === 3) {
              setSorting('latestDOWN');
              scrollToTop();
            }
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <View style={{flex: 8}}>
        <FlatList
          ref={scrollRef}
          data={ReviewList}
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
                navigation.navigate('ReviewInfo');
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
                <Text
                  style={{
                    position: 'absolute',
                    right: 10,
                    marginLeft: 10,
                    fontSize: 15,
                    color: 'white',
                  }}>
                  작성자 : {item.writer}
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
            return `review-${index}`;
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          style={styles.ReviewUpload}
          onPress={() => {
            navigation.navigate('ReviewUpload');
          }}>
          <Text style={{color: 'white', fontSize: 20}}>리뷰 등록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewBoard;
