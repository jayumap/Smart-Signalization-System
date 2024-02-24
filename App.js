import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  return (
    <AppNavigation />
  );
}