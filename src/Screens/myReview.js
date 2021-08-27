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

const sort = ['추천순', '최신순'];
const DATA = [
  {
    title: '리뷰제목1',
    recommendcount: '5',
    starcount: '★★★★★',
  },
  {
    title: '리뷰제목2',
    recommendcount: '1',
    starcount: '★★★★☆',
  },
  {
    title: '리뷰제목3',
    recommendcount: '1',
    starcount: '★★★☆☆',
  },
];
const myReview = ({navigation}) => {
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      style={[styles.Item, backgroundColor]}
      onPress={() => {
        navigation.navigate('MyReviewInfo');
      }}>
      <Text style={[styles.Title, textColor]}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.RecommendCount, textColor]}>
          추천수 : {item.recommendcount}
        </Text>
        <Text style={[styles.StarCount, textColor]}>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.Sort}>정렬 : </Text>
        <SelectDropdown
          buttonStyle={{
            width: 80,
            height: 50,
            backgroundColor: '#295eba',
            borderRadius: 8,
          }}
          buttonTextStyle={{fontSize: 17, color: 'white'}}
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
          return `myReview-${index}`;
        }}
        extraData={selectedId}
      />
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
  StarCount: {
    fontSize: 12,
    textAlign: 'right',
  },
  Sort: {marginTop: 10, fontSize: 20},
});

export default myReview;
