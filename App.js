import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { theme } from './src/utils/theme'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <RootNavigator />
    </>
  )
}