


// TruckRow.js
import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ItemComponent from "../home/ItemComponent";

const TruckRow = (props) => {
  const { data, renderItem, selectedId, setSelectedId } = props;

  return (
    <View style={styles.bottomSheetContent}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
  },
});

export default TruckRow;
