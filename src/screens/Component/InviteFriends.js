import React, { useEffect } from 'react';
import { View,TouchableOpacity ,Image,Text} from 'react-native';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';

const InviteFriends = ({ navigation }) => {
  const isFocused = useIsFocused();

  const handleShare = async () => {
    try {
      const options = {
        message: 'Check out this awesome app!',
      };

      await Share.open(options);

      // Check if navigation object and replace function are available
      if (navigation && navigation.replace) {
        // Replace the current screen with the Home screen
        navigation.replace('Home');
      } else {
        console.error('Error: Navigation or replace function not available.', navigation);
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleShare();
    }
  }, [isFocused, handleShare]);

  return (
    <View>
       <View>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          
        >
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InviteFriends;