import React,{useState} from "react";
import { View, Text, Pressable,StyleSheet, SafeAreaView } from "react-native";
import TruckRow from './TruckRow';
import ItemComponent from "../home/ItemComponent";
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import axios  from "axios";

// import typesData from '../../data/type';

const TruckTypes = ({distance, duration, origin, destination, driverDetails}) => {
  const navigation = useNavigation(); 

  const mapTruckTypeToData = (truckType) => {
    switch (truckType) {
      case 'dalaauto':
        return {
          id: 'dalaauto',
          truck_type: 'dalaauto',
          imgDetails: "13.2ftx6.9ftx5.9ft",
          capacity: "600kg",
          // weitage: "Small Pickup",
          itemDetails:"This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
          image: require("../../../assets/choose2.png"),
        };
      case 'tataace':
        return {
          id: 'tataace',
          truck_type: 'tataace',
          imgDetails: "13.2ftx6.9ftx5.9ft",
          capacity: "1500kg",
          // weitage: "Small Pickup",
          itemDetails:"This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
          image: require("../../../assets/largeVehicle.png"),
        };
      case 'small_pickup': 
      return {
        id: "small_pickup",
            truck_type: "small_pickup",
            imgDetails: "13.2ftx6.9ftx5.9ft",
            capacity: "2500kg",
            // weitage: "Large Pickup",
            itemDetails:
              "This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
            image: require("../../../assets/largeVehicle.png"),
      };
      case 'large_pickup':
        return {
          id: "large_pickup",
          truck_type: "large_pickup",
          imgDetails: "13.2ftx6.9ftx5.9ft",
          capacity: "3500kg",
          // weitage: "Large Pickup",
          itemDetails:"This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
          image: require("../../../assets/largeVehicle.png"),
        };
      case 'eicher': 
      return {
        id: "eicher",
        truck_type: "eicher",
        imgDetails: "13.2ftx6.9ftx5.9ft",
        capacity: "4000kg",
        // weitage: "Large Pickup",
        itemDetails:"This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
        image: require("../../../assets/largeVehicle.png"),
      }
    }
  };
  
  // Create DATA array by mapping over driverDetails
  const DATA = Array.from(
    new Set(driverDetails.map((driver) => driver.truck_type))
  ).map((uniqueTruckType) => {
    const additionalProperties = mapTruckTypeToData(uniqueTruckType);
    return {
      ...driverDetails.find((driver) => driver.truck_type === uniqueTruckType),
      ...additionalProperties,
    };
  });
  

  const [selectedId, setSelectedId] = useState();
  const user = useSelector(state=>state.login?.user)
  const bearerToken = user?.authTokens
    
    console.log("bearerToken",bearerToken);

  const bookNow = async () => {
    const selectedTruck = DATA.find(item => item.id === selectedId);
    console.log("selectedTruck", selectedId);

    const bookingData = {
      pickup_location: origin?.data?.description,
      drop_location: destination?.data?.description,
      truck_type: selectedId,
      origin: origin,
      destination: destination,
}

  console.log("bookingData***************************************", bookingData);

  const url = 'http://13.200.75.208:4001/v1/book/booking';

  try {
    const response = await axios.post(
      
      url,
      bookingData,
    
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );

    // Handle the response here, if needed
    console.log('Booking successful***********************************************', response.data);
    navigation.navigate('Waiting', {origin:origin, destination:destination}); 
  } catch (error) {
    // Handle errors that occur during the request
    console.error("Unable to process your request:", error.message);
  }
};


const onSelectTruck =(item)=>{
  setSelectedId(item.id)
}

  const renderItem = ({ item }) => {
    // item me object hain from index o to n example pehli bar ek object jyega phir next till end
    const isSelected = item.id === selectedId;
    const backgroundColor = isSelected ? "#EE272E" : "transparent";
    const textColor = isSelected ? "white" : "#EE272E";

    return (
      <ItemComponent
        item={item}
        // onPress={() => setSelectedId( item.id)}
        onCardSelect={onSelectTruck}
        backgroundColor={backgroundColor}
        textColor={textColor}
        distance={distance} 
        duration={duration}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.text1}>Choose a Vehicle</Text>
      <TruckRow
        data={DATA}
        renderItem={renderItem}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      
      <Pressable  style={{
       backgroundColor: "#EE272E",
       borderColor: "#EE272E",
       borderRadius: 40,
       padding: 14,
       margin: 10,
       alignItems: 'center',
       borderWidth: 1,
      }}>
        <TouchableOpacity 
         onPress={bookNow}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Book Now
        </Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
    // padding:8,
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
  },
  text1: {
    color: "#EE272E",
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  BookNow: {
    backgroundColor: "#EE272E",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    margin: 8,
    width: 340,
    borderColor:"#EE272E",
  },
  BookNowText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default TruckTypes;