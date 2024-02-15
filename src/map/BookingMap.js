// import React, { useEffect, useState, useRef } from "react";
// import { StyleSheet } from "react-native";
// import database from '@react-native-firebase/database';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyCqM7uF9c0ZMQjdssHqSMJJ3mBcmz5RNS0';

// export default function BookingMap({origin, destination}) {
//   const [initialRegion, setInitialRegion] = useState({
//     latitude: 20.5937, // Default latitude for India
//     longitude: 78.9629, // Default longitude for India
//     latitudeDelta: 15,
//     longitudeDelta: 15,
//   });
//   const [driverLocation, setDriverLocation] = useState({latitude:0, longitude:0});
//   const [customerLocation, setCustomerLocation] = useState({latitude:origin.details.geometry.location.lat, longitude:origin.details.geometry.location.lng});
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Replace 'DRIVER_ID' with the actual driver's ID
//     const driverId = '659e3980fea5837f56c2ca28';

//     // Subscribe to the driver's location in Firebase Realtime Database
//     const driverLocationRef = database().ref(`drivers/${driverId}`);
//     const onDriverLocationChange = (snapshot) => {
//       const location = snapshot.val();
//       if (location) {
//         setDriverLocation({latitude: location.lat, longitude: location.lng});
//       }
//     };

//     driverLocationRef.on('value', onDriverLocationChange);

//     // Set the initial region to the driver's last known location
//     driverLocationRef.once('value').then((snapshot) => {
//       const location = snapshot.val();
//       if (location) {
//         setInitialRegion({
//           latitude: location.lat,
//           longitude: location.lng,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         });
//       }
//     });


//        // Fit the map to include both origin and destination markers
//     if (mapRef.current) {
//         mapRef.current.fitToCoordinates(
//           [customerLocation, driverLocation],
//           {
//             edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//             animated: true,
//           }
//         );
//       }

      

//     // Cleanup subscription on component unmount
//     return () => {
//       driverLocationRef.off('value', onDriverLocationChange);
//     };
//   }, [driverLocation.latitude, driverLocation.longitude]);

//   return (
//     <MapView
//     ref={mapRef}
//     style={{ width: '100%', height: '100%' }}
//     provider={PROVIDER_GOOGLE}
//     // showsUserLocation={true}
//     initialRegion={{
//         latitude: driverLocation.latitude,
//         longitude: driverLocation.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//     }}>
//     <MapViewDirections
//       origin={driverLocation}
//       destination={customerLocation}
//       apikey={GOOGLE_MAPS_APIKEY}
//       strokeWidth={3}
//       strokeColor="black"
//     />
//     <Marker
//       coordinate={{
//         latitude: driverLocation.latitude,
//         longitude: driverLocation.longitude,
//       }}
//       title={'Origin'}
//       // image={require('../../assets/3wheels.png')}
//     />

//     <Marker
//       coordinate={{
//         latitude: customerLocation.latitude,
//         longitude: customerLocation.longitude,
//       }}
//       title={'Destination'}
//     />
//   </MapView>
//   );
// }


// // Create our styling code:
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });


import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation

const BookingMap = ({driverLocation,pickupLocation, destinationLocation}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCqM7uF9c0ZMQjdssHqSMJJ3mBcmz5RNS0';
  //   const [driverLocation, setDriverLocation] = useState({latitude:0, longitude:0});

  const [locationPoints, setlocationPoints] = useState({
    pickupCords: {
      latitude: driverLocation?.latitude || 30.7046,
      longitude: driverLocation?.longitude || 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: pickupLocation?.latitude || destinationLocation?.latitude || 30.7333,
      longitude: pickupLocation?.longitude || destinationLocation?.longitude || 76.7794,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const mapRef = useRef();
  const { pickupCords, droplocationCords } = locationPoints;

  const origin = pickupCords;
  const destination = droplocationCords;

  useEffect(() => {
    // Fetch current location
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update state with current location
        setlocationPoints((prevPoints) => ({
          ...prevPoints,
          pickupCords: {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
        }));

        // Zoom in to the current location
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      },
      (error) => {
        console.log("Error fetching location:", error);
      },
      { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 }
    );
  }, []);

  const onUserLocationChange=(event)=>{
    console.log(event,"userLocationChange")
// setMyPosition(event.nativeEvent)
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        userLocationAnnotationTitle="My Location" 
        showsMyLocationButton={false}
        onUserLocationChange={onUserLocationChange}
        initialRegion={pickupCords}>
          <Marker
          coordinate={pickupCords}
          title="Driver"
          description="Driver's current location"
          pinColor="blue"
        />
        <Marker
          coordinate={droplocationCords}
          title="Customer"
          description="Destination location"
          pinColor="red"
          ></Marker>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      </MapView>
    </View>
  );
};

export default BookingMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
