import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  Linking,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Rating} from 'react-native-ratings';
import {UserContext} from '../Context/Context';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NoticeUpload = ({navigation}) => {
  const {mainColor, userInfo, chabak_ID} = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const styles = StyleSheet.create({
    name: {
      fontSize: 18,
      fontWeight: '500',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      width: '90%',
      height: 40,
      paddingLeft: 10,
      borderWidth: 2,
      borderColor: mainColor,
      borderRadius: 8,
    },
    Enroll: {
      borderRadius: 8,
      width: 100,
      height: 40,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Cancel: {
      borderRadius: 8,
      width: 100,
      height: 40,
      backgroundColor: mainColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 50,
    },
  });

  const upload = () => {
    if (title === '' || content === '') {
      Alert.alert('입력되지 않은 정보가 있습니다.');
    } else {
      Alert.alert('공지를 등록하시겠습니까?', '', [
        {
          text: '등록',
          onPress: () => {
            fetch(`http://3.38.85.251:8080/api/notice/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                token: userInfo.token,
              },
              body: JSON.stringify({content, title, writer: userInfo.nickname}),
            })
              .then(response => response.json())
              .then(json => {
                console.log(json);
                if (json.success === true) {
                  Alert.alert('공지가 등록되었습니다.');
                  navigation.navigate('Notice');
                } else Alert.alert(json.msg);
              });
          },
        },
        {
          text: '취소',
        },
      ]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TextInput
        style={styles.name}
        placeholder="공지사항 제목을 입력하세요."
        placeholderTextColor="#aaaaaa"
        multiline={true}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <ScrollView
        style={{
          marginTop: 30,
          width: screenWidth,
        }}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={{
              paddingLeft: 10,
              fontSize: 18,
              fontWeight: '500',
              width: '90%',
              height: screenHeight * 0.6,
              borderWidth: 2,
              borderColor: mainColor,
              borderRadius: 8,
            }}
            placeholder="공지사항 내용을 입력하세요."
            placeholderTextColor="#aaaaaa"
            multiline={true}
            onChangeText={text => {
              setContent(text);
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.Enroll}
          onPress={() => {
            upload();
          }}>
          <Text style={{color: 'white'}}>등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Cancel}
          onPress={() => {
            navigation.navigate('Notice');
          }}>
          <Text style={{color: 'white'}}>취소</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NoticeUpload;
