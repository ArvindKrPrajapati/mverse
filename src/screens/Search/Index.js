import { View, Text, StyleSheet, TouchableHighlight, FlatList, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Appbar, RadioButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../utils/theme';
import { _search, _searchTv } from '../../utils/api.service'
import { imageUrl, thumb } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window')

const Header = ({ navigation, loading, isTv, textValue, handleChange }) => (
    <Appbar.Header style={styles.header}>
        <TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { navigation.goBack(null) }} style={styles.back}>
            <Icon name='arrow-back' size={25} style={{ color: '#eee' }} />
        </TouchableHighlight>
        <TextInput
            placeholder={isTv ? 'search series' : 'search movies'}
            placeholderTextColor="silver"
            value={textValue}
            style={[styles.input, { paddingRight: loading ? 35 : 15 }]}
            onChangeText={handleChange}
            theme={{ colors: { text: "#eee" } }}
        />
        {loading && <ActivityIndicator style={styles.loader} color="silver" size={15} />}
    </Appbar.Header>
)

export default function Search({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const [isTv, setIsTv] = useState(route.params?.isTv)
    const [textValue, setTextValue] = useState('')
    const [data, setData] = useState([])

    const handleChange = async (e) => {
        setTextValue(e)
        if (!e) return

        setLoading(true)
        try {
            const res = isTv ? await _searchTv(e) : await _search(e)
            setLoading(false)
            setData(res.results);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        handleChange(textValue)
    }, [isTv])


    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => { navigation.push("Details", { data: item, title: item.title || item.name, isTv }) }} underlayColor={theme.colors.primary}>
                <View style={styles.result}>
                    <Image style={styles.img} source={item.poster_path ? { uri: imageUrl + "w300" + item.poster_path } : thumb} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: "#eee", fontSize: 16, fontWeight: "400" }}>{item.title || item.name}</Text>
                        <View style={{ flexDirection: 'row', width: width - 120 }}>
                            <Text numberOfLines={4} style={{ flex: 1, flexWrap: 'wrap', color: "silver" }}>{item.overview} </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <>
            <Header
                navigation={navigation}
                loading={loading}
                isTv={isTv}
                textValue={textValue}
                handleChange={handleChange}
            />
            <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                    <Text style={styles.radioText}>Movies</Text>
                    <RadioButton
                        value='movie'
                        color='dodgerblue'
                        uncheckedColor='#eee'
                        status={isTv ? 'unchecked' : 'checked'}
                        onPress={() => { setIsTv(false) }}
                    />
                </View>
                <View style={styles.radioBtn}>
                    <Text style={styles.radioText}>Series</Text>
                    <RadioButton
                        value='tv'
                        color='dodgerblue'
                        uncheckedColor='#eee'
                        status={isTv ? 'checked' : 'unchecked'}
                        onPress={() => { setIsTv(true) }}
                    />
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                style={{ backgroundColor: theme.colors.secondary }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        overflow: "hidden",
        paddingLeft: 5
    },
    input: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        color: "#eee"
    },
    back: {
        padding: 5,
        borderRadius: 100
    },
    radioBtn: {
        backgroundColor: theme.colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    radioText: {
        color: theme.colors.textColor
    },
    result: {
        padding: 10,
        flexDirection: "row"
    },
    img: {
        width: 80,
        height: 100,
        borderRadius: 2
    },
    loader: {
        marginHorizontal: 5
    }
})