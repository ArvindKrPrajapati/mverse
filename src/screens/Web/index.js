import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../../utils/theme'
const urls = [
    {
        id: 1,
        image: "https://s1.bunnycdn.ru/assets/sites/sflix/logo.png",
        url: "https://sflix.pro/",
        name: "Sflix"
    },
    {
        id: 2,
        image: "https://mverseapp.herokuapp.com/assets/logo.png",
        url: "https://mverseapp.herokuapp.com",
        name: "Mverse"
    },
    {
        id: 3,
        image: "https://img.hdtoday.tv/xxrz/400x400/100/c4/93/c49337aa9c92d6fbf56b6b5830c6849c/c49337aa9c92d6fbf56b6b5830c6849c.png",
        url: "https://hdtoday.tv/",
        name: "HD Today"
    },
    {
        id: 4,
        image: "https://1movieshd.com/images/group_11/theme_3/logo.png",
        url: "https://1movieshd.com/",
        name: "1movieshd"
    },
]
export default function Web({ navigation }) {
    return (
        <View style={styles.container}>
            {
                urls.map((o) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("Browser", { url: o.url }) }} style={styles.btn} key={o.id}>
                        <Image source={{ uri: o.image }}
                            resizeMode="contain"
                            style={styles.img}
                        />
                        <Text style={styles.title}>{o.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
        padding: 24,
        flexWrap: 'wrap',
        flexDirection: "row"
    },
    img: {
        width: 40,
        height: 40
    },
    title: {
        color: theme.colors.textColor,
        fontWeight: "500",
        marginVertical: 5
    },
    btn: {
        alignItems: "center",
        padding: 10
        // justifyContent: "center"
    }
})