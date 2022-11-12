import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { theme } from './src/utils/theme'
import RootNavigator from './src/navigation/RootNavigator'
import SplashScreen from 'react-native-splash-screen'



export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <RootNavigator />
    </>
  )
}