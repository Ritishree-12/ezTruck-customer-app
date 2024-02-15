import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content" />

      <View style={styles.contentContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/welcome.png')}
        />
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>Have a better sharing experience</Text>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, styles.activeButton]}
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={styles.buttonText1}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    // width:'100%'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'10%',
     width:'100%'
  },
  button: {
    height: 55,
    margin: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 40,
    borderColor: '#E74C3C',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    height: 55,
    margin: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 30,
    borderColor: '#E74C3C',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:30
  },

  activeButton: {
    backgroundColor: '#EE272E',
  },
  buttonText: {
    color: '#EE272E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  text1: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 26,
    color: 'black',
    width:'100%'
  },
  text2: {
    textAlign: 'center',
    fontSize: 20,
    margin: 13,
    color: 'grey',
    width:'100%'
  },
  image: {
    alignSelf: 'center',
    width: 356,
    height: 291,
  },
});
