import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';  
import Config from 'react-native-config';

const apiKey = Config.FIREBASE_API_KEY;
const authDomain = Config.FIREBASE_AUTH_DOMAIN;
const projectId = Config.FIREBASE_PROJECT_ID;
const storageBucket = Config.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = Config.FIREBASE_MESSAGING_SENDER_ID;
const appId = Config.FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.messaging = messaging();  // Initialize messaging directly
  }
}

const firebaseInstance = new Firebase();
export default firebaseInstance;
