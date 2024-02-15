import React, { useEffect } from 'react';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';

export const openOfficialWebsite = () => {
  const officialWebsiteLink = 'https://eztruck.co/';
  Linking.openURL(officialWebsiteLink)
    .catch((err) => console.error('An error occurred', err));
};

const AboutUs = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      openOfficialWebsite();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default AboutUs;