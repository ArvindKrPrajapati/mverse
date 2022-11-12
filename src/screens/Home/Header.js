import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { theme } from '../../utils/theme';
import Logo from "../../../assets/logo.png"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ isTv }) {
    const { navigate, push } = useNavigation()
    return (
        <Appbar.Header style={styles.header}>
            <Image
                source={Logo}
                resizeMode="contain"
                style={styles.logo} />
            <View style={styles.btns}>
                <TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { navigate("Web") }} style={styles.btn}>
                    <Icon name='earth-outline' size={20} color={theme.colors.textColor} />
                </TouchableHighlight>
                {
                    isTv ?
                        (<TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { push("Home", { isTv: !isTv }) }} style={styles.btn}>
                            <Icon name='md-film-outline' size={20} color={theme.colors.textColor} />
                        </TouchableHighlight>) : (<TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { push("Home", { isTv: !isTv }) }} style={styles.btn}>
                            <Icon name='md-tv-outline' size={20} color={theme.colors.textColor} />
                        </TouchableHighlight>)
                }
                <TouchableHighlight onPress={() => { navigate("Search", { isTv }) }} underlayColor={theme.colors.secondary} style={styles.btn}>
                    <Icon name='search' size={20} color={theme.colors.textColor} />
                </TouchableHighlight>

            </View>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    logo: {
        height: 35,
        width: 110
    },
    btns: {
        flexDirection: "row"
    },
    btn: {
        padding: 10,
        // backgroundColor: "red",
        borderRadius: 100
    }
})