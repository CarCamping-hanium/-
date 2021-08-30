import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const defaultContext = {
  userInfo: {},
  login: (email, password) => {},
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
    fetch('http://3.36.28.39:8080/api/signIn', {
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
        Alert.alert(json.msg);
        // AsyncStorage.setItem('token', json.data).then(() => {
        //   setUserInfo({
        //     //nickname: //fetch를 통해서 멤버 정보를 가져오는 get API 필요
        //   });
        // });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getUserInfo = () => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value) {
          setUserInfo({
            nickname: 'leejunsu',
            email: 'ijh1205@naver.com',
            password: 'password',
          });
        }
      })
      .catch(() => {
        setUserInfo(undefined);
      });
  };

  const logout = () => {
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
      value={{userInfo, area, login, getUserInfo, logout, selectedArea}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
