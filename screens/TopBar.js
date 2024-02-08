// TopBar.js
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

const TopBar = ({ onEmergencyPress, onProfilePress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
      <TouchableOpacity onPress={onEmergencyPress}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress}>
        {/* Replace 'profileImageUrl' with the actual URL or source for the user's profile image */}
        <Image
          source={{ uri: 'profileImageUrl' }}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
