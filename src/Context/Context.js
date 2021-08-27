import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const login = (email_data, password_data) => {
    AsyncStorage.setItem('token', 'save your token').then(() => {
      setUserInfo({
        nickname: 'leejunsu',
        email: email_data,
        password: password_data,
      });
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
