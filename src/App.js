import React from 'react';
import {Button, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Navigator from './Screens/Navigator';
import {UserContextProvider} from './Context/Context';
const App = () => {
  return (
    <UserContextProvider>
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
