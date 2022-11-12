import { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native'
import React from 'react'
import { imageUrl } from '../utils/constants'
import { theme } from '../utils/theme'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get("window")
export default function Banner({ item, isTv }) {
    const { push } = useNavigation()
    return (
        <TouchableHighlight underlayColor={theme.colors.primary} onPress={() => { push("Details", { data: item, title: item.title || item.name, isTv }) }}>
            <View style={styles.container}>
                <Image style={[styles.img]} source={{ uri: imageUrl + "w300" + item.poster_path }} />
                <Text numberOfLines={1} style={styles.title}>{item.title || item.name}</Text>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    title: {
        color: "#eee",
        marginLeft: 13,
        marginVertical: 3
    },
    container: {
        height: 190,
        width: (width / 3) - 6,
        padding: 5,
    },
    img: {
        height: 140,
        width: "100%",
        borderRadius: 8,
        resizeMode: 'contain',
        backgroundColor: theme.colors.primary,
    },
})