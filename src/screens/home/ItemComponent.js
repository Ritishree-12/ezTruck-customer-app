// ItemComponent.js
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,

  Modal,

} from "react-native";
const ItemComponent = ({ item, onCardSelect, backgroundColor, textColor, distance, duration }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const calculateTotalPrice = (distanceInKm, truckType) => {
    console.log(distanceInKm)
    let baseCostPerKm, baseCostPerKm2;
    switch (truckType) {
      case 'dalaauto':
        baseCostPerKm = 18;
        baseCostPerKm2 = 19;
        break;
      case 'tataace':
        baseCostPerKm = 22;
        baseCostPerKm2 = 23;
        break;
      case 'small_pickup':
        baseCostPerKm = 28;
        baseCostPerKm2 = 29;
        break;
      case 'large_pickup':
        baseCostPerKm = 30;
        baseCostPerKm2 = 31;
        break;
      case 'eicher':
        baseCostPerKm = 41;
        baseCostPerKm2 = 42;
        break;
      
      default:
        throw new Error('Invalid truck type');
    }
    console.log(distanceInKm)
    const totalCost = distanceInKm <= 30 ? baseCostPerKm * distanceInKm : baseCostPerKm2 * distanceInKm;
    console.log(totalCost)
    // Calculate the commission (15%)
    const commissionAmount = (totalCost * 15) / 100;
    const costAfterCommission = totalCost + commissionAmount;
    // Calculate the GST (5%)
    const gstAmount = (costAfterCommission * 5) / 100;
    const costAfterGst = costAfterCommission + gstAmount;
    // Calculate the TDS (2%)
    const tdsAmount = (costAfterGst * 2) / 100;
    const finalPrice = costAfterGst + tdsAmount;
    console.log(finalPrice , 'final')
    return "₹" + (finalPrice.toFixed(2));
    // return finalPrice;
    
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => { setModalVisible(true); onCardSelect(item) }}
        style={[styles.item, { backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>{item.truck_type}</Text>
          <Text style={[styles.details,{ color: textColor }]}>{item.imgDetails}</Text>
          <Text style={[styles.details,{ color: textColor }]}>{item.capacity}</Text>
          <Text style={[styles.details,{ color: textColor }]}>{item.weitage}</Text>
        </View>
        <Text style={[styles.price, { color: textColor }]}>
        {calculateTotalPrice(parseInt(distance.replace(/,/g, ''), 10), item.truck_type)}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      // animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButtonModal}
              onPress={() => setModalVisible(false)}
            >
              <Icon
                type="material-community"
                name="window-close"
                // color={colors.grey1}
                fontSize={26} />
            </TouchableOpacity>

            <View>
              <Image source={item.image} style={{width:160,height:100,marginTop:10}}/>
              </View>
            <Text style={styles.modalText}>{item.weitage}</Text>
            <Text style={{ textAlign: "center", fontSize: 13, fontWeight: '600', color: "gray", padding: 5 }}>
              {item.itemDetails}
            </Text>
            <View style={styles.dashedLine}></View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>Total Amount</Text>

              <Text style={[styles.totalAmount]}>
              {calculateTotalPrice(parseInt(distance.replace(/,/g, ''), 10), item.truck_type)}
              </Text>
              <Text>Total Estimated fare price including taxes</Text>

            </View>
            <View style={[styles.farelist]}>
              <View>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailLabel}>Duration:</Text>
                {/* <Text style={styles.detailLabel}>Total Estimate:</Text> */}
              </View>

              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={styles.detailValue}>{distance}</Text>
                <Text style={styles.detailValue}>{duration}</Text>
                {/* <Text style={styles.detailValue}>₹{''}</Text> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                marginTop: 30,
                width:'100%',
                padding:20
              }}
            >
              <Image source={require("../../../assets/groupimg.png")} style={{width:130,height:60}} />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.closeButton}>Got It</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EE272E'
  },
  image: {
    width: 80,
    height: 50,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    height: '80%',
    // padding:10
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#EE272E",
    textAlign: "center",
  },
  closeButton: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#EE272E",
    paddingHorizontal:40,
    borderRadius: 40,
    paddingVertical: 10,
  },
  closeButtonModal: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "dashed",
    marginVertical: 10,
    width: "100%", // Adjust the width as needed
  },
  farelist: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 30,
  },
  detailLabel: {
    color: 'gray',
    fontSize: 16,
    marginRight: 60,
  },
  detailValue: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 40,
  },
  totalAmount: {
    color: "#EE272E",
    fontWeight: "bold",
    textAlign: 'center',
    margin: 10,
    fontSize: 23
  },
});

export default ItemComponent;