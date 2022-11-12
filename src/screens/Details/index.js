import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import BigBanner from '../../components/BigBanner'
import { _getMovieDetails, _getRecommendations, _getRecommendationsTv, _getSimilar, _getSimilarTv, _getTvDetails } from '../../utils/api.service'
import Cateogory from '../../components/Cateogory'
import { theme } from '../../utils/theme'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Details({ route, navigation }) {
    const [data, setData] = useState(route.params.data)
    const [isTv, setIsTv] = useState(route.params.isTv)

    const [recomendation, setRecomendation] = useState()
    const [similar, setSimilar] = useState()
    const [loading, setLoading] = useState(true)

    const _init = async () => {
        try {
            var id = route.params.data.id
            var recRes;
            var simRes;
            if (isTv) {
                let res = await _getTvDetails(id)
                setData(res)
                setLoading(false)
                recRes = await _getRecommendationsTv(id, 1)
                simRes = await _getSimilarTv(id, 1)
            } else {
                let res = await _getMovieDetails(id)
                setData(res)
                setLoading(false)
                recRes = await _getRecommendations(id, 1)
                simRes = await _getSimilar(id, 1)
            }
            setRecomendation(recRes)
            setSimilar(simRes)
        } catch (error) {
            console.log("details screen", error);
        }
    }

    useEffect(() => {
        _init()
    }, [])

    return (
        <Container style={styles.container}>
            <BigBanner
                item={data}
                isTv={isTv}
                details={true}
            />

            {isTv || (
                <TouchableHighlight underlayColor={theme.colors.secondary}
                    onPress={() => { navigation.navigate("Play", { isTv: false, data, id: data.id }) }}
                >
                    <View style={styles.playBtn}>
                        <Icon name='play' size={25} color={theme.colors.textColor} />
                        <Text style={styles.watchNowText}>watch now</Text>
                    </View>
                </TouchableHighlight>
            )}

            {isTv && (
                <View style={styles.playBtn}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.textColor }}> {data.number_of_seasons ? data.number_of_seasons : "..."}</Text>
                    <Text style={styles.watchNowText}>Seasons</Text>
                </View>

            )}
            <View style={{ padding: 24, paddingTop: 10 }}>
                <Text style={{ color: "#eee", fontSize: 22, fontWeight: "bold" }}>{data.title || data.name}</Text>
                <Text style={{ color: "silver", fontSize: 17 }}>{data.overview}</Text>
                <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: "bold", color: 'white' }}>Genres</Text>
                <View style={{ flexDirection: "row", paddingTop: 10, flexWrap: "wrap" }}>
                    {
                        data.genres?.map((o, i) => {
                            return (
                                <View key={i} style={{ marginBottom: 5, borderRadius: 25, padding: 15, backgroundColor: theme.colors.primary, marginRight: 10 }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }} key={i}>{o.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {isTv ?
                    <Text style={styles.dateText}>First Air Date : {data.first_air_date}</Text>
                    :
                    <Text style={styles.dateText}>Release Date : {data.release_date}</Text>}

            </View>

            {isTv && (
                <View style={{ paddingHorizontal: 24 }}>
                    <Text style={styles.dateText}>Seasons</Text>
                    {
                        loading
                            ?
                            <ActivityIndicator size={20} color="#eee" />
                            :
                            data.seasons?.map((o) => {
                                return (
                                    <TouchableHighlight underlayColor={theme.colors.secondary}
                                        key={o.id}
                                        onPress={() => { navigation.navigate("Episodes", { season: o, title: data.name, id: data.id, genres: data.genres, season_data: data.seasons }) }}
                                        style={styles.sBtn}
                                    >
                                        <Text style={{ color: "white" }}>{o.name} ({o.episode_count} Episodes)</Text>
                                    </TouchableHighlight>
                                )
                            })
                    }
                </View>
            )}

            {
                recomendation && (
                    <Cateogory
                        title={isTv ? "Recommendations Series" : "Recommendations"}
                        data={recomendation?.results?.slice(0, 7)}
                        seemoreData={recomendation}
                        isTv={isTv}
                        id={data.id}
                    />
                )
            }
            {
                similar && (
                    <Cateogory
                        title={isTv ? "Similar Series" : "Similar"}
                        data={similar?.results?.slice(0, 7)}
                        seemoreData={similar}
                        isTv={isTv}
                        id={data.id}
                    />
                )
            }
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {

    },
    playBtn: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 15,
        borderRadius: 8,
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    watchNowText: {
        fontSize: 16,
        color: theme.colors.textColor,
        fontWeight: "500",
        marginHorizontal: 10,
        elevation: 5
    },
    dateText: {
        color: theme.colors.textColor,
        fontSize: 18,
        fontWeight: "bold"
    },
    sBtn: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    }
})