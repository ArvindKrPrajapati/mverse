import { View, Text, StyleSheet, TouchableHighlight, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import { theme } from '../../utils/theme'
import Player from '../../components/Player'
import Icon from 'react-native-vector-icons/Ionicons'
import { _getEpisodes } from '../../utils/api.service'

const s = [
    {
        id: 1,
        name: "Gdrive Player",
        url: ""
    },
    {
        id: 2,
        name: "Vidsrc",
        url: ""
    }
]
var khatrimazaUrl = ""

export default function Play({ route, navigation }) {

    const [data, setData] = useState(route.params.data)
    const [url, setUrl] = useState('')
    const [seasons, setSeasons] = useState()
    const [epLoading, setEpLoading] = useState(true)
    const [episodes, setEpisodes] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [servers, setServers] = useState(s)
    const [refreshing, setRefreshing] = useState(false)

    const [chnangeServerModal, setChnangeServerModal] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
    }

    const getSeriesDetails = async () => {
        const sno = data.season_number
        const id = route.params.id
        const ep = await _getEpisodes(id, sno)
        setEpisodes({ ...ep, imdb_id: data.imdb_id });
        setEpLoading(false)
    }

    const handleChangeServer = (newUrl) => {
        setUrl(newUrl)
        setChnangeServerModal(false)
    }

    useEffect(() => {
        setSeasons(route.params.seasons);
        const urls = ["http://database.gdriveplayer.us/player.php?imdb=", "https://vidsrc.me/embed/"]
        if (route.params.isTv) {
            s[0].url = urls[0] + data.imdb_id + "&type=series&season=" + data.season_number + "&episode=" + data.episode_number
            s[1].url = urls[1] + data.imdb_id + "/" + data.season_number + "-" + data.episode_number
            getSeriesDetails()
            khatrimazaUrl = "https://khatrimazaful.biz/?s=" + route.params.series.title;
        } else {
            s[0].url = urls[0] + data.imdb_id
            s[1].url = urls[1] + data.imdb_id
            khatrimazaUrl = "https://khatrimazaful.biz/?s=" + data.title
        }
        setServers(s)
        setUrl(servers[0].url);
    }, [])
    return (
        <>
            <Player url={url} refreshing={refreshing} setRefreshing={setRefreshing} />
            <TouchableHighlight
                underlayColor={theme.colors.secondary}
                onPress={() => { setChnangeServerModal(true) }}
            >
                <View style={styles.changeServerBtn}>
                    <Text style={{ fontSize: 15, fontWeight: "500", color: "#eee" }}>Change Server</Text>
                    <Icon name='chevron-down' size={20} color="#eee" />
                </View>
            </TouchableHighlight>
            <Container
                style={styles.container}
                isRefreshControl={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
            >
                {/* <TouchableHighlight
                    underlayColor={theme.colors.secondary}
                    onPress={() => { setChnangeServerModal(true) }}
                >
                    <View style={styles.changeServerBtn}>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#eee" }}>Change Server</Text>
                        <Icon name='chevron-down' size={20} color="#eee" />
                    </View>
                </TouchableHighlight> */}
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
            {/* modal to change server */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={chnangeServerModal}
                onRequestClose={() => {
                    setChnangeServerModal(false)
                }}
            >

                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <Pressable style={{ height: "50%" }} onPress={() => { setChnangeServerModal(false) }} >

                    </Pressable>
                    <View style={{ padding: 20, height: "50%", borderRadius: 20, backgroundColor: theme.colors.primary }}>
                        <Text style={[styles.normalText, { marginVertical: 10 }]}>If Current server doesnt work try onother server below</Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <TouchableHighlight
                                onPress={() => {
                                    setChnangeServerModal(false)
                                    navigation.navigate("Browser", { url: khatrimazaUrl, filter: "https://khatrimazaful.biz" })
                                }}
                                style={[styles.selectBtn, { backgroundColor: theme.colors.secondary }]}>
                                <Text style={styles.bold}>Khatrimaza ( hindi might be available )</Text>
                            </TouchableHighlight>
                            {
                                servers.map((o) => (
                                    <TouchableHighlight
                                        key={o.id}
                                        onPress={() => { handleChangeServer(o.url) }}
                                        disabled={url == o.url}
                                        style={o.url == url ? [styles.selectBtn, styles.active] : [styles.selectBtn, { backgroundColor: theme.colors.secondary }]}>
                                        <Text style={o.url == url ? [styles.bold, { color: theme.colors.secondary }] : styles.bold}>{o.name}</Text>
                                    </TouchableHighlight>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>


            </Modal>
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
    normalText: {
        color: theme.colors.textColor,
    },
    bold: {
        color: theme.colors.textColor,
        fontWeight: "500",
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
    changeServerBtn: {
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        padding: 12,
        justifyContent: "space-between"
    }
})