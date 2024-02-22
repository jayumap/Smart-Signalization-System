import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import GameStore from './screens/gameStore';

// const Tab = createBottomTabNavigator();
// GoogleSignin.configure({
//   webClientId: '686269354523-anlgu753btkia3jot1uuf51k4daiq3i1.apps.googleusercontent.com', 
// });

export default function App() {
  return (
    <AppNavigation />
  );
}