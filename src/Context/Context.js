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

  const login = (email, password) => {
    AsyncStorage.setItem('token', 'save your token').then(() => {
      setUserInfo({name: 'leejunsu', email: 'ijh1205@naver.com'});
    });
  };

  const getUserInfo = () => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value) {
          setUserInfo({
            name: 'leejunsu',
            email: 'ijh1205@naver.com',
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, login, getUserInfo, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
