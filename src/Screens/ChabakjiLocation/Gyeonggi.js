import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';

const Gyeonggi = ({navigation}) => {
  const P0 = {latitude: 37.51463434907, longitude: 127.0282805886601};
  const P1 = {latitude: 30.565051, longitude: 126.978567};
  const P2 = {latitude: 30.565383, longitude: 126.976292};
  return (
    <SafeAreaView>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        //showsMyLocationButton={true}
        center={{...P0, zoom: 7}}
        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker
          coordinate={P0}
          pinColor="black"
          onClick={() => console.warn('onClick! p0')}
        />
        <Marker
          coordinate={P1}
          pinColor="black"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="black"
          onClick={() => console.warn('onClick! p2')}
        />
        {/* <Path
        coordinates={[P0, P1]}
        onClick={() => console.warn('onClick! path')}
        width={10}
      />
      <Polyline
        coordinates={[P1, P2]}
        onClick={() => console.warn('onClick! polyline')}
      />
      <Circle
        coordinate={P0}
        color={'rgba(255,0,0,0.3)'}
        radius={200}
        onClick={() => console.warn('onClick! circle')}
      />
      <Polygon
        coordinates={[P0, P1, P2]}
        color={`rgba(0, 0, 0, 0.5)`}
        onClick={() => console.warn('onClick! polygon')}
      /> */}
      </NaverMapView>
      <TouchableOpacity
        style={styles.openList}
        onPress={() => {
          navigation.navigate('차박지 리스트');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          리스트 열기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  openList: {
    position: 'absolute',
    left: '30%',
    bottom: '8%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#4fe36f',
    backgroundColor: '#295eba',
    width: '40%',
    height: '7%',
    borderRadius: 30,
  },
});
export default Gyeonggi;
