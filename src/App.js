import React, {useEffect} from 'react';
import {Button, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Navigator from './Screens/Navigator';
import {UserContextProvider} from './Context/Context';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  return (
    <UserContextProvider>
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
