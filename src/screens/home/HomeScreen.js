
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeMap from "../../map/HomeMap";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"; // Assuming TouchableOpacity is imported from 'react-native-gesture-handler'
// import Menu from "./Menu";
import { clearBookingNotification, clearDriverArrivedNotification, clearDropOff } from "../../utils/notificationReducer";
import { useDispatch } from "react-redux";
const HomeScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goToSearch = () => {
    navigation.navigate("DestinationSearch", { currentLocation });
  };
  const route = useRoute();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [recentLocations, setRecentLocations] = useState([
    "Recent Location 1",
    "Recent Location 2",
    "Recent Location 3",
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          style={[styles.menu, { top: 10, left: 10 }]}
        >
          <Ionicons name="menu" size={35} color="white" />

        </Pressable>
      </View>
      <View style={{ height: Dimensions.get("window").height - 250 }}>
        <HomeMap currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.locationContainer}>
          <Text style={{ color: "#EE272E", fontWeight: 600, fontSize: 18, padding: 10 }}>Where are you going today?</Text>
          <Pressable style={styles.inputBox} onPress={goToSearch}>
            <Icon name="location-crosshairs" size={16} color="green" />
            <Text style={styles.inputText}>PickUp Location</Text>

          </Pressable>
          <Pressable style={styles.inputBox} onPress={goToSearch}>
            <Icon name="location-dot" size={16} color="#EE272E" />
            <Text style={styles.inputText}>Drop Location</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.recentLocationsContainer}>
          {recentLocations.map((location, index) => (
            <Pressable
              key={index}
              style={{
                padding: 10,
                margin: 0,
              }}
              onPress={() => setDropLocation(location)}
            >
              <Text style={{ color: "gray", fontWeight: "bold" }}>{location}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          // onPress={onSubmit}
          style={{
            backgroundColor: "#EE272E",
            borderColor: "#EE272E",
            borderRadius: 40,
            padding: 14,
            margin: 10,
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, }}>
            Choose Vehicle
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: '48%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,

    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputBox: {
    backgroundColor: '#EDEDED',
    margin: 4,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'flex-start',
    borderColor: '#EDEDED', // Set border color
    borderWidth: 1,
  },
  inputText: {
    color: 'gray',
    fontSize: 18,
    marginLeft: 10,
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'column', // Change to column
  },
  recentLocationsContainer: {
    margin: 10,
  },
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default HomeScreen;