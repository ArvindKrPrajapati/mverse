import { View, Text, StyleSheet, TouchableHighlight, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import { theme } from '../../utils/theme'
import Player from '../../components/Player'
import Icon from 'react-native-vector-icons/Ionicons'
import { _getEpisodes } from '../../utils/api.service'
export default function Play({ route, navigation }) {
    const [data, setData] = useState(route.params.data)
    const [url, setUrl] = useState('')
    const [seasons, setSeasons] = useState()
    const [epLoading, setEpLoading] = useState(true)
    const [episodes, setEpisodes] = useState()
    const [openModal, setOpenModal] = useState(false)


    const getSeriesDetails = async () => {
        const sno = data.season_number
        const id = route.params.id
        const ep = await _getEpisodes(id, sno)
        setEpisodes({ ...ep, imdb_id: data.imdb_id });
        setEpLoading(false)
    }

    useEffect(() => {
        setSeasons(route.params.seasons);
        let u = "http://database.gdriveplayer.us/player.php?imdb="
        if (route.params.isTv) {
            u += data.imdb_id + "&type=series&season=" + data.season_number + "&episode=" + data.episode_number
            getSeriesDetails()
        } else {
            u += data.imdb_id
        }
        setUrl(u);
    }, [])
    return (
        <>
            <Player url={url} />
            <Container style={styles.container}>
                <Text style={styles.title}>{data.title || data.name}</Text>
                {route.params.isTv && <Text style={[styles.title, { fontSize: 16 }]}>{route.params.series.title}</Text>}

                {data.tagline &&
                    <Text style={{ color: "#eee", fontSize: 16 }}>{data.tagline}</Text>
                }
                {
                    data.episode_number &&
                    <Text style={{ color: "#eee", fontSize: 16 }}>Season {data.season_number} Episode {data.episode_number}</Text>
                }
                <Text style={[styles.title, { paddingVertical: 10 }]}>Genres</Text>
                <View style={{ flexDirection: "row", paddingTop: 10, flexWrap: "wrap" }}>
                    {
                        data.genres?.map((o, i) => {
                            return (
                                <View key={i} style={{ marginBottom: 5, borderRadius: 25, padding: 15, backgroundColor: theme.colors.primary, marginRight: 5 }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }} key={i}>{o.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#eee", fontSize: 18, fontWeight: "bold" }}>{data.runtime} min</Text>
                        <Text style={{ color: "#eee" }}>Runtime</Text>
                    </View>
                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#eee", fontSize: 18, fontWeight: "bold" }}>{parseFloat(data.vote_average).toFixed(2)} / 10</Text>
                        <Text style={{ color: "#eee" }}>Rating</Text>
                    </View>
                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#eee", fontSize: 18, fontWeight: "bold" }}>{data.original_language}</Text>
                        <Text style={{ color: "#eee" }}>Language</Text>
                    </View>
                </View>

                <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: "bold", color: '#eee' }}>Overview</Text>
                <Text style={{ color: "silver", fontSize: 17 }}>{data.overview}</Text>
                {
                    route.params.isTv && (
                        <View style={styles.series}>
                            <TouchableHighlight underlayColor={theme.colors.secondary} onPress={() => { setOpenModal(true) }}>
                                <View style={styles.selectBtn}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: '#eee' }}>Select season </Text>
                                        <Text style={{ fontWeight: "500", color: '#eee' }}>( {data.season_number} )</Text>
                                    </View>
                                    <Icon name='chevron-down' color="#eee" size={20} />
                                </View>
                            </TouchableHighlight>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: '#eee' }}>Select Episode ( {episodes?.episodes?.length} )</Text>
                            {epLoading && <ActivityIndicator color={theme.colors.textColor} size={20} style={{ marginVertical: 15 }} />}
                            {
                                episodes?.episodes?.map((o, i) => (
                                    <TouchableHighlight
                                        disabled={o.episode_number == data.episode_number}
                                        onPress={() => { navigation.replace("Play", { isTv: true, data: { ...o, genres: route.params.data.genres, imdb_id: data.imdb_id }, id: route.params.id, series: { title: route.params.series.title }, seasons }) }}
                                        style={o.episode_number == data.episode_number ? [styles.selectBtn, styles.active] : styles.selectBtn} key={i}>
                                        <Text style={{ fontSize: 15, fontWeight: "500", color: o.episode_number == data.episode_number ? theme.colors.primary : "#eee" }}>Episode {o.episode_number}</Text>
                                    </TouchableHighlight>
                                ))
                            }
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={openModal}
                                onRequestClose={() => {
                                    setOpenModal(false)
                                }}
                            >

                                <Pressable onPress={() => { setOpenModal(false) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                    <View style={{ maxHeight: 300, width: "80%", backgroundColor: theme.colors.secondary, borderRadius: 5 }}>
                                        <Text style={{ color: "white", margin: 15 }}>Total Season ( {seasons?.length} )</Text>
                                        <ScrollView
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            style={{ paddingHorizontal: 15, paddingBottom: 10 }}
                                        >
                                            {
                                                seasons?.map((d, i) => {
                                                    return (
                                                        <TouchableHighlight
                                                            onPress={() => { navigation.replace("Episodes", { season: d, title: route.params.series.title, id: route.params.id, genres: route.params.data.genres, season_data: seasons }) }}
                                                            // onPress={() => { navigation.replace("Play", { isTv: true, data: { ...episodes?.episodes[0], genres: route.params.data.genres, imdb_id: data.imdb_id }, id: route.params.id, series: { title: route.params.series.title }, seasons }) }}
                                                            disabled={d.season_number == data.season_number}
                                                            style={d.season_number == data.season_number ? [styles.selectBtn, styles.active] : styles.selectBtn}
                                                            key={i}>
                                                            <Text style={{ color: d.season_number == data.season_number ? theme.colors.primary : theme.colors.textColor }}>{d.name} ( {d.episode_count} Episodes )</Text>
                                                        </TouchableHighlight>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                </Pressable>


                            </Modal>
                        </View>
                    )
                }
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        color: theme.colors.textColor,
        fontSize: 20,
        fontWeight: "bold"
    },
    series: {
        padding: 15
    },
    selectBtn: {
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        justifyContent: "space-between",
        marginVertical: 5
    },
    active: {
        backgroundColor: "wheat",
    },
})