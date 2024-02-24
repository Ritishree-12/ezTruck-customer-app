

import React, { useState, useEffect } from 'react';
import { View, Dimensions, Pressable, StyleSheet, Text, TextInput, Image } from 'react-native';
import RouteMap from "../../map/Routemap";
import TruckTypes from '../trucktypes/TruckTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';

const SearchResult = ({ route, navigation }) => {
  //const typeState = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  // const route = useRoute();

  console.log(route.params, 'details');
  // const { originPlace, destinationPlace } = route.params;
  const { originPlace, destinationPlace, distance, duration, driverDetails } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>


      <View style={{ flex: 0.6 }}>
        <RouteMap
          origin={pickupLocation || originPlace}
          destination={dropLocation || destinationPlace}
        // onSubmit={onSubmit}

        />
        {console.log("pickupLocation", pickupLocation || originPlace, dropLocation || destinationPlace)}
        <View View style={styles.header}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={styles.menu}
          >
            <Ionicons name="menu" size={30} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.locationSearch} >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/ellipse1.png')}/>
            <TextInput placeholder='pickup location' style={{ color: 'black', left: 10,width:250 , }} value={pickupLocation || originPlace.data.description} onChangeText={text => setPickupLocation(text)} />
            <Image source={require('../../../assets/frame2.png')} />
          </View>
          <View style={styles.dashedLine1}></View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/ellipse2.png')} />
            <TextInput placeholder='drop location' style={{ color: 'black', left: 10,width:250}} value={dropLocation || destinationPlace.data.description} onChangeText={text => setDropLocation(text)}  />
            <Image source={require('../../../assets/Frame.png')} />
          </View>

        </View>
      </View>

      <View style={{ flex: 0.6 }}>
        <TruckTypes
          //typeState={typeState}
          distance={distance}
          duration={duration}
          origin={pickupLocation || originPlace}
          destination={dropLocation || destinationPlace}
          driverDetails={driverDetails}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menu: {
    borderRadius: 40,
    backgroundColor: '#EE272E',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'absolute',
    right: 10,
    left: 10,
    top: 10,
  },
  locationSearch: {
    left: 20,
    top: 60,
    right: 20,
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#EDEDED',
    height: 80,
    flex: 1, padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashedLine1: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    borderStyle: 'solid',
    // marginVertical: 10,
    width: '100%', // Adjust the width as needed
},
});

export default SearchResult;

