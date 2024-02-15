import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
const ChangeLanguage = () => {
  const [language, setLanguage] = useState('English');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Choose Language</Text>
        <Pressable style={styles.Btn1} onPress={() => setLanguage('English')}>
        <RadioButton value="English" status={language === 'English' ? 'checked' : 'unchecked'} onPress={() => setLanguage('English')} color="#EE272E" />
          <Text style={styles.buttonText}>English</Text>
        </Pressable>
        <Pressable style={styles.Btn1} onPress={() => setLanguage('Hindi')}>
          <RadioButton value="Hindi" status={language === 'Hindi' ? 'checked' : 'unchecked'} onPress={() => setLanguage('Hindi')} color="#EE272E" />
          <Text style={styles.buttonText}>Hindi</Text>
        </Pressable>
        <Pressable style={styles.Btn1} onPress={() => setLanguage('Odia')}>
          <RadioButton value="Odia" status={language === 'Odia' ? 'checked' : 'unchecked'} onPress={() => setLanguage('Odia')} color="#EE272E" />
          <Text style={styles.buttonText}>Odia</Text>
        </Pressable>
        <Pressable style={styles.Btn1} onPress={() => setLanguage('Telugu')}>
          <RadioButton value="Telugu" status={language === 'Telugu' ? 'checked' : 'unchecked'} onPress={() => setLanguage('Telugu')} color="#EE272E" />
          <Text style={styles.buttonText}>Telugu</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.submitbtn} onPress={() => {
          // navigation.navigate('Payment')
        }}>
          <Text style={styles.submitbtnText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default ChangeLanguage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EE272E',
    margin: 10,
    textAlign: 'center',
  },
  Btn1: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    borderColor: '#EE272E',
    marginBottom: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: 10,
  },
  buttonText: {
    color: '#5A5A5A',
    textAlign: 'center',
    fontSize: 16,
    alignItems:'center'
    // left: 20,
  },
  submitbtn: {
    backgroundColor: '#EE272E',
    padding: 18,
    margin: 10,
    borderRadius: 30,
  },
  submitbtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  radio:{
    marginLeft:50,
    color:"#EE272E"
  }
});