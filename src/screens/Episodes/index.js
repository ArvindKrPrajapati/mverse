import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../../utils/theme'
import { _getEpisodes, _getTvImdb } from '../../utils/api.service'
import { imageUrl, thumb } from '../../utils/constants'

export default function Episodes({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const _init = async () => {

        try {
            const id = route.params.id
            const season = route.params.season.season_number
            const res = await _getEpisodes(id, season)
            const external_ids = await _getTvImdb(id)
            setLoading(false)
            setData({ ...res, imdb_id: external_ids.imdb_id });
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        _init()
    }, [])


    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { navigation.navigate("Play", { isTv: true, data: { ...item, genres: route.params.genres, imdb_id: data.imdb_id }, id: route.params.id, series: { title: route.params.title }, seasons: route.params.season_data }) }}>
                <View style={styles.episode}>
                    <Image style={{ width: 115, height: 135, borderRadius: 10 }}
                        source={item.still_path ? { uri: imageUrl + "w300" + item.still_path } : thumb}
                    />
                    <View style={{ paddingTop: 5, paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ color: "#eee", fontWeight: "bold", fontSize: 18 }}>Episode {item.episode_number}</Text>
                        <Text style={{ color: "#eee" }}>{item.name}</Text>
                        <Text style={{ color: "#eee" }}>Runtime {item.runtime} min</Text>
                        <Text style={{ color: "#eee" }}>Rating {item.vote_average.toFixed(2)} / 10</Text>
                        <Text style={{ color: "#eee" }}>Air Date - {item.air_date}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>{route.params.season.name} ({route.params.season.episode_count} Episodes)</Text>
            </View>
            {loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size={25} color={theme.colors.textColor} />
                </View>
                :
                (<FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: theme.colors.secondary }}
                    data={data?.episodes}
                    renderItem={renderItem}
                />)
            }
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: theme.colors.secondary
    },
    headerText: {
        color: theme.colors.textColor
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.secondary
    },
    episode: {
        flexDirection: "row",
        padding: 10,
        margin: 10,
        marginBottom: 0,
        backgroundColor: theme.colors.primary,
        borderRadius: 5
    }
})