import React, { useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity, Alert } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Page from './Page';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation/native

const Onboarding1 = () => {
  const COLORS = {
    primary: "#EE272E",
    title: "white",
  };

  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation(); // Initialize navigation

  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const handleSkip = () => {
    // Implement your logic to handle skip button press
  };

  const handleNext = () => {
    // Implement your logic to handle next button press
    if (currentPage < 2) {
      viewPagerRef.current.setPage(currentPage + 1);
    } else {
      // Navigate to welcome screen when on last page
      navigation.navigate('Welcome'); // Replace 'WelcomeScreen' with the name of your welcome screen
    }
  };

  const viewPagerRef = React.createRef();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ViewPager
        style={{ flex: 1 }}
        onPageSelected={handlePageChange}
        ref={viewPagerRef}
      >
        <View key="1">
          <Page
            backgroundColor="#EE272E"
            image={require('../../../assets/logo.png')}
            imageWidth={180}
            imageHeight={180}
            title="Effortlessly book reliable mini trucks for all your logistics needs with our user-friendly app"
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#EE272E"
            image={require('../../../assets/onbordingImg2.png')}
            imageWidth={340}
            imageHeight={200}
            title="Onboard your vehicle with ezTruck and improve your income by logistic transportation"
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#EE272E"
            image={require('../../../assets/onbordingImg3.png')}
            imageWidth={340}
            imageHeight={200}
            title="Effortlessly book reliable mini trucks for all your logistics needs with our user-friendly app"
          />
        </View>
      </ViewPager>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor:"#EE272E" }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={{ color: 'white', fontSize: 16 }}>Skip</Text>
        </TouchableOpacity>
        {/* Conditional rendering of Next button */}
        {currentPage < 2 && (
          <TouchableOpacity onPress={handleNext}>
            <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>
          </TouchableOpacity>
        )}
        {/* Show Next button on last page */}
        {currentPage === 2 && (
          <TouchableOpacity onPress={handleNext}>
            <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Onboarding1;
