import { View, Text } from 'react-native'
import React from 'react'
import { theme } from '../utils/theme'
import { ActivityIndicator } from 'react-native-paper'

export default function Loader() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.secondary, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={35} color={theme.colors.textColor} />
        </View>
    )
}