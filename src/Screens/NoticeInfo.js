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
const NoticeInfo = ({navigation}) => {
  const {mainColor, userInfo, notice_ID} = useContext(UserContext);
  //const [noticeInfo, setNoticeInfo] = useState({});
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
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
  const getInfo = () => {
    var url = `http://3.38.85.251:8080/api/notice/${notice_ID}`;
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
        setWriter(json.data.writer);
        setTitle(json.data.title);
        setContent(json.data.content);
        setDate(json.data.date);
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
          marginTop: 20,
          width: screenWidth,
        }}>
        <View
          style={{
            borderColor: mainColor,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderBottomColor: '#aaaaaa',
            }}>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 20,
                justifyContent: 'center',
                fontSize: 20,
              }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 20,
                justifyContent: 'center',
                fontSize: 17,
                color: '#777777',
              }}>
              {date.substr(0, 4)}.{date.substr(5, 2)}.{date.substr(8, 2)}
            </Text>
            <Text
              style={{
                marginTop: 5,
                marginLeft: 20,
                justifyContent: 'center',
                fontSize: 17,
                color: '#777777',
              }}>
              {writer}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoticeInfo;
