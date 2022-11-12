import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/theme'
import Blink from './Blink'

const { width } = Dimensions.get("window")

const Loader = () => {
    return (
        <View style={styles.container}>
            <Blink duration={400}>
                <View style={styles.bigBanner} />

                <View style={styles.text}></View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.banner} />
                    <View style={styles.banner} />
                    <View style={styles.banner} />

                </View>
                <View style={styles.text}></View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.banner} />
                    <View style={styles.banner} />
                    <View style={styles.banner} />

                </View>
            </Blink>

        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    bigBanner: {
        height: 200,
        width: "100%",
        borderRadius: 8,
        backgroundColor: theme.colors.primary
    },
    text: {
        width: 150,
        height: 25,
        backgroundColor: theme.colors.primary,
        marginVertical: 10
    },
    banner: {
        height: 170,
        width: (width / 3) - 18,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 5,
        borderRadius: 5
    }
})