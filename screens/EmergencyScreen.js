// EmergencyScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EmergencyScreen = () => {
  const route = useRoute();
  const { ambulanceLocation } = route.params;

  return (
    <View>
      <Text>Emergency Screen</Text>
      <Text>Ambulance Location: {}</Text>
    </View>
  );
};

export default EmergencyScreen;
