import React, { useState, useEffect,useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const API_URL = 'http://13.200.75.208:4001/v1/users';

const update= "http://13.200.75.208:4001/v1/users/update_customer_details"

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const user = useSelector(state=>state.login?.user)
  const bearerToken = user?.authTokens

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/getUser`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const userData = response.data.data;
      console.log('get data in profile', userData);

      setName((prevName) => userData.customer_name || prevName);
      setEmail((prevEmail) => userData.email || prevEmail);
      setPhoneNumber((prevPhoneNumber) => userData.mobile_number || prevPhoneNumber);
    } catch (error) {
      console.error('Error fetching user data of Customer:', error);
    } finally {
      setLoading(false);
    }
  }, [bearerToken]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const toggleModal = useCallback(() => {
    console.log('Toggling modal');
    setModalVisible((prev) => !prev);
  }, []);

  const handleSaveProfile = async () => {
    try {
      const updatedProfileData = {
        customer_name: name,
        email: email,
        // mobile_number: phoneNumber,
      };

      const response = await axios.put(`${update}/updateProfile`, updatedProfileData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.status === 200) {
        setName((prevName) => response.data.customer_name|| prevName);
        setEmail((prevEmail) => response.data.email || prevEmail);
        // setPhoneNumber((prevPhoneNumber) => response.data.mobile_number || prevPhoneNumber);

        toggleModal();
      } else {
        console.error('Error updating profile:', response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('Delete account here');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
       translucent={true}
       barStyle="dark-content"
       backgroundColor="transparent"
        />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuIcon}
        >
          <Image source={require('../../../assets/Close.png')} style={styles.menu}/>
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      <View style={styles.bottomSheetContainer}>
        <View style={styles.userInfoContainer}>
          <Image source={require('../../../assets/profileimg.png')} style={styles.userImage} />
          <View style={{ width: 167, height: 71, left: 60, }}>
            <Text style={styles.userName}>{name}</Text>
            <View style={{flexDirection:'row',top:10}}>
              <Ionicons name="star" size={20} color="#EE272E" />
              <Text>4.5(Review:12345)</Text>
            </View>
            <Text style={{top:10}}>Vehicle No: 1234567890</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText} onPress={toggleModal}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={{top:40}}>
          <Text style={styles.basicInfoText}>Basic Information</Text>
          <View style={styles.inputContainer}>
            <View style={styles.rowContainer}>
              <Image source={require('../../../assets/ic_round-mail.png')} style={styles.icon} />
              <Text style={styles.inputLabel}>Email</Text>
            </View>
            <TextInput
              value={email}
              editable={false}
              underlineColorAndroid="transparent"
              style={{ ...styles.input, borderBottomWidth: 1, borderBottomColor: '#BFBFBF', borderWidth: 0,marginLeft:25 }}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.rowContainer}>
              <Image source={require('../../../assets/fluent_call-24-filled.png')} style={styles.icon} />
              <Text style={styles.inputLabel}>Phone Number</Text>
            </View>
            <TextInput
              value={phoneNumber}
              editable={false}
              underlineColorAndroid="transparent"
              style={{ ...styles.input, borderBottomWidth: 1, borderBottomColor: '#BFBFBF', borderWidth: 0,marginLeft:20 }}
            />
          </View>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={{alignItems:'center',textAlign:'center',padding:20,fontSize:16,color:'green',fontWeight:'700'}}>Update the Profile</Text>
          {/* Add input fields for editing profile information */}
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            style={styles.input}
          />
          {/* <TextInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="Phone Number"
            style={styles.input}
          /> */}

          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE272E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  profileText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 40, // Adjusted margin to center text
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 15,
  },
  userName: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700"

  },
  userImage: {
    width: 108,
    height: 108,
    borderRadius: 25,
    left: 30,
    top: 20
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  editProfileButton: {
    backgroundColor: '#EE272E',
    width: 74,
    height: 32,
    left: 172,
    top: 2,
    borderRadius: 6,
  },
  editProfileButtonText: {
    color: 'white',
    padding: 2,
    ...Platform.select({
      android: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
      ios: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
      default: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
    }),
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  basicInfoText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#EE272E',
  },
 
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#BFBFBF',
    fontWeight:"700",
  },
  input: {
    height: 30,
    borderColor: '#BFBFBF',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: '#000000',
    fontWeight:"700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding:20
  },
  modalText:{
padding:20
  },
  saveButton: {
    backgroundColor: '#EE272E',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    width:"100%"
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteAccountButton: {
    backgroundColor: '#EE272E',
    width: '100%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', // Adjusted to move the button to the bottom
  },
  deleteAccountButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  menu: {
    position: 'absolute',
    padding: 6,
    borderRadius: 40,
    backgroundColor: '#EE272E',
    zIndex: 1,
    alignItems: 'center',
    height:40,
    width:40
  },
});

export default Profile;
