import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCLwuB9Cl9UX1CQLziyNI0xCWy0D7l0Qzw';

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
    {/* Source Autocomplete */}
    <View style={{ marginBottom: 16 }}>
      <GooglePlacesAutocomplete
        placeholder="Enter source location"
        onPress={(data, details = null) => {
          setSource(details?.geometry?.location);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        fetchDetails
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </View>
    {/* Destination Autocomplete */}
    <View style={{ marginBottom: 16, marginTop: 30 }}>
      <GooglePlacesAutocomplete
        placeholder="Enter destination location"
        onPress={(data, details = null) => {
          setDestination(details?.geometry?.location);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        fetchDetails
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </View>
    {/* Search Button */}
    <TouchableOpacity
      style={[styles.searchButton, { marginTop: 60 }]} // Adjusted marginTop
      onPress={() => {
        // TODO: Implement fetching route using source and destination
      }}
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
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Ambulance"
              description="Ambulance Current Location"
            />
          )}

          {/* MapViewDirections component for showing route */}
          {source && destination && (
            <MapViewDirections
              origin={source}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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