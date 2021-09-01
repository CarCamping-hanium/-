import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import Modal from '../../Components/Modal';
import {UserContext} from '../../Context/Context';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Chungcheong = ({navigation}) => {
  const {selectedArea} = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const P0 = {latitude: 36.9584, longitude: 127.2846};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  useEffect(() => {
    selectedArea('충청도');
  }, []);

  return (
    <SafeAreaView>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        //showsMyLocationButton={true}
        center={{...P0, zoom: 7}}
        //onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        //onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        //onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
      >
        <Marker
          coordinate={P0}
          pinColor="blue"
          onClick={() => {
            setVisible(true);
          }}
        />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="blue"
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
          navigation.navigate('ChabakjiList');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          리스트 열기
        </Text>
      </TouchableOpacity>
      <Modal visible={visible}>
        <View
          style={{
            height: 500,
            width: 330,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: '#295eba',
            borderWidth: 3,
            borderRadius: 10,
          }}>
          <View //차박지명 컴포넌트
            style={{
              marginTop: screenHeight / 30,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              (차박지명)
            </Text>
          </View>
          <View //사진 및 설명 컴포넌트
            style={{flex: 1, alignItems: 'flex-start'}}>
            <Image
              source={require('../../Assets/Images/car.png')}
              style={{
                width: 250,
                height: 200,
                marginTop: screenHeight / 50,
              }}
            />
            <Text style={styles.modalDescription}>위치</Text>
            <Text style={{marginTop: 3}}>(위치)</Text>
            <Text style={styles.modalDescription}>근처 편의시설</Text>
            <Text style={{marginTop: 3}}>(편의시설)</Text>
          </View>
          <View //버튼 컴포넌트
            style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.modalInfo}
              onPress={() => {
                navigation.navigate('ChabakjiInfo');
                setVisible(false);
              }}>
              <Text style={{color: 'white', fontSize: 20}}>상세 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={{color: 'white', fontSize: 20}}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#295eba',
    //backgroundColor: '#3770d4',
    width: '40%',
    height: 50,
    borderRadius: 30,
  },
  modalInfo: {
    backgroundColor: '#295eba',
    width: screenWidth / 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: screenHeight / 30,
  },
  modalClose: {
    backgroundColor: '#295eba',
    width: screenWidth / 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: screenHeight / 30,
    marginLeft: screenWidth / 15,
  },
  modalDescription: {
    fontSize: 18,
    marginTop: screenHeight / 50,
  },
});
export default Chungcheong;
