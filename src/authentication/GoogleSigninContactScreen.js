import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import firebaseInstance from "../Services/firebase";
import { COLORS, SPACING } from "./style";
import {registerSuccess} from '../utils/loginReducer';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const GoogleSigninContactScreen = ({route,navigation}) => {
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState("");

  console.log("data", route.params?.customer_name, route.params?.email)
  const customer_name = route.params?.customer_name;
  const email = route.params?.email;

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(value)) {
      setMobileNumberError("");
      return true;
    } else {
      setMobileNumberError("Please enter a valid 10-digit mobile number");
      return false;
    }
  };

  const handleLogin = async () => {

    setMobileNumber("")
      if (validatePhoneNumber(mobileNumber)) {
        try {
          await firebaseInstance.messaging.requestPermission();
          const device_token = await firebaseInstance.messaging.getToken();          
          const customerData = {
          mobile_number: `+91${mobileNumber}`,
          device_token: device_token,
          customer_name: customer_name,
          email: email,
          device_type: Platform.OS === "android" ? 1 : 2
        };

        console.log("CUSTOMER DATA : ", customerData)
        const response = await axios.post(
          'http://13.200.75.208:4001/v1/users/google_SignIn',
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
            const url = `https://control.msg91.com/api/v5/otp?template_id=646b0553d6fc0550857a9702&mobile=91${mobileNumber}`;
            try {
              const otpResponse = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authkey: "395607ATzxdWwee644b4b4bP1", // replace with your Msg91 key
                },
              });
              if (otpResponse.ok) {
                navigation.navigate("OtpScreen", { phoneNumber: mobileNumber }, { authTokens: response?.data?.authTokens });
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

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#fff' barStyle="dark-content" />
      <Text style={styles.title}>Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => {
            setMobileNumber(text);
            setMobileNumberError("");
          }}
      />
      {mobileNumberError ? <Text style={styles.errorText}>{mobileNumberError}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Send Otp</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    color: "#EE272E",
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  input: {
    height: 60,
    marginVertical: SPACING.MARGIN_VERTICAL,
    borderWidth: 1,
    paddingHorizontal: SPACING.PADDING_HORIZONTAL,
    borderRadius: 30,
    borderColor: COLORS.BORDER,
    color: COLORS.TEXT,
    marginTop:20
  },
  loginButton: {
    height: 55,
    marginVertical: 8,
    borderRadius: 30,
    backgroundColor: "#EE272E",
    alignItems: "center",
    justifyContent: "center",
    color: '#fff',
    marginTop:20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginHorizontal:20,
  },
});

export default GoogleSigninContactScreen;
