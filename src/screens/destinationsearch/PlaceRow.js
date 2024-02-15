import React from "react";
import { View, Text ,StyleSheet} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
const PlaceRow = ({ data }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {data.description === 'Home'
          ? <Entypo name='home' siz={20} color={'white'} />
          : <Entypo name='location-pin' siz={20} color={'white'} />
        }
      </View>
      <Text style={styles.locationText}>{data.description || data.vicinity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#green',
    marginVertical: 5,
    marginLeft: 20,
    borderColor:'red',
    borderRadius:2
  },

  separator: {
    backgroundColor: '#efefef',
    height: 1,
  },
  listView: {
    position: 'absolute',
      top: 105,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {

  },

  circle: {
    width: 20,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 20,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: '#c4c4c4',
    position: 'absolute',
    top: 28,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 80,
    left: 15,
  },
});

export default PlaceRow;
