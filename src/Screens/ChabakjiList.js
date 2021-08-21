import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const ChabakjiList = ({navigation}) => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Search}>
        <TextInput
          style={styles.textBox}
          placeholder="차박지명을 검색하세요."
          placeholderTextColor="#888888"
          autoCorrect={false}
          allowFontScaling={false}
          clearButtonMode={'while-editing'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={{color: 'white', fontSize: 18}}>검색</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.List}>
        <TouchableOpacity
          style={{backgroundColor: 'black'}}
          onPress={() => {
            navigation.navigate('차박지 정보');
          }}>
          <Text>ddd</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Search: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    borderWidth: 2,
    borderColor: '#295eba',
    width: screenWidth / 1.7,
    height: 40,
    paddingLeft: 5,
  },
  searchButton: {
    backgroundColor: '#295eba',
    height: 40,
    width: screenWidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  List: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChabakjiList;
