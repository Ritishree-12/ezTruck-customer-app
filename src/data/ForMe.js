import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, Dimensions, Modal, TouchableWithoutFeedback, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [token, setToken] = useState('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data on component mount (GET request)
        const response = await axios.get('http://13.200.75.208:4001/v1/users/getUser', {
          headers: {
            'Authorization': `Bearer ${authTokens}`,
          },
        });
  
        const userData = response.data;
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setName(userData.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  
  }, [authTokens]); // Include authTokens in the dependency array

  const handleEditProfile = () => {
    console.log('Edit Profile button pressed');
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Implement logic to save edited profile data (UPDATE/PUT request)
    axios.put('http://13.200.75.208:4001/v1/users/getUser', {
      email: email,
      mobile_number: phoneNumber,
      customer_name: name,
      // Add other fields as needed
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Profile saved successfully');
        setEditModalVisible(false);
      })
      .catch(error => {
        console.error('Error saving profile:', error);
      });
  };

  return (

    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={[styles.menu, { top: 10, left: 10 }]}
      >
        <Ionicons name="menu" size={35} color="white" />

      </Pressable>
      <Text style={styles.profileText}>Profile</Text>

      <View style={styles.bottomSheetContainer}>
        <View style={styles.userInfoContainer}>
          <Image source={require('../../../assets/user.png')} style={styles.userImage} />
          <View>
            <Text style={styles.bottomSheetText}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={20} color="#EE272E" />
              <Text style={{ color: 'black', fontSize: 16, padding: 1 }}>4.5(Review:12345)</Text>
            </View>
            <Text style={{ color: 'black', fontSize: 16, padding: 1 }}>Vehicle No: DAH1234567</Text>
          </View>
        </View>
        {/* Edit button */}
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <Modal visible={isEditModalVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            {/* Your edit profile content goes here */}
            <Text>Edit Profile Modal</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Edit Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.basicInfoContainer}>
          <Text style={styles.basicInfoText}>Basic Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email} // Set the value from the database
              editable={false} // Make it non-editable
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              editable={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE272E',
  },
  profileText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    top: 10,
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 50
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: '90%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,

    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 15,
  },
  userImage: {
    width: 150,
    height: 130,
    borderRadius: 25,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  bottomSheetText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    // marginTop: 30,
    height: 40,
    // marginLeft: 20,
  },
  editProfileButton: {
    backgroundColor: '#EE272E',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    bottom: 30,
    marginLeft: '25%',
    position: 'relative',
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  basicInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#EE272E',
  },
  inputField: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'black',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#EE272E',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'black',
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
  },
  saveButton: {
    backgroundColor: '#EE272E',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
