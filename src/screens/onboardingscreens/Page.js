import React from 'react';
import { View, Text, Image } from 'react-native';

const Page = ({ backgroundColor, image, title, imageWidth, imageHeight }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor,
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
        <Image
          source={image}
          style={{ width: imageWidth, height: imageHeight}}
        />
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 16,alignItems:'center',textAlign:'center',margin:20}}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Page;
