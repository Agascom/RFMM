import React from 'react';
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Newsreader_400Regular,
  Newsreader_700Bold,
  Newsreader_400Regular_Italic
} from '@expo-google-fonts/newsreader';
import AppNavigator from './src/navigation/AppNavigator';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_700Bold,
    Newsreader_400Regular,
    Newsreader_700Bold,
    Newsreader_400Regular_Italic
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#221f10' }}>
        <ActivityIndicator color="#f2d00d" size="large" />
      </View>
    );
  }

  return <AppNavigator />;
}
