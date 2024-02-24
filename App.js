import React , { useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native'
import AppNavigator from './src/Navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import notifee, {AndroidImportance} from '@notifee/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { bookingNotificationReceivedSuccess, driverArrivedNotificationReceivedSuccess } from './src/utils/notificationReducer'; // Update with the correct path

import { requestUserPermission , notificationListner} from './src/utils/notificationServices'

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const timer = setTimeout(() => {
      SplashScreen.hide();

    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  async function onDisplayNotification(data) {
    // Request permissions (required for iOS)

    if (Platform.OS=='ios'){
        await notifee.requestPermission()
    }
    

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default1',
      name: 'Default Channel1',
      sound: 'default',
      importance: AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
      title: data?.notification.title,
      body: data?.notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });

}

  const setNotifData = (notifType, data) => {
  if (notifType === 'bookingConfirmation') {
    const drop_Locations = JSON.parse(data.drop_Locations);
    const pickup_Locations = JSON.parse(data.pickup_Locations);
    const name = JSON.parse(data.driver_name);
    const otp = JSON.parse(data.otp);
    const price = JSON.parse(data.price);
    const time = JSON.parse(data.time);
    const distance = JSON.parse(data.distance);
    const mobile_number = JSON.parse(data.mobile_number);
    const BookingId = JSON.parse(data.BookingId);
    const driverId = JSON.parse(data.driverId);
    const pickupLocationCoords ={latitude: JSON.parse(data.pickupLocationCoords).latitude, longitude:  JSON.parse(data.pickupLocationCoords).longitude};
    const truck_type = JSON.parse(data.truck_type);
    const dropLocationCoords = {latitude: JSON.parse(data.dropLocationCoords).latitude, longitude: JSON.parse(data.dropLocationCoords).longitude} 


    const booking = {
      drop_Locations: drop_Locations,
      pickup_Locations: pickup_Locations,
      name: name,
      price: price,
      time: time,
      distance: distance,
      mobile_number: mobile_number,
      BookingId: BookingId,
      otp: otp,
      driverId: driverId,
      pickupLocationCoords: pickupLocationCoords,
      dropLocationCoords: dropLocationCoords,
      notifType: notifType,
      truck_type: truck_type
    };
    return booking;
  }
  return data;
  }

  useEffect (()=>{
    requestUserPermission()
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      const notifType = JSON.parse(remoteMessage.data.notifType)
      const notifData = setNotifData(notifType,remoteMessage.data)
      if (notifType === 'bookingConfirmation') {
        dispatch(bookingNotificationReceivedSuccess(notifData));
      }
      if (notifType === 'arrived') {
        dispatch(driverArrivedNotificationReceivedSuccess());
      }
      if (notifType === 'dropoffCompleted') {
        dispatch(customerDriverDropoffCompleted());
      }
    });

    messaging().onMessage(async remoteMessage =>{
      onDisplayNotification(remoteMessage)
      const notifType = JSON.parse(remoteMessage.data.notifType)
      const notifData = setNotifData(notifType,remoteMessage.data)
     
    if (notifType == 'bookingConfirmation') {
      dispatch(bookingNotificationReceivedSuccess(notifData));

    }
    if (notifType === 'arrived') {
      dispatch(driverArrivedNotificationReceivedSuccess());
    }
    if (notifType === 'dropoffCompleted') {
      dispatch(customerDriverDropoffCompleted());
    }
    
    })

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  },[])

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "ezTruck App Camera Permission",
          message:
            "ezTruck App needs access to your location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can u eztruck location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])


  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
       <AppNavigator/>

    //   </PersistGate>
    // </Provider>


  );
};

export default App;
