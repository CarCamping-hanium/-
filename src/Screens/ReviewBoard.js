import React, {useState, useLayoutEffect, useContext} from 'react';
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
const screenWidth = Dimensions.get('window').width;
const sort = ['별점순', '최신순', '오래된순'];
const ReviewBoard = ({navigation}) => {
  const [ReviewList, setReviewList] = useState();
  const {userInfo, chabak_name, chabak_ID} = useContext(UserContext);
  const [Sorting, setSorting] = useState('gradeUp');
  const {selectedReview_ID} = useContext(UserContext);
  useLayoutEffect(() => {
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
    getReview();
  }, [Sorting]);
  const getReview = () => {
    console.log(Sorting);
    var url =
      'http://3.38.85.251:8080/api/campingReview/' + chabak_ID + '/' + Sorting;
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
        }}>
        <Text style={styles.Sort}>정렬 : </Text>
        <SelectDropdown
          buttonStyle={{
            width: 130,
            height: 50,
            borderColor: '#295eba',
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: 'white',
          }}
          buttonTextStyle={{
            fontSize: 17,
          }}
          data={sort}
          defaultValue={'별점순'}
          onSelect={(selectedItem, index) => {
            if (index === 0) setSorting('gradeUp');
            else if (index === 1) setSorting('latestUP');
            else if (index === 2) setSorting('latestDOWN');
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
        data={ReviewList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              width: screenWidth / 1.1,
              height: 70,
              backgroundColor: '#295eba',
              marginBottom: 10,
              borderRadius: 12,
              justifyContent: 'center',
            }}
            onPress={() => {
              selectedReview_ID(item.review_id);
              navigation.navigate('ReviewInfo');
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

      <View
        style={{justifyContent: 'center', alignItems: 'center', bottom: 40}}>
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
    backgroundColor: '#295eba',
    borderRadius: 8,
  },
});

export default ReviewBoard;
