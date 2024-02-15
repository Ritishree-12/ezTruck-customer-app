
import { useState, useRef } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import notifee, {AndroidImportance} from '@notifee/react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from '../utils/Constants'
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../utils/imagePath';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {logout} from '../utils/loginReducer';




const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const user = useSelector(state=>state.login?.user)
    const bearerToken = user?.authTokens
    
    console.log("bearerToken",bearerToken);

    const onLogout = async()=>{
        const url = "http://13.200.75.208:4001/v1/users/logout"
        try{
            const response = await axios.get(url,
                {
                    headers:{
                        Authorization: `Bearer ${bearerToken}`,
                        
                    },
                }); 
                console.log('response',response);
                if (response.data?.status === '1'){
                    console.log("Logout successful");
                    dispatch(logout())
                    navigation.navigate("Welcome")
                }else{
                    console.log("Unable to logout ");
                }

        } catch(error){
            console.error("Unable to request your process",error.message);

        }
        
    }


    
    const [locationPoints, setlocationPoints] = useState(
        {
            pickupCords: {
                latitude: 30.7046,
                longitude: 76.7179,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            droplocationCords: {
                latitude: 30.7333,
                longitude: 76.7794,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    )
    const mapRef = useRef()
    const { pickupCords, droplocationCords } = locationPoints

    const onPressLocation = () => {

        navigation.navigate("ChooseLocation")

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={{
                    fontSize: 15,
                    margin: 18,
                    fontWeight: "bold",
                }}
                
                onPress={onLogout}
                >LOGOUT</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.notifeeButton}>
                <Text style={{
                    fontSize: 15,
                    margin: 18,
                    fontWeight: "bold",
                }}
                onPress={onDisplayNotification}
                >Notification</Text>
            </TouchableOpacity> */}
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={pickupCords}>
                    <Marker coordinate={pickupCords}
                        image={imagePath.icCurloc} />
                    <Marker coordinate={droplocationCords}
                        image={imagePath.icGeenMarker} />


                    <MapViewDirections
                        origin={pickupCords}
                        destination={droplocationCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onReady={result => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 300,
                                    left: 30,
                                    top: 100
                                }
                            })
                        }}
                    />


                </MapView>
            </View>

            <View style={styles.bottomCard}>
                <Text>Where are you going today?</Text>
                <TouchableOpacity
                    style={styles.inputStyle}
                    onPress={onPressLocation}
                >

                    <Text>From Where</Text>
                </TouchableOpacity>


            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    notifeeButton: {
        position: 'absolute',
        top: 65,// Adjust the top value as needed
        right: 150, // Adjust the left value as needed
        zIndex: 1,
        fontWeight: 16,
        borderColor: 'black',
        backgroundColor: 'grey',
        


    },

    logoutButton: {
        position: 'absolute',
        top: 16, // Adjust the top value as needed
        left: 16, // Adjust the left value as needed
        zIndex: 1,
        fontWeight: 16 // Set a higher zIndex to make it appear above other components
    },
    bottomCard: {
        backgroundColor: "White",
        Width: '100%',
        padding: 30,
        borderTopRadius: 24,
        borderTopRadius: 24,
    },
    inputStyle: {

        backgroundColor: "White",
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }

})


export default Home
