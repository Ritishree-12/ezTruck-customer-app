import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#EE272E",
  title: "white",
  buttonBackground: "#FF6F61", // New button background color
};
const SIZES = {
  h1: 32,
  h2: 24,
  h4: 16,
  width: 400,
};
const Onboarding = () => {
  const navigation = useNavigation();
  const slides = [
    {
      id: 1,
      title: "eZTruck",
      description: "Thank you for choosing ezTruck! Get ready to experience hassle-free and convenient travels like never before",
      image: require("../../../assets/app-logo.png"),
      width: "50%",
      height: "50%",
    },
    {
      id: 2,
      description: "Onboard your vehicle with ezTruck and improve your income by logistic transportation",
      image: require("../../../assets/onbordingImg2.png"),
      width: "100%", // Change the width as needed
      height: "50%", // Change the height as needed
    },
    {
      id: 3,
      description: "Effortlessly book relaible mini trucksfor all your logisticsneedswith our user-friendly app",
      image: require("../../../assets/onbordingImg3.png"),
      width:'100%', // Change the width as needed
      height: "56%", // Change the height as needed
    },
  ];
  const buttonLabel = (label, customStyle = {}) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 25,
          width: 120,
          backgroundColor:'#ff797e',
          alignSelf: 'center',
          textAlign:'center',
          bottom: 30, 
          ...customStyle,
          // margin:0
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontWeight: "600",
            fontSize: SIZES.h4,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  const handleOnboardingComplete = () => {
    navigation.navigate("Welcome");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View style={styles.view1}>
              <Image
                source={item.image}
                style={{
                  width: item.width,
                  height: item.height,
                }}
                resizeMode="contain"
              />
              <Text style={styles.text1}>{item.title}</Text>
              <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', fontWeight: 'bold' }}>{item.description}</Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: "#FFDCDC",
          width: 25,
          bottom: 30 
        }}
        dotStyle={{
          backgroundColor: "#FFDCDC",
          width: 10,
          height: 10,
          bottom: 30 
        }}
        dotContainerStyle={{
          bottom: 40, 
          paddingHorizontal: 10 
        }}
        showSkipButton
        renderSkipButton={() =>
          buttonLabel(<Text style={{ color: "white",}}>Skip</Text>, { marginLeft: -40 })
        }
        renderNextButton={() =>
          buttonLabel(<Text style={{ color: "white"}}>Next</Text>, { marginRight: -40, })
        }
        renderDoneButton={() =>
          buttonLabel(<Text style={{ color: "white" }}>Done</Text>,{ marginRight: -40, })
        }
        onDone={handleOnboardingComplete}
        onSkip={handleOnboardingComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  view1: {
    alignItems: "center",
    padding: 10,
    justifyContent: 'center',
    paddingTop: 100
  },
  text1: {
    fontWeight: "bold",
    color: COLORS.title,
    fontSize: 22,
  },
  text2: {
    textAlign: "center",
    color: COLORS.title,
    fontWeight: "600",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text3: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 17,
  },
});

export default Onboarding;
