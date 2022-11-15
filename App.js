import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { theme } from './src/utils/theme'
import RootNavigator from './src/navigation/RootNavigator'
import { AppContextProvider } from './src/context/AppContext'



export default function App() {
  return (
    <AppContextProvider>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <RootNavigator />
    </AppContextProvider>
  )
}