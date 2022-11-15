import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { theme } from '../../utils/theme';
import DeviceInfo from 'react-native-device-info';
import { _createUser } from '../../utils/api.service';

const { width } = Dimensions.get("window")

const data = [
    {
        id: 1,
        text: "No Annoying AD",
        image: require("../../../assets/b_img.jpg"),
        desc: "Watch any Web Series and Movies With less Ads. Entertainment become easy with Mverse without any annoying Advertisment. Watch Ad Free TV series and Series on Mveres",
        btn: false
    },
    {
        id: 2,
        text: "WATCH MOVIES",
        image: require("../../../assets/a_img.jpg"),
        desc: "Watch any movies free of cost. Entertainment become easy with Mverse without any annoying Advertisment. Watch Ad Free Movie on Mveres",
        btn: false
    },
    {
        id: 3,
        text: "WATCH SERIES",
        image: require("../../../assets/b_img.jpg"),
        desc: "Watch any Web Series free of cost. Entertainment become easy with Mverse without any annoying Advertisment. Watch Ad Free TV series on Mveres",
        btn: true
    }
]

const OnBoarding = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const handleCick = async () => {
        setLoading(true)
        const uid = await DeviceInfo.getUniqueId()
        await _createUser(uid)
        navigation.replace("Home")
        setLoading(false)

    }

    return (
        <View style={styles.container}>
            <SwiperFlatList
                autoplayLoopKeepAnimation
                showPagination
                data={data}
                paginationDefaultColor="#eee"
                paginationStyleItem={{ height: 6, width: 6, margin: -5, marginLeft: -3 }}
                paginationStyleItemActive={{ width: 40, height: 6 }}
                renderItem={({ item }) => (
                    <>
                        <ImageBackground
                            source={item.image}
                            resizeMode="cover"
                            style={styles.imageContainer}>
                            <Text>hiii</Text>
                        </ImageBackground>
                        <View style={styles.overlay}>
                            <View>
                                <Text style={styles.title}>{item.text}</Text>
                                <Text style={styles.desc}>{item.desc}</Text>
                                {
                                    (item.btn && !loading) && (<TouchableHighlight style={styles.btn} onPress={handleCick} underlayColor="#fff">
                                        <Text style={styles.btnText}>Get Started</Text>
                                    </TouchableHighlight>)
                                }
                                {
                                    (item.btn && loading) && (<View style={styles.btn}>
                                        <ActivityIndicator size={20} color="black" />
                                    </View>)
                                }
                            </View>
                        </View>
                    </>
                )}
            />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flex: 1
    },
    imageContainer: {
        width: width,
    },
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        padding: 50,
        paddingBottom: 100
    },
    title: {
        color: "wheat",
        fontWeight: "bold",
        fontSize: 23,
        textAlign: "center",
        marginVertical: 5
    },
    desc: {
        color: "#eee",
        textAlign: "center",
        fontSize: 15,
        lineHeight: 20
    },
    btn: {
        padding: 15,
        backgroundColor: "wheat",
        marginVertical: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "black",
        fontSize: 15,
        opacity: 0.6,
        fontWeight: "500"
    }
})