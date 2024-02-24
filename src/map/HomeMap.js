import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export default function App({ currentLocation, setCurrentLocation }) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch current location
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05, // Zoom level
          longitudeDelta: 0.05,
        });
        setCurrentLocation({ latitude, longitude });

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
        setError(error);
        console.log("Error fetching location:", error);
        // You can handle the error here, either by setting a default location or showing an error message
        // For now, let's set a default location
        setInitialRegion({
          latitude: 20.5937, // Default latitude for India
          longitude: 78.9629, // Default longitude for India
          latitudeDelta: 15,
          longitudeDelta: 15,
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          ref={mapRef}
          showsUserLocation={true}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}

// Create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});











// import React, { useEffect, useState, useRef } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// export default function App({currentLocation, setCurrentLocation}) {
//   const [initialRegion, setInitialRegion] = useState({
//     latitude: 20.5937, // Default latitude for India
//     longitude: 78.9629, // Default longitude for India
//     latitudeDelta: 15,
//     longitudeDelta: 15,
//   });
//   //const [currentLocation, setCurrentLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch current location
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setInitialRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.05, // Zoom level
//           longitudeDelta: 0.05,
//         });
//         setCurrentLocation({ latitude, longitude });

//         // Zoom in to the current location
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           });
//         }
//       },
//       (error) => {
//         setError(error);
//         console.log("Error fetching location:", error);
//       },
//       { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
//     );
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Render our MapView */}
//       <MapView style={styles.map} 
//       initialRegion={initialRegion} 
//       ref={mapRef}
//       showsUserLocation={true}
//       >
//         {/* Display Marker for Current Location */}
//         {currentLocation && (
//           <Marker
//             coordinate={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//             }}
//             title="You are here"
//             description="Your current location"
//           />
//         )}
//       </MapView>

//       {/* Display Error Message if Location Fetch Fails */}
//       {error && <Text>Error fetching location: {JSON.stringify(error)}</Text>}
//     </View>
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
