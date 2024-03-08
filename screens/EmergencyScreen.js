import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchDirections } from '../navigation/fetchDirections';

const EmergencyScreen = () => {
  const route = useRoute();
  const { ambulanceLocation } = route.params || {};
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState(null);
  const [directions, setDirections] = useState(null);

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

  const handleSearch = async () => {
    if (source && destination) {
      try {
        const result = await fetchDirections(source, destination);

        if (result) {
          setDirections(result.routes[0].overview_polyline.points);
        }
      } catch (error) {
        console.error('Error fetching directions:', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Input Fields for Source and Destination */}
      <View style={{ padding: 16 }}>
        <Text>Source:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter source location"
          value={source}
          onChangeText={setSource}
        />
        <Text>Destination:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination location"
          value={destination}
          onChangeText={setDestination}
        />
        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
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
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              title="Ambulance"
              description="Ambulance Current Location"
            />
          )}

          {/* Display directions if available */}
          {directions && (
            <Polyline
              coordinates={decodePolyline(directions)} // Decode the polyline points
              strokeColor="blue"
              strokeWidth={4}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

// Function to decode the polyline points
const decodePolyline = (encoded) => {
  const poly = [];
  let index = 0;
  let lat = 0;
  let lon = 0;

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0b111111) << shift;
      shift += 6;
    } while (b >= 0b100000);

    lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0b111111) << shift;
      shift += 6;
    } while (b >= 0b100000);

    lon += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    poly.push({ latitude: lat / 1e5, longitude: lon / 1e5 });
  }
  return poly;
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
