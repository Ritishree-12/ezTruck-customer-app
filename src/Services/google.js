import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Config from 'react-native-config';

const GOOGLE_ANDROID_CLIENT_ID = Config.GOOGLE_ANDROID_CLIENT_ID;
const GOOGLE_PROJECT_ID = Config.GOOGLE_PROJECT_ID
const GOOGLE_ANDROID_AUTH_URI = Config.GOOGLE_ANDROID_AUTH_URI
const GOOGLE_ANDROID_TOKEN_URI = Config.GOOGLE_ANDROID_TOKEN_URI

const GOOGLE_IOS_CLIENT_ID  = Config.GOOGLE_IOS_CLIENT_ID

GoogleSignin.configure(
    {webclientId:GOOGLE_ANDROID_CLIENT_ID,
     iosClientId: GOOGLE_IOS_CLIENT_ID,
    
    scopes: ['profile', 'email', 'openid']
    });

export default GoogleSignin;