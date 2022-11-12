import { View, Text, Pressable, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native'
import React from 'react'
import { imageUrl } from '../utils/constants'
import { theme } from '../utils/theme'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get("window")

export default function BigBanner({ item, isTv, details }) {
    const { push } = useNavigation()

    const handleClick = () => {
        if (!details) {
            push("Details", { data: item, title: item.title || item.name, isTv })
        }
    }
    return (
        <Pressable style={styles.main} onPress={handleClick}>
            <ImageBackground
                blurRadius={3}
                source={{ uri: imageUrl + "w300" + item.backdrop_path }}
                style={[styles.container]}
                resizeMode="cover"
            >
                <Image style={styles.img}
                    source={{ uri: imageUrl + "w300" + item.poster_path }}
                />
                <View style={{ alignSelf: "flex-end", padding: 15, flex: 1 }}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{item.title || item.name}</Text>
                    <Text style={{ color: "white" }}>Rating : {item.vote_average} / 10</Text>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main: {
        borderRadius: 8,
        overflow: "hidden",
        margin: 14,
        backgroundColor: theme.colors.primary
    },
    container: {
        height: 200,
        width: width - 28,
        padding: 15,
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
    },
    img: {
        width: 120,
        height: 160,
        borderRadius: 13
    }
})