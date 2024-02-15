import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import { useDispatch } from 'react-redux';
import { notificationReceivedSuccess, clearNotification } from '../utils/notificationReducer'; // Update with the correct path

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
       const token =  getFcmToken();
    }
}


export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log("In AsyncStorage", fcmToken);

  const updateTokenInAsyncStorage = async (newToken) => {
    console.log("Updating token in AsyncStorage:", newToken);
    await AsyncStorage.setItem('fcmToken', newToken);
  };

  const onTokenRefresh = async () => {
    try {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        console.log("FCM Token refreshed:", newFcmToken);
        fcmToken = newFcmToken;
        await updateTokenInAsyncStorage(newFcmToken);
      }
    } catch (error) {
      console.error('Error during token refresh:', error);
    }
  };

  messaging().onTokenRefresh(onTokenRefresh);

  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("The new generated FCM Token", fcmToken);
        await updateTokenInAsyncStorage(fcmToken);
      }
    } catch (error) {
      console.log("Error raised in getFcmToken:", error);
    }
  }

  return fcmToken;
};



//Notifee functionn here//
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
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });

}


export const notificationListner = async()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
      });


      messaging().onMessage(async remoteMessage =>{
        console.log("received message in foreground",remoteMessage);
        onDisplayNotification(remoteMessage)
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
}