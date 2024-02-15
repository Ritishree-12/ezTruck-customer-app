import React from 'react';
import { Image, View, Text, Share, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import DrawerHeader from './DrawerHeader';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../utils/loginReducer';
import { useNavigation } from '@react-navigation/native';
import GoogleSignin from "../Services/google";

const CustomDrawerContent = (props) => {

    const navigation = useNavigation();

    const dispatch = useDispatch()
      const user = useSelector(state=>state.login?.user)
      const bearerToken = user?.authTokens
      console.log("user",user)
      
      const onLogout = async()=>{
        if(user.isGoogleSignIn) {
          await GoogleSignin.signOut();
        }
          const url = "http://13.200.75.208:4001/v1/users/logout"
          try{
              const response = await axios.get(url,
                  {
                      headers:{
                          Authorization: `Bearer ${bearerToken}`,
                      },
                  }); 
                  console.log('response',response);
                  if (response.data?.status === '1'){
                      console.log("Logout successful");
                      dispatch(logout())
                      navigation.navigate("Welcome")
                      alert("Logout Successful", "You have been successfully logged out.");
                  }
                  else{
                      console.log("Unable to logout ");
                  }
          } catch(error){
              console.error("Unable to request your process for logout",error.message);
  
          }
      }

      const inviteFriends = async () => {
        try {
          const result = await Share.share({
            message: 'Hey! Join us on our awesome app. Here is the invitation link: https://play.google.com/store/apps/details?id=com.eztruck.user&pcampaignid=web_share',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('Shared with activity type:', result.activityType);
            } else {
              console.log('Shared');
            }
          } else if (result.action === Share.dismissedAction) {
            console.log('Dismissed');
          }
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
      };
      const aboutUs = () => {
        Linking.openURL('https://eztruck.co');
      };
      const getIconForRoute = (routeName) => {
        const cleanedRouteName = routeName.replace(/\s+/g, '_'); // Replace spaces with underscores
        const routeIcons = {
          Home: require('../../assets/user.png'),
          Profile: require('../../assets/plogo.png'),
          Bookings: require('../../assets/booking.png'),
          About_Us: require('../../assets/aboutus.png'),
          Change_Language: require('../../assets/language.png'),
          Invite_Friends: require('../../assets/friends.png'),
          LogOut: require('../../assets/logout.png'),
        };
        return routeIcons[cleanedRouteName] || null;
      };
      return (
        <DrawerContentScrollView {...props}>
          <DrawerHeader onChangeImage={() => console.log('Change Image Pressed')} />
          {props.state.routes.map((route, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#E8E8E8',
                    marginVertical: 2,
                  }}
                />
              )}
              <DrawerItem
                label={() => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={getIconForRoute(route.name)}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    />
                    <Text style={{ color: '#414141' }}>{route.name}</Text>
                  </View>
                )}
                onPress={() => {
                  if (route.name === 'LogOut') {
                    onLogout();
                  } else if (route.name === 'Invite Friends') {
                    inviteFriends();
                  } else if (route.name === 'About Us') {
                    aboutUs();
                  } else {
                    props.navigation.navigate(route.name);
                    props.navigation.closeDrawer();
                  }
                }}
                labelStyle={{ color: '#414141' }}
                style={{ marginLeft: 0 }}
              />
            </React.Fragment>
          ))}
        </DrawerContentScrollView>
      );
    };
export default CustomDrawerContent;
