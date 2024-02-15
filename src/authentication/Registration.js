import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { COLORS, FONTS, SPACING,commonInputStyle } from "./style";
import { CheckBox } from "react-native-elements";
import firebaseInstance from "../Services/firebase";
import GoogleSignin from "../Services/google";
import { statusCodes } from '@react-native-google-signin/google-signin';


const Registration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [token, setToken] = useState(null);

  const handleSignUp = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    // Reset error messages
    setNameError("");
    setEmailError("");
    setMobileNumberError("");
    setPasswordError("");

    // Validation logic for each field
    if (!name.trim()) {
      setNameError('Please enter your name.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setEmailError('Invalid email format.');
      return;
    }

    if (!mobileNumber.trim() || !/^(\+91)?[6789]\d{9}$/.test(mobileNumber.trim())) {
      setMobileNumberError('Mobile number should be a valid 10-digit number.');
      return;
    }

    if (!passwordRegex.test(password.trim())) {
      setPasswordError('Password should be [A-Z],@$!%*?&-+=^ and [a-z]');
      return;
    }

    //generate device_token
    try {
      await firebaseInstance.messaging.requestPermission();
      const device_token = await firebaseInstance.messaging.getToken();
      console.log("Device token: ", device_token)

      const customerData = {
        email: email,
        customer_name: name,
        mobile_number: `+91${mobileNumber}`,
        password: password,
        device_token: device_token,
      };

      const response = await axios.post(
        'http://13.200.75.208:4001/v1/users/signUp',
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Sign Up Success', 'Customer registered successfully! Please login',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        console.error('Unexpected status code', response.status);
        Alert.alert(
          'Error',
          'An error occurred while processing your request. Please try again.',
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert(
          'User Exists',
          'Mobile number already registered. Log in or use another number.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        console.log("Error: ", error)
        Alert.alert('Error', 'An error occurred while processing your request.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setName(userInfo.user.name);
      setEmail(userInfo.user.email);
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
      <Text style={styles.title}>Register New customer</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError("");
          }}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Your Mobile Number"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={(text) => {
            setMobileNumber(text);
            setMobileNumberError("");
          }}
        />
        {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.checkboxContainer}>
          <CheckBox
            title={
              <Text style={styles.terms}>
                By signing up, you agree to the{" "}
                <Text style={styles.termsHighlight}>Terms of Service</Text> and{" "}
                <Text style={styles.termsHighlight}>Privacy Policy.</Text>
              </Text>
            }
            checked={agreeTerms}
            onPress={() => setAgreeTerms(!agreeTerms)}
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.or}>or</Text>
          <View style={styles.horizontalLine} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image
            source={require("../../assets/google-icon.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>
          Already have an account ?{" "}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.PADDING_HORIZONTAL,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: FONTS.TITLE,
  terms: FONTS.TERMS,
  termsHighlight: FONTS.TERMS_HIGHLIGHT,
  input: commonInputStyle,
  signupButton: {
    ...commonInputStyle,
    height: '9%',
    backgroundColor: COLORS.PRIMARY,
    borderColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  googleButton: {
    height: '9%',
    width:'40%',
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
    width: 30,
    height: 30,
    marginRight: -10,
  },
  googleText: {
    color: "black",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 18,
  },
  signInText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    textAlign: "center",
  },
  signInLink: {
    color: "#EE272E",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Registration;