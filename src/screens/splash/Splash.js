import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";


//the code is not use right now //
const Splash = ({ navigation }) => {
  useEffect(() => {
    // Add any initialization logic or navigation logic here

    // Navigate to the Welcome screen after a certain time (e.g., 2 seconds)
    const timer = setTimeout(() => {
      navigation.navigate("Onboarding");
    }, 200);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Your splash screen image or content */}
      <Image
        source={require("../../../assets/logo2.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EE272E",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});