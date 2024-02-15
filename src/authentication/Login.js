import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Pressable,StatusBar } from "react-native";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {registerSuccess} from '../utils/loginReducer';
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleSignin from "../Services/google";
import { statusCodes } from '@react-native-google-signin/google-signin';
import { getFcmToken } from "../utils/notificationServices";

const Login = ({navigation}) => {
 
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [token, setToken] = useState('')

  const checkToken = async () => {

    const fcmToken = await getFcmToken();
    setToken(fcmToken)
    console.log("fcmToken  for customer in login.js",fcmToken);
  }

  useEffect(() => {
    checkToken();
  }, [])

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(value)) {
      setPhoneNumberError("");
      return true;
    } else {
      setPhoneNumberError("Please enter a valid 10-digit mobile number");
      return false;
    }
  };

  const sendOtp = async () => {
    if (validatePhoneNumber(phoneNumber)) {

      try {
        const customerData = {
        mobile_number: `+91${phoneNumber}`,
        token: token
      };
      console.log("*************************************in login.js", customerData)
        const response = await axios.post(
          'http://13.200.75.208:4001/v1/users/login',
          customerData,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        if (response.data) {
          dispatch(registerSuccess(response.data));

          const url = `https://control.msg91.com/api/v5/otp?template_id=646b0553d6fc0550857a9702&mobile=91${phoneNumber}`;

          try {
            const otpResponse = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authkey: "395607ATzxdWwee644b4b4bP1", // replace with your Msg91 key
              },
            });

            if (otpResponse.ok) {
              navigation.navigate("OtpScreen", { phoneNumber: phoneNumber }, { authTokens: response?.data?.authTokens });
            } else {
              console.error("Error sending OTP:", otpResponse.status);
            }
          } catch (otpError) {
            console.error("Error sending OTP:", otpError);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          navigation.navigate("Registration");
        } else {
          console.error('An error occurred during the request:', error);
        }
      }
    } 
  };

  const handleGoogleSignIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate("GoogleSigninContactScreen", {customer_name:userInfo.user.name, email:userInfo.user.email})
    } catch(error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Signin cancelled", error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("signin in progress", error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play Services not available');
        console.log("play services not available", error)
      } else {
        console.log("Some other error: ", error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content" />
      <Text style={styles.title}>Login with mobile number</Text>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(value) => setPhoneNumber(value)}
          onBlur={() => validatePhoneNumber(phoneNumber)}
          placeholder="Enter your mobile number"
          keyboardType="numeric"
          style={[styles.input, phoneNumberError ? styles.inputError : null]}
        />
        {phoneNumberError ? <Text style={styles.errorMessage}>{phoneNumberError}</Text> : null}
        <Pressable
          onPress={sendOtp}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
        </Pressable>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.or}>or</Text>
        <View style={styles.horizontalLine} />
      </View>
      <View>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image
            source={require("../../assets/google-icon.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Registration")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  title: {
    color: "#EE272E",
    fontWeight: "bold",
    fontSize: 24,
    // marginBottom: 20,
    // paddingHorizontal: 14,
    width:'100%',
    height:40
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 56,
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderColor: "grey",
    color: "grey",
  },
  inputError: {
    borderColor: "red", // Change border color for error state
  },
  errorMessage: {
    color: "red",
    marginBottom: 8,
  },
  loginButton: {
    height: 55,
    marginVertical: 8,
    borderRadius: 30,
    backgroundColor: "#EE272E",
    alignItems: "center",
    justifyContent: "center",
    color: '#fff'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  googleButton: {
    height: 58,
    width: 140,
    margin: 10,
    borderWidth: 1,
    borderRadius: 40,
    color: "black",
    fontWeight: "800",
    alignSelf: "center",
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  googleImage: {
    width: 26,
    height: 28,
    marginRight: -10,
  },
  googleText: {
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  or: {
    fontSize: 18,
    color: "grey",
    paddingHorizontal: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  signupText: {
    fontSize: 15,
    margin: 18,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    textAlign: "center",
  },
  signupLink: {
    color: "#EE272E",
  },
});

export default Login;
