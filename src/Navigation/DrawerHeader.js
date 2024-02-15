import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Don't forget to import axios


const DrawerHeader = () => {
  const user = useSelector(state=>state.login?.user)
  const bearerToken = user?.authTokens

  const defaultImage = require('../../assets/profile.png');

  const [userProfile, setUserProfile] = useState({
    username: 'Username',
    email: 'Email',
    image: defaultImage,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://13.200.75.208:4001/v1/users/getUser', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const userData = response.data.data;
        console.log('get profile', userData);

        setUserProfile({
          username: userData.customer_name || 'Username',
          email: userData.email || 'Email',
          image: defaultImage,
        });
      } catch (error) {
        console.error('Error fetching user data in drawer:', error);
      }
    };

    fetchUserData();
  }, [bearerToken]);

  return (
    <View style={{ marginLeft: 20 }}>
      <TouchableOpacity>
        <Image
          key={userProfile.image.uri}
          source={userProfile.image}
          style={{ width: 70, height: 70, top: 30, borderRadius: 40, borderWidth: 1, borderColor: '#EE272E' }}
        />
      </TouchableOpacity>
      <View style={{ top: 40, marginBottom: 40 ,}}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#EE272E' }}>
          {userProfile.username}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#414141', }}>
          {userProfile.email}
        </Text>
      </View>
    </View>
  );
};

export default DrawerHeader;
