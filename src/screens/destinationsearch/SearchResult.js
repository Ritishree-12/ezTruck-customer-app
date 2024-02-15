

import React, { useState, useEffect } from 'react';
import { View, Dimensions, Pressable,StyleSheet } from 'react-native';
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
    <SafeAreaView style={{ display: 'flex', justifyContent: 'space-between' }}>
      <View View style={styles.header}>

  
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={[styles.menu, { top: 10, left: 10 }]}
      >
        <Ionicons name="menu" size={35} color="white" />

      </Pressable>
      </View>
      
      <View style={{ height: Dimensions.get('window').height - 400 }}>
        <RouteMap
          origin={pickupLocation || originPlace}
          destination={dropLocation || destinationPlace}
        // onSubmit={onSubmit}

        />
        {console.log("pickupLocation", pickupLocation || originPlace, dropLocation || destinationPlace)}

      </View>

      <View style={{ height: 400 }}>
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
    position: 'absolute',
    padding: 6,
    borderRadius: 40,
    backgroundColor: '#EE272E',
    zIndex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 10,
    // paddingBottom: 10,
  },
});

export default SearchResult;

