import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [region, setRegion] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
  };

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

  useEffect(() => {
    // Fetch the user's current location
    fetchLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* Example Marker */}
        {/* <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Example Marker"
          description="This is an example marker"
        /> */}
      </MapView>

      <View style={{ position: 'absolute', top: 20, right: 20 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            padding: 10,
            backgroundColor: 'red',
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
