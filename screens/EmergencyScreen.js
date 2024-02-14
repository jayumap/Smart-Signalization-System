import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const EmergencyScreen = () => {
  const route = useRoute();
  const { ambulanceLocation } = route.params || {};
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState(null);
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error getting location', error);
      }
    };

    // Fetch the user's current location
    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Input Fields for Source and Destination */}
      <View style={{ padding: 16 }}>
        <Text>Source:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 10, padding: 10, margin: 10 }}
          placeholder="Enter source location"
          value={source}
          onChangeText={setSource}
        />
        <Text>Destination:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 10, padding: 10, margin: 10 }}
          placeholder="Enter destination location"
          value={destination}
          onChangeText={setDestination}
        />
        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => console.log('Search button pressed')}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* MapView */}
      {region && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {/* Marker for Ambulance Location */}
          {ambulanceLocation && (
            <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }} // Update this with the actual coordinates
              title="Ambulance"
              description="Ambulance Current Location"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmergencyScreen;
