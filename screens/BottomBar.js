import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({ status, location, driverName, onEmergencyPress }) => {
  const navigation = useNavigation();

  const handleEmergencyPress = () => {
    navigation.navigate('Emergency', {
      ambulanceLocation: location,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.statusText}>Ambulance Status: {status}</Text>
        <Text style={styles.text}>Ambulance Location: {location}</Text>
        <Text style={styles.text}>Driver Name: {driverName}</Text>
      </View>
      <TouchableOpacity onPress={handleEmergencyPress} style={styles.emergencyButton}>
        <Text style={styles.emergencyButtonText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'pink',
  },
  content: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  emergencyButton: {
    backgroundColor: '#ff4d4d', // Red color
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BottomBar;
