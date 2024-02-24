import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, StatusBar, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMap from '../../map/HomeMap';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import BookingMap from '../../map/BookingMap';
import database from '@react-native-firebase/database';
import axios from 'axios';
import {clearBookingNotification, customerDriverDropoffCompleted,clearDropOff} from '../../utils/notificationReducer'

const BookingConfirmation = ({ route, navigation }) => {
    dispatch = useDispatch();
    const bookingData = route.params?.bookingData
    const isDriverArrived =  useSelector(state=>state?.notification?.driverArrivedNotificationReceived)
    const user = useSelector(state=>state.login?.user)
    const bearerToken = user?.authTokens
    const [driverLocation, setDriverLocation] = useState({latitude:0, longitude:0});
    const driverId = bookingData.driverId;
    const isDropOffCompleted = useSelector(state=>state.notification?.dropOffCompleted)

    useEffect(() => {
        if (isDropOffCompleted) {
          navigation.navigate('Payment',{bookingData: bookingData});
        }
      }, [isDropOffCompleted, navigation]);

      useEffect(() => {
    // Subscribe to the driver's location in Firebase Realtime Database
    const driverLocationRef = database().ref(`drivers/${driverId}`);
    const onDriverLocationChange = (snapshot) => {
      const location = snapshot.val();
      if (location) {
        setDriverLocation({latitude: location.lat, longitude: location.lng});
      }
    };

    driverLocationRef.on('value', onDriverLocationChange);

    // Set the initial region to the driver's last known location
    driverLocationRef.once('value').then((snapshot) => {
      const location = snapshot.val();
      if (location) {
        setDriverLocation({latitude: location.lat, longitude: location.lng})
      }
    });
    return () => {
      driverLocationRef.off('value', onDriverLocationChange);
    };
  }, [driverLocation.latitude, driverLocation.longitude]);


  const handleCancelBooking = async() => {
    try {
        const response = await axios.put(
          'http://13.200.75.208:4001/v1/book/booking_cancel_by_customer',
          {bookingId: bookingData.BookingId},
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        if (response.data.status === "1") {
         console.log("Booking successfuly cancelled", response.data)
         dispatch(clearBookingNotification());
         dispatch(customerDriverDropoffCompleted());
         dispatch(clearDropOff());
         navigation.navigate("HomeScreen")
        } 
        else if (response.data.status === "0") {
        console.log("Error in Waiting Screen in handleCancelBooking", response.data.message)
        } 
      } catch (error) {
        console.log("An error occured in Waiting screen, handleCancelBooking", error)
      }
}

    const colors = {
        primary: '#EE272E',
        secondary: '#EE272E',
        background: '#ECF0F1',
        text: '#2C3E50',
    };
    const fonts = {
        heading: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
        },
        subheading: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#EE272E',
        },
    };
    const buttonStyles = {
        walletButton: {
            backgroundColor: colors.primary,
            borderRadius: 30,
            paddingVertical: 10,
            width: 124,
            marginRight: 10,
        },
        yourRideButton: {
            borderRadius: 30,
            paddingVertical: 12,
            width: 124,
            borderWidth: 1,
            borderColor: 'red'
        },
    };
    const imageStyles = {
        profilePhoto: {
            width: 60,
            height: 60,
            borderRadius: 5,
            marginRight: 8,
            borderWidth: 2,
            borderColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    };

    const openDialPad = () => {
        Linking.openURL('tel:12344555');
    };
    const openMessageApp = () => {
        Linking.openURL('sms:');
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Map Container */}
            <StatusBar translucent={true} />
            <View style={styles.mapContainer}>
                {/* <HomeMap /> */}
                {
                    isDriverArrived ? <BookingMap driverLocation={driverLocation} pickupLocation={bookingData.pickupLocationCoords} destinationLocation={null}/> : <BookingMap driverLocation={driverLocation} pickupLocation={null} destinationLocation={bookingData.dropLocationCoords}/>
                }
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image source={require('../../../assets/menuicon.png')} style={styles.menu} />
                </Pressable>
                <Pressable style={styles.profileButton}>
                    <Image source={require('../../../assets/profilemenu.png')} style={styles.roundBtn} />
                </Pressable>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheetContainer}>
                <View style={styles.curveBackground}>
                    <Text style={styles.otpsection} >Otp</Text>
                    <Text style={styles.otpsection1}>{bookingData.otp}</Text>
                </View>
                <View style={styles.section1}>
                    <Text style={styles.text1}>Your Booking is confirmation</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../../../assets/Asset3.png')}
                            style={[styles.profilePhoto, imageStyles.profilePhoto]}
                        />
                        <View style={styles.profileDetails}>
                            <Text style={[styles.profileName, fonts.heading]}>{bookingData.name}</Text>
                            <Text style={[styles.profileInfo]}>
                                {bookingData.truck_type}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.totalEarningContainer}>
                    <Pressable style={buttonStyles.walletButton} onPress={openDialPad}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Icon name="call" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Call</Text>
                        </View>
                    </Pressable>
                    <Pressable style={buttonStyles.yourRideButton} onPress={openMessageApp}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
                            <Icon name="message" type="MaterialCommunityIcons" size={20} color='#EE272E' />
                            <Text style={styles.buttonText1}>Message</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.section3}>
                <View>
                <Image source={require('../../../assets/choose3.png')}  style={{height:50,width:80,marginRight:10}} />
                </View>
                        <View >
                            <Text>Distance</Text>
                            <Text style={{color:'red'}}>{bookingData.distance}</Text>
                        </View>
                        <View >
                            <Text>Time</Text>
                            <Text style={{color:'red'}}>{bookingData.time}</Text>
                        </View>
                        <View >
                            <Text>Price</Text>
                            <Text style={{color:'red'}}>{bookingData.price}</Text>
                        </View>
                 
                </View>
                <View>
                    <Pressable style={styles.Btn1} 
                    onPress={handleCancelBooking}
                    >
                        <Text style={styles.cancelBtnText}>Cancel Booking</Text>
                    </Pressable>
                    <Pressable style={styles. paybtn} 
                    onPress={() => {navigation.navigate('Payment', {bookingData: bookingData})}}
                    >
                        <Text style={styles.buttonText}>Payment</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Ensure relative positioning for child absolute positioning
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
        zIndex: 2, // Higher zIndex to overlay on top of the map
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
        height: 400,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    curveBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 60,
        backgroundColor: '#EE272E',
        // transform: [{ scaleX: 2 }],
        zIndex: -1,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 20
    },
    text1: {
        color: '#EE272E',
        fontSize: 18,
        fontWeight: '400',

    },
    img: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%',
        height: 60,
        width: 60,
    },
    paybtn: {
        backgroundColor: '#EE272E',
        borderWidth: 1,
        borderRadius: 30,
        padding: 12,
        borderColor: '#EE272E',
        marginBottom:12,
        // margin: 0
    },
    Btn1: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 30,
        padding: 12,
        borderColor: '#EE272E',
        marginBottom:6,
        // margin: 0
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight:'600'
    },
    cancelBtnText: {
        color: '#EE272E',
        textAlign: 'center',
        fontSize: 16,
        fontWeight:'600'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileDetails: {
        marginTop: 8,
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center', // Center text horizontally
    },
    profileInfo: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center', // Center text horizontally
    },
    totalEarningContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // padding: 20,
        color: '#EE272E'
    },
    totalEarningLabel: {
        fontWeight: 'bold',
        color: '#EE272E'
    },
    totalEarningValue: {
        color: 'red',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // padding: 20
    },
    buttonText1: {
        color: '#EE272E',
        textAlign: 'center',
        fontSize: 16,
    },
    section3: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 28,
        // padding: 20,
        color: '#EE272E'
    },
    section1: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    otpsection: {
        textAlign: 'center',
        color: '#ffff',
        fontWeight: '600',
        marginTop: 10,
    },
    otpsection1: {
        textAlign: 'center',
        color: '#ffff',
        fontWeight: '600',
    }

});

export default BookingConfirmation;
