// BottomBar.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BottomBar = ({ status, location, driverName, onEmergencyPress }) => {
    const navigation = useNavigation();
    const handleEmergencyPress = () => {
        navigation.navigate('Emergency', {
          // Pass any data you need to the Emergency screen
          // For example, you might want to pass the ambulance location
          ambulanceLocation: location,
        });
      };
    return (
        <View style={{ margin: 10, borderRadius: 10, overflow: 'hidden' }}>
            <View style={{ padding: 20, backgroundColor: '#e0e0e0' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'green' }}>Ambulance Status: {status}</Text>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Ambulance Location: {location}</Text>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Driver Name: {driverName}</Text>
            </View>
            <TouchableOpacity
                onPress={handleEmergencyPress}
                style={{
                    backgroundColor: 'red',
                    padding: 15,
                    alignItems: 'center',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 10,
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Emergency</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomBar;
