import { StyleSheet, Text, View, Dimensions, Pressable, Image, ScrollView,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Booking = ({ navigation }) => {
  const user = useSelector(state=>state.login?.user)
  const bearerToken = user?.authTokens
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://13.200.75.208:4001/v1/book/booking_history', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then(response => {
        const data = response.data.data;
        setBookingData(data);
        setLoading(false); // Set loading to false once the data is fetched
        console.log('booking history', data);
      })
      .catch(error => {
        console.error('Error fetching user data in booking:', error);
      });
  }, [bearerToken]);

   // Add a helper function to truncate text
   const truncateText = (text) => {
    const maxLength = 20; // Adjust the maximum length as needed
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
       translucent={true}
       barStyle="dark-content"
       backgroundColor="transparent"
        />
      <View style={styles.header}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[styles.menu, { top: 16, left: 12 }]}
      >
        <Ionicons name="close-sharp" size={30} color="#EE272E" />
      </Pressable>
      <Text style={styles.tripHistory}>Trip History</Text>
      </View>
      <View style={styles.bottomSheetContainer}>
        <Text>History</Text>
      <ScrollView>
          {loading ? (
            // Add a loading indicator if data is still being fetched
            <Text>Loading...</Text>
          ) : (
            // Check if bookingData exists before mapping
            bookingData && bookingData.length > 0 ? (
              // Use map to iterate over booking data and create Card components
              bookingData.map((booking, index) => (
                <Card key={index} containerStyle={styles.cardContainer}>
                  {/* Location Icon, Name, and Time Row */}
                  <View style={{height:122,}}>
                  <View style={styles.userInfoContainer}>
                    <Image source={require('../../../assets/pickup.png')} style={{height:18,width:18}} />
                    <Text style={styles.userLocation}>{truncateText(booking.pickup_location)}</Text>
                    <Text style={styles.userTime}>{booking.duration}</Text>
                  </View>
                  <View style={styles.userInfoContainer}>
                  <Image source={require('../../../assets/drop.png')} style={{height:20,width:16}} />
                    <Text style={styles.userLocation}>{truncateText(booking.drop_location)}</Text>
                    <Text style={styles.userTime}>{booking.duration}</Text>
                  </View>
                  </View>
                  <Card.Divider />
                  <View style={styles.userInfoContainer}>
                    <View style={styles.userName}>
                      <Text style={styles.userText}>{booking.driver}</Text>
                    </View>
                    <Text style={styles.userTime}>₹{booking.trip_cost}</Text>
                  </View>
                </Card>
              ))
            ) : (
              <Text>No booking data available.</Text>
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE272E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  tripHistory: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    top: 16,
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 50
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: '90%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,

    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  menu: {
    position: 'absolute',
    // top: 5,
    // left: 10,
    padding: 6,
    borderRadius: 40,
    backgroundColor: '#fff',
    zIndex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 14,
    height: 200
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  userLocation: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    width:200
  },
  userTime: {
    marginLeft: 'auto', // Pushes the time to the right side
    fontSize: 16,
    // width:90
  },
  userName: {
    margin: 10,
  },
  userText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',

  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  
})