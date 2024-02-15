import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Registration from '../authentication/Registration';
import OtpScreen from '../authentication/OtpScreen';
import Onboarding from '../screens/onboardingscreens/Onboarding';
import Onboard from '../screens/onboardingscreens/Onboard';
import Welcome from '../screens/welcome/Welcome';
import Login from '../authentication/Login';
import DestinationSearch from '../screens/destinationsearch/DestinationSearch';
import TruckRow from '../screens/trucktypes/TruckRow';
import SearchResult from '../screens/destinationsearch/SearchResult';
import TruckTypes from '../screens/trucktypes/TruckTypes';
import HomeScreen from '../screens/home/HomeScreen';
import Waiting from '../screens/contact/Waiting'
import BookingConfirmation from '../screens/contact/BookingConfirmation';
import PaymentScreen from '../screens/contact/PaymentScreen';
import GoogleSigninContactScreen from '../authentication/GoogleSigninContactScreen';
import FeedBack from '../screens/feedBack/FeedBack';

const Stack = createStackNavigator();

const AuthStack = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
        
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TruckTypes"
            component={TruckTypes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TruckRow"
            component={TruckRow}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DestinationSearch"
            component={DestinationSearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Waiting"
            component={Waiting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={BookingConfirmation}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          /> */}
            {/* <Stack.Screen
            name="FeedBack"
            component={FeedBack}
            options={{ headerShown: false }}
          /> */}
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ title: "Back" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Back" }}
          />
          <Stack.Screen
            name="GoogleSigninContactScreen"
            component={GoogleSigninContactScreen}
            options={{ title: "Back" }}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ title: "Back" }}
          />

        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
