import { Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { theme } from '../utils/theme'
import { version } from '../../package.json'

const Update = () => {
    const handleClick = () => {
        Linking.openURL("https://mverse.epizy.com")
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Update Your App Now</Text>
            <Text style={{ color: "#eee" }}>you are using v{version}</Text>
            <TouchableHighlight onPress={handleClick} style={styles.btn} underlayColor="#fff">
                <Text style={{ color: "black" }}>Download</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Update

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    text: {
        color: theme.colors.textColor,
        fontSize: 24,
        fontWeight: "500"
    },
    btn: {
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
        backgroundColor: "wheat",
        borderRadius: 5
    }
})