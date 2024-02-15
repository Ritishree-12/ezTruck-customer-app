import React , { useEffect} from 'react';
import {PermissionsAndroid, Platform,StatusBar} from 'react-native'
import AppNavigator from './src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/utils/store';
import SplashScreen from 'react-native-splash-screen';
// import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

import { requestUserPermission , notificationListner} from './src/utils/notificationServices'

navigator.geolocation = require('@react-native-community/geolocation');
const App = () => {
 
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
      // Show the status bar after hiding the splash screen
      StatusBar.setHidden(false);
      // Set the background color of the status bar to red
      StatusBar.setBackgroundColor('#EE272E');
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  

  useEffect (()=>{
    requestUserPermission()
    notificationListner()
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
    
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
        console.log("You can use the location");
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <AppNavigator/>
      </PersistGate>
    </Provider>
   

  );
};

export default App;
