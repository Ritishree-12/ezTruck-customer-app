import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMap from '../../map/HomeMap';
import BookingMap from '../../map/BookingMap';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {clearBookingNotification, customerDriverDropoffCompleted,clearDropOff} from '../../utils/notificationReducer'

const Waiting = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const {origin, destination} = route.params

    const isBookingConfirm =  useSelector(state=>state?.notification?.bookingNotificationReceived)
    const bookingData = useSelector(state=>state?.notification?.bookingConfirmationNotificationData)
    const [currentLocation, setCurrentLocation] = useState(null);
    const user = useSelector(state=>state.login?.user)
    const bearerToken = user?.authTokens

    useEffect(() => {
        if (isBookingConfirm) {
            navigation.navigate('Confirmation', {bookingData: bookingData})
        }

      }, [isBookingConfirm, bookingData, navigation]);

    const handleCancelBooking = async() => {
             dispatch(clearBookingNotification());
             dispatch(customerDriverDropoffCompleted());
             dispatch(clearDropOff());
             navigation.navigate("HomeScreen")
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Map Container */}
            <StatusBar translucent={true} />
            <View style={styles.mapContainer}>
                {/* <BookingMap origin={origin} destination={destination} /> */}
                <HomeMap currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}></HomeMap>
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
                <Text style={styles.text1}>Waiting for Driver confirmation...</Text>
                {/* <View > */}
                <Image source={require('../../../assets/img1.png')} style={styles.img} />
                {/* </View> */}
            </View>
            <View>
                <Pressable style={styles.Btn1} onPress={handleCancelBooking}>
                    <Text style={styles.buttonText}>Cancel Booking</Text>

                </Pressable>
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
        height: 300,
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
    Btn1: {
        backgroundColor: '#EE272E',
        borderWidth: 1,
        borderRadius: 30,
        padding: 14,
        borderColor: '#EE272E',
        // marginBottom:10,
        margin: 16
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },

});

export default Waiting;