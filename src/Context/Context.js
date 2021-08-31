import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const defaultContext = {
  userInfo: {},
  login: (id_data, password_data) => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);
const UserContextProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [area, setArea] = useState('');

  const login = (id_data, password_data) => {
    // AsyncStorage.setItem('token', 'save your token').then(() => {
    //   setUserInfo({
    //     nickname: 'leejunsu',
    //     email: id_data,
    //     password: password_data,
    //   });
    // });
    if (id_data === '' || password_data === '') {
      Alert.alert('아이디 또는 비밀번호를 확인해주세요.');
    } else {
      fetch('http://3.36.28.39:8080/api/signIn', {
        //서버로 아이디, 비번 보내서 일치하는지 확인
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: id_data,
          password: password_data,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.msg === 'success') {
            //일치하면 로컬스토리지에 토큰 저장
            AsyncStorage.setItem('token', json.data).then(() => {
              AsyncStorage.getItem('token', (err, result) => {
                fetch('http://3.36.28.39:8080/api/myInfo', {
                  //토큰을 기반으로 유저정보 불러옴
                  method: 'GET',
                  headers: {
                    token: result,
                  },
                })
                  .then(response => response.json())
                  .then(json => {
                    AsyncStorage.setItem('userInfo', JSON.stringify(json));
                    setUserInfo({
                      id: json.data.loginId,
                      member_id: json.data.member_id,
                      nickname: json.data.nickname,
                      point: json.data.point,
                      token: result,
                    });
                  })
                  .catch(e => {
                    console.log(e);
                  });
              });
            });
          } else {
            Alert.alert(json.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const getUserInfo = () => {
    AsyncStorage.getItem('token', (err, result) => {
      fetch('http://3.36.28.39:8080/api/myInfo', {
        //토큰을 기반으로 유저정보 불러옴
        method: 'GET',
        headers: {
          token: result,
        },
      })
        .then(response => response.json())
        .then(json => {
          AsyncStorage.setItem('userInfo', JSON.stringify(json));
          setUserInfo({
            id: json.data.loginId,
            member_id: json.data.member_id,
            nickname: json.data.nickname,
            point: json.data.point,
            token: result,
          });
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const logout = () => {
    fetch('http://3.36.28.39:8080/api/logout', {
      //토큰을 기반으로 유저정보 불러옴
      method: 'GET',
      headers: {
        token: userInfo.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.msg === 'success') {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('userInfo');
          setUserInfo(undefined);
        } else {
          Alert.alert(json.msg);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteMember = () => {
    AsyncStorage.removeItem('token');
    setUserInfo(undefined);
  };

  const selectedArea = data => {
    setArea(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        area,
        login,
        getUserInfo,
        logout,
        selectedArea,
        deleteMember,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
