import React, {useState, useLayoutEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const sort = ['추천순', '최신순', '오래된순'];
const DATA = [
  {
    title: '리뷰제목1',
    recommandcount: '5',
    starcount: '★★★★★',
  },
  {
    title: '리뷰제목2',
    recommandcount: '1',
    starcount: '★★★★☆',
  },
  {
    title: '리뷰제목3',
    recommandcount: '1',
    starcount: '★★★☆☆',
  },
];
const ReviewBoard = ({navigation}) => {
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      style={[styles.Item, backgroundColor]}
      onPress={() => {
        navigation.navigate('ReviewInfo');
      }}>
      <Text style={[styles.Title, textColor]}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.RecommendCount, textColor]}>
          추천수 : {item.recommandcount}
        </Text>
        <Text style={[styles.Starcount, textColor]}>
          별점 : {item.starcount}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#295eba';
    const color = item.id === selectedId ? 'white' : 'white';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
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
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.MainTitle}>(차박지이름)에 달린 리뷰</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={styles.Sort}>정렬 : </Text>
        <SelectDropdown
          buttonStyle={{
            width: 80,
            height: 50,
            backgroundColor: '#295eba',
            borderRadius: 8,
          }}
          buttonTextStyle={{
            fontSize: 17,
            color: 'white',
          }}
          data={sort}
          defaultValue={'추천순'}
          onSelect={(selectedItem, index) => {}}
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return `review-${index}`;
        }}
        extraData={selectedId}
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
  },
  Item: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  Title: {
    fontSize: 15,
  },
  RecommendCount: {
    fontSize: 12,
    textAlign: 'left',
  },
  Starcount: {
    fontSize: 12,
    textAlign: 'right',
  },
  MainTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
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
