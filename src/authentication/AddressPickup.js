////this code is not Working



import React  from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../utils/Constants'

const AddressPickup =({
    placeholderText,
    fetchAddress

})=>{
    const onPressAddress=(data, details)=>{
        // console.log("Data", details);
        const lat= details.geometry.location.lat
        const lng= details.geometry.location.lng
        fetchAddress(lat, lng)
       
    }
    return (
        <View style= {styles.container}>
        
            {/* <TouchableOpacity onPress={() => navigation.navigate('ChooseDestination')}>  */}
                <GooglePlacesAutocomplete
                    placeholder={placeholderText}
                    onPress={onPressAddress}
                    fetchDetails={true}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    styles={{
                        textInputContainer: styles.ContainerStyle,
                        textInput: styles.textInputStyle
                    }}
                />
            {/* </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor: '#2c3e50',
    },
    ContainerStyle:{
        backgroundColor: 'white',
        

    },
    textInputStyle:{
        height: 40,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#F3F3F3'
    }
})

export default AddressPickup;