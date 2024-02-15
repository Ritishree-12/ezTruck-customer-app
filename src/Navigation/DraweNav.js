import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChangeLanguage from '../screens/Component/ChangeLanguage';
import AboutUs from '../screens/Component/AboutUs';
import Booking from '../screens/Component/Booking';
import Profile from '../screens/Component/Profile';
import CustomDrawerContent from './CustomeDrawerContent';
import AuthStack from './AuthStack';
import InviteFriends from '../screens/Component/InviteFriends';
import LogoutScreen from '../screens/Component/LogOut';

const Drawer = createDrawerNavigator();

const DrawerNav = (navigation) => {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: '#fff',
        borderTopRightRadius:40,
        borderBottomRightRadius:40,
        width:249
      },
      drawerLabelStyle: {
        color: '#414141',
      },
    }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={AuthStack}
        options={{
          drawerLabel: 'Home',
          // Use the onPress function to navigate to the "Home" screen
          onPress: () => navigation.navigate('Home'),
        }}
      />
       <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Bookings"
        component={Booking}
      />
       <Drawer.Screen 
      name="Change Language"
        component={ChangeLanguage}
      />
      <Drawer.Screen name="Invite Friends"
        component={InviteFriends}
      />

      <Drawer.Screen name="About Us"
        component={AboutUs}
      />
     
      <Drawer.Screen name="LogOut"
        component={LogoutScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
