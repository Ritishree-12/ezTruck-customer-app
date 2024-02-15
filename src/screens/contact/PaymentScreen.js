import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, StatusBar, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMap from '../../map/HomeMap';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearBookingNotification, clearDriverArrivedNotification, clearDropOff } from '../../utils/notificationReducer';
import { useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Alert } from 'react-native';


const PaymentScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();
    console.log("route", route);
    // const bookingData = route?.params.bookingData;
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleBackHome = () => {
        dispatch(clearBookingNotification());
        dispatch(clearDriverArrivedNotification());
        dispatch(clearDropOff());
        navigation.navigate('Home');
    }

    const colors = {
        primary: '#EE272E',
        secondary: '#EE272E',
        background: '#ECF0F1',
        text: '#2C3E50',
    };

    // Function to handle selection of payment method
    const handlePaymentMethodSelection = (paymentMethod) => {
        setSelectedPaymentMethod(paymentMethod);
    }

    // Function for payment option if it's selected
    const renderSelectButton = (paymentMethod) => {
        if (selectedPaymentMethod === paymentMethod) {
            return (
                <View style={{ position: 'absolute', right: 10, top: '100%', transform: [{ translateY: -12 }] }}>
                    <Icon name="check-circle" size={24} color="green" />
                </View>
            );
        }
        return null;
    };



    return (
        <SafeAreaView style={styles.container}>
            {/* Map Container */}
            <StatusBar translucent={true} />
            <View style={{ height: Dimensions.get("window").height - 480 }}>
                <HomeMap currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image source={require('../../../assets/menuicon.png')} style={styles.menu} />
                </Pressable>
                <Pressable style={styles.profileButton}>
                    <Image source={require('../../../assets/profilemenu.png')} style={styles.roundBtn} />
                </Pressable>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheetContainer}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#EE272E' }}>Bill Details</Text>
                <View>
                    <View style={styles.section1}>
                        <View>
                            <Text>
                                dummy
                            </Text>
                            <Text>ratings </Text>
                        </View>
                        <Image
                            source={require('../../../assets/choose3.png')}
                            style={{ position: 'absolute', right: 20 }}
                        />

                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Your Bill</Text>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ fontSize: 14, fontWeight: '400' }}>Your Trip</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400' }}>
                                dummy
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: '400' }}>Promo Code</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400' }}>0</Text>
                        </View>
                        <View style={styles.dashedLine}></View>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10, color: 'black' }}>Select a payment method</Text>
                    <Pressable style={styles.Btn1} onPress={() => handlePaymentMethodSelection('wallet')}>
                        <Image source={require('../../../assets/wallet.png')} style={{ height: 28, width: 32, left: 6 }} />
                        <Text style={styles.buttonText}>Pay with wallet</Text>
                        {renderSelectButton('wallet')}
                    </Pressable>
                    <Pressable style={styles.Btn1} onPress={() => handlePaymentMethodSelection('online')}>
                        <Image source={require('../../../assets/payonline.png')} style={{ height: 28, width: 32, left: 6 }} />
                        <Text style={styles.buttonText}>Pay Online</Text>
                        {renderSelectButton('online')}
                    </Pressable>
                    <Pressable style={styles.Btn1} onPress={() => handlePaymentMethodSelection('cash')}>
                        <Image source={require('../../../assets/cash.png')} style={{ height: 28, width: 32, left: 6 }} />
                        <Text style={styles.buttonText}>Pay with Cash</Text>
                        {renderSelectButton('cash')}
                    </Pressable>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        toggleModal();
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeIconContainer} onPress={toggleModal}>
                                <Icon name="close" size={24} color="#000" />
                            </TouchableOpacity>
                            <Image source={require('../../../assets/ThankYou.png')} style={styles.modalImg} />
                            <Text style={{ alignItems: 'center', fontWeight: 'bold', color: 'black', fontSize: 22, marginBottom: 10 }}>Payment Success</Text>
                            <Text style={styles.thankYouText}>Your money has successfully sent to</Text>
                            <Text style={{ marginBottom: 10 }}>Amount</Text>
                            <Text style={{ marginBottom: 10, fontSize: 22, color: 'black' }}>₹800</Text>
                            {/* Dashed line */}
                            <View style={styles.dashedLine1}></View>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontsize: 16 }}>How is your Trip ?</Text>
                            <Text style={{ textAlign: 'center', fontWeight: '400', fontsize: 16, padding: 8 }}>Your feedback will help us to improve our driving experience</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={handleBackHome}>
                                <Text style={styles.modalButtonText}>back to home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View>
                    <Pressable
                        style={[styles.Btn2, { opacity: selectedPaymentMethod ? 1 : 0.5 }]}
                        onPress={() => {
                            // Show modal on button press only if a payment method is selected
                            if (selectedPaymentMethod) {
                                toggleModal();
                            }
                        }}
                        disabled={!selectedPaymentMethod}
                    >
                        <Text style={styles.buttonText2}>Pay</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    mapContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        position: 'absolute',
        top: 46,
        left: 10,
        right: 10,
        zIndex: 2, // Higher zIndex to overlay on top of the map
    },
    menuButton: {
        marginRight: 10,
    },
    profileButton: {
        marginLeft: 'auto', // Align to the right
    },
    menu: {
        height: 42,
        width: 41,
    },
    roundBtn: {
        height: 42,
        width: 41,
    },
    bottomSheetContainer: {
        position: 'absolute',
        // height: '60%',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    text1: {
        color: '#EE272E',
        fontSize: 18,
        fontWeight: '400',

    },
    img: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%',
        height: 60,
        width: 60,
    },
    section1: {
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: 'mistyrose',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        borderColor: '#EE272E',
        marginBottom: 6,
        height: 80
    },

    Btn0: {
        backgroundColor: 'mistyrose',
        borderWidth: 1,
        borderRadius: 10,
        padding: 24,
        borderColor: '#EE272E',
        marginBottom: 10,
        // margin: 16
    },
    Btn2: {
        backgroundColor: '#EE272E',
        borderWidth: 1,
        borderRadius: 30,
        padding: 14,
        borderColor: '#EE272E',
        // marginBottom:10,
        // margin: 16
    },
    Btn1: {
        backgroundColor: 'mistyrose',
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        borderColor: '#EE272E',
        marginBottom: 10,
        alignItems: 'flex-start',
        flexDirection: 'row',

    },
    buttonText2: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonText: {
        color: '#5A5A5A',
        textAlign: 'center',
        fontSize: 16,
        left: 20
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileDetails: {
        marginTop: 8,
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center', // Center text horizontally
    },
    profileInfo: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center', // Center text horizontally
    },
    totalEarningContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // padding: 20,
        color: '#EE272E'
    },
    totalEarningLabel: {
        fontWeight: 'bold',
        color: '#EE272E'
    },
    totalEarningValue: {
        color: 'red',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // padding: 20
    },
    buttonText1: {
        color: '#EE272E',
        textAlign: 'center',
        fontSize: 16,
    },
    section3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        padding: 20,
        color: '#EE272E'
    },
    dashedLine: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        borderStyle: 'solid',
        marginVertical: 10,
        width: "100%", // Adjust the width as needed
    },
    billDetailsContainer: {
        marginBottom: 20,
        marginTop: 10,
    },

    paymentMethodsContainer: {
        marginBottom: 20,
    },
    paymentMethodsTitle: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10,
    },
    paymentMethodButton: {
        backgroundColor: 'mistyrose',
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        borderColor: '#EE272E',
        marginBottom: 10,
        alignItems: 'center',
    },

    payButton: {
        backgroundColor: '#EE272E',
        borderWidth: 1,
        borderRadius: 30,
        padding: 14,
        borderColor: '#EE272E',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // width: Dimensions.get('window').width, // Set width to full width of the screen
        // height: Dimensions.get('window').height, // Set height to full height of the screen
    },
    modalImg: {
        height: 100,
        width: 100
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center', // Center content vertically and horizontally
        width: Dimensions.get('window').width * 0.9, // Set width to 80% of the screen width
        // height: Dimensions.get('window').height * 0.5, // Remove height to allow dynamic content
    },


    modalButton: {
        backgroundColor: '#EE272E',
        borderRadius: 25,
        paddingVertical: 10,
        width: 250,
        margin:10
    },

    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    thankYouText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    dashedLine1: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dashed',
        marginVertical: 10,
        width: '100%', // Adjust the width as needed
    },

});

export default PaymentScreen;