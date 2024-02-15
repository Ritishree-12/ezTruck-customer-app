import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-ratings';
import HomeMap from '../../map/HomeMap'


const FeedBack = ({ route, navigation }) => {
  const [rating, setRating] = useState(0);


  const handleSubmitRating = () => {
    console.log("Rating submitted:", rating);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Container */}
      <StatusBar translucent={true} />
      <View style={styles.mapContainer}>
     <HomeMap/>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
          <Image source={require('../../../assets/menuicon.png')} style={styles.menu} />
        </Pressable>
        <Pressable style={styles.profileButton}>
          <Image source={require('../../../assets/profilemenu.png')} style={styles.roundBtn} />
        </Pressable>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheetContainer}>
        <View style={styles.section1}>
          <Image source={require('../../../assets/profilemenu.png')} style={styles.secProfile} />
          <View style={{ width: '60%' }}>
            <Text style={styles.profileName}>Ritishree Gochhayat</Text>
            <View style={{flexDirection:'row',margin:3}}>
            <Image source={require('../../../assets/Shape.png')} style={styles.msgImg} />
            <Text style={{marginLeft:3,fontSize:16}}>{rating}</Text>
            </View>
          </View>
          <View style={styles.msgBackground}>
            <Image source={require('../../../assets/msg1.png')} style={styles.msgImg} />
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'center',padding:10}}>
          How is your trip with ezTruck
        </Text>
        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <AirbnbRating
           showRating={false}
           defaultRating={rating}
           size={30}
           onFinishRating={setRating} 
           selectedColor="#EE272E"
          />
        </View>
      </View>

      <View>
        <Pressable style={styles.Btn1} onPress={handleSubmitRating}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 46,
    left: 10,
    right: 10,
  },
  menuButton: {
    marginRight: 10,
  },
  profileButton: {
    marginLeft: 'auto', // Align to the right
  },
  menu: {
    height: 42,
    width: 41,
  },
  roundBtn: {
    height: 42,
    width: 41,
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: 300,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Btn1: {
    backgroundColor: '#EE272E',
    borderWidth: 1,
    borderRadius: 30,
    padding: 14,
    borderColor: '#EE272E',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: '21%',
    marginBottom:10
  },
  secProfile: {
    width: 50,
    height: 50,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
   
  },
  msgImg: {
    width: 20,
    height: 20,
  },
  msgBackground: {
    backgroundColor: '#EE272E',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  section2: {},
  ratingSection: {
    alignItems: 'center',
    textAlign: 'center',
    // marginTop:14
  },
});

export default FeedBack;
