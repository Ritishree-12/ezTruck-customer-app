import { StyleSheet, Text, View, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import { Avatar } from '@rneui/themed';
import React from 'react'


const Booking = ({navigation}) => {
  const users = [
    {
      name: 'Ritishree',
      pickup: 'ezTruck Office',
      drop: 'esplanade',
      time: '7:30 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
    {
      name: 'Madhushri Madhu ',
      pickup: 'Jayadev Vihar',
      drop: 'Patia',
      time: '7:00 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
    {
      name: 'Preeti',
      pickup: 'Fire Station',
      drop: 'Jharshuguda',
      time: '8:20 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
    {
      name: 'Sujata',
      pickup: 'ezTruck Office',
      drop: 'esplanade',
      time: '2:30 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
    {
      name: 'Barsha',
      pickup: 'ezTruck Office',
      drop: 'esplanade',
      time: '9:30 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
    {
      name: 'Somali',
      pickup: 'ezTruck Office',
      drop: 'esplanade',
      time: '10:30 am',
      avatar: 'https://example.com/avatar1.jpg',
      price:'450',
      ratings:'4.5'
    },
  ];
  return (

    <View style={styles.container}>
     <Pressable
        onPress={() => navigation.goBack()} 
        style={[styles.menu, { top: 16, left: 12 }]}
      >
        <Ionicons name="close-sharp" size={30} color="#EE272E" />

      </Pressable>
      <Text style={styles.tripHistory}>Trip History</Text>
      <View style={styles.bottomSheetContainer}>
        <ScrollView>
          {users.map((user, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              {/* Location Icon, Name, and Time Row */}
              <View style={styles.userInfoContainer}>
                <Ionicons name="location" size={20} color="green" />
                <Text style={styles.userLocation}>{user.pickup}</Text>
                <Text style={styles.userTime}>{user.time}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Ionicons name="location" size={20} color="red" />
                <Text style={styles.userLocation}>{user.drop}</Text>
                <Text style={styles.userTime}>{user.time}</Text>
              </View>
              <Card.Divider />
              <View style={styles.userInfoContainer}>
                <Avatar
                  source={{ uri: user.avatar }}
                  size="medium"
                  rounded
                  onPress={() => console.log("Avatar pressed")}
                  activeOpacity={0.2}
                  containerStyle={styles.avatarContainer}
                />
                <View  style={styles.userName}>
                <Text style={styles.userText}>{user.name}</Text>
                <Text >{user.ratings}</Text>
                </View>
                {/* <Text style={styles.userName}>{user.name}</Text> */}
                <Text style={styles.userTime}>₹{user.price}</Text>
              </View>

            </Card>
          ))}
        </ScrollView>
      </View>
    </View>

  )
}

export default Booking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE272E',
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
    borderRadius: 10,
    height: 200
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userLocation: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  userTime: {
    marginLeft: 'auto', // Pushes the time to the right side
    fontSize: 16,
  },
  userName: {
    margin: 10,
  },
  userText: {
    fontWeight:'bold',
    fontSize:16,
    color:'black',
   
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
})