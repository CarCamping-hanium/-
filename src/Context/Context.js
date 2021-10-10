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
  const [chabak_ID, setChabak_ID] = useState('');
  const [chabak_name, setChabak_name] = useState('');
  const [Review_ID, setReview_ID] = useState('');
  const [review_name, setReview_name] = useState('');
  const [notice_ID, setNotice_ID] = useState('');
  const [notice_name, setNotice_name] = useState('');
  const [waiting_id, setWaiting_id] = useState('');
  const [waiting_name, setWaiting_name] = useState('');
  const mainColor = '#518AF0';

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
      fetch('http://3.38.85.251:8080/api/signIn', {
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
                fetch('http://3.38.85.251:8080/api/myInfo', {
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
                      profile: json.data.profile,
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
      fetch('http://3.38.85.251:8080/api/myInfo', {
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
            profile: json.data.profile,
          });
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const logout = () => {
    fetch('http://3.38.85.251:8080/api/logout', {
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
  const selectedChabak_ID = data => {
    setChabak_ID(data);
  };
  const selectedChabak_name = data => {
    setChabak_name(data);
  };
  const selectedReview_ID = data => {
    setReview_ID(data);
  };
  const selectedReview_name = data => {
    setReview_name(data);
  };
  const selectedWaiting_id = data => {
    setWaiting_id(data);
  };
  const selectedWaiting_name = data => {
    setWaiting_name(data);
  };
  const selectedNotice_id = data => {
    setNotice_ID(data);
  };
  const selectedNotice_name = data => {
    setNotice_name(data);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        mainColor,
        userInfo,
        setUserInfo,
        area,
        login,
        getUserInfo,
        logout,
        selectedArea,
        deleteMember,
        selectedChabak_ID,
        chabak_ID,
        selectedChabak_name,
        chabak_name,
        selectedReview_ID,
        Review_ID,
        selectedReview_name,
        review_name,
        waiting_id,
        selectedWaiting_id,
        waiting_name,
        selectedWaiting_name,
        notice_ID,
        notice_name,
        selectedNotice_id,
        selectedNotice_name,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
