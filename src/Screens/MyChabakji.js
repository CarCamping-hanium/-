import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
  useCallback,
  useRef,
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

const sort = ['최신순', '오래된순'];
const MyChabakji = ({navigation}) => {
  const [list, setList] = useState([]);
  const [sorting, setSorting] = useState('myCampSiteDesc');
  const {mainColor, userInfo, selectedChabak_ID, selectedChabak_name} =
    useContext(UserContext);
  const scrollRef = useRef();

  const getMyChabakjiInfo = () => {
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

  const scrollToTop = () => {
    scrollRef.current.scrollToOffset({offset: 0, animated: true});
  };

  useFocusEffect(
    useCallback(() => {
      getMyChabakjiInfo();
    }, []),
  );

  useEffect(() => {
    getMyChabakjiInfo();
  }, [sorting]);

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
            if (index === 0) {
              setSorting('myCampSiteDesc');
              scrollToTop();
            } else if (index === 1) {
              setSorting('myCampSite');
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

      <FlatList
        style={{marginTop: 20}}
        ref={scrollRef}
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
              selectedChabak_ID(item.campsite_id);
              selectedChabak_name(item.name);
              navigation.navigate('MyChabakjiInfo');
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
              <Text style={{position: 'absolute', right: 10, color: 'white'}}>
                리뷰 평점 :{' '}
                {item.score !== 0 ? item.score.toFixed(1) : item.score}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Sort: {marginTop: 10, fontSize: 20},
});

export default MyChabakji;
