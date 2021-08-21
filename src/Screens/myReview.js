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
const myReview = ({navigation}) => {
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      style={[styles.item, backgroundColor]}
      onPress={() => {
        navigation.navigate('리뷰 정보');
      }}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.recommandcount, textColor]}>
          추천수:{item.recommandcount}
        </Text>
        <Text style={[styles.starcount, textColor]}>별점:{item.starcount}</Text>
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintitle}>회원님이 작성하신 리뷰</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          //alignItems: 'center',
        }}>
        <Text style={styles.sort}>정렬:</Text>
        <SelectDropdown
          buttonStyle={{width: 100, height: 50, backgroundColor: 'white'}}
          buttonTextStyle={{fontSize: 17}}
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return `myReview-${index}`;
        }}
        ext
        raData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  recommandcount: {
    fontSize: 12,
    textAlign: 'left',
  },
  starcount: {
    fontSize: 12,
    textAlign: 'right',
  },
  maintitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  sort: {marginTop: 10, fontSize: 20},
  reviewUpload: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#295eba',
    borderRadius: 4,
  },
});

export default myReview;
