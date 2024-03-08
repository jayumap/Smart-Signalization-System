import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import ambulanceIcon from '../assets/images/ambulanceiconmap.png';

const HomeScreen = () => {
  const [region, setRegion] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchLocation = async () => {
    try {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await getCurrentPositionAsync({});
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

  const ambulanceStatus = 'Available';
  const ambulanceDriverName = 'John Doe';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
        provider="google" // Set the provider to "google" for Google Maps
        customMapStyle={[]}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* Example Marker */}
        {region && (
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="Ambulance"
            description="Current Location"
            image={ambulanceIcon}
          />
        )}
      </MapView>

      {/* Bottom Bar and other UI components */}
      <BottomBar
        status={ambulanceStatus}
        location={region ? `Lat: ${region.latitude}, Lon: ${region.longitude}` : 'Unknown'}
        driverName={ambulanceDriverName}
        onEmergencyPress={() => console.log('Emergency button pressed')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
