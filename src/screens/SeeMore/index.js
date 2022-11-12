import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner';
import { theme } from '../../utils/theme';
import { _getPopularTv, _getHindiTv, _getTopRatedTv, _discoverMoreTv, _getPopular, _getTopRated, _getSimilar, _getSimilarTv, _getHindiMovies, _getRecommendations, _getRecommendationsTv, _discoverMore } from "../../utils/api.service"

var page = 1;
export default function SeeMore({ navigation, route }) {

    const [data, setData] = useState(route.params.data.results)
    const [loadingMore, setLoadingMore] = useState(false)
    const [dataEnd, setDataEnd] = useState(false)

    const loadMore = async () => {
        if (!dataEnd) {
            if (!loadingMore) {
                page = page + 1
                setLoadingMore(true)
                try {
                    switch (route.params.title) {
                        case "Popular Movies":
                            const popular = await _getPopular(page)
                            if (popular.results.length > 0) {
                                setData([...data, ...popular.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Popular Series":
                            const pop_tv = await _getPopularTv(page)
                            if (pop_tv.results.length > 0) {
                                setData([...data, ...pop_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Top Rated Movies":
                            const top = await _getTopRated(page)
                            if (top.results.length > 0) {
                                setData([...data, ...top.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Top Rated Series":
                            const top_tv = await _getTopRatedTv(page)
                            if (top_tv.results.length > 0) {
                                setData([...data, ...top_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Hindi Movies":
                            const hindi = await _getHindiMovies(page)
                            if (hindi.results.length > 0) {
                                setData([...data, ...hindi.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Hindi Series":
                            const hindi_tv = await _getHindiTv(page)
                            if (hindi_tv.results.length > 0) {
                                setData([...data, ...hindi_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Recommendations":
                            console.log(route.params.id);
                            const reco = await _getRecommendations(route.params.id, page)
                            if (reco.results.length > 0) {
                                setData([...data, ...reco.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Similar":
                            const similar = await _getSimilar(route.params.id, page)
                            if (similar.results.length > 0) {
                                setData([...data, ...similar.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Recommendations Series":
                            const reco_tv = await _getRecommendationsTv(route.params.id, page)
                            if (reco_tv.results.length > 0) {
                                setData([...data, ...reco_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Similar Series":
                            const similar_tv = await _getSimilarTv(route.params.id, page)
                            if (similar_tv.results.length > 0) {
                                setData([...data, ...similar_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        case "Discover Series":
                            const discover_tv = await _discoverMoreTv(page)
                            if (discover_tv.results.length > 0) {
                                setData([...data, ...discover_tv.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                        default:
                            const discover = await _discoverMore(page)
                            if (discover.results.length > 0) {
                                setData([...data, ...discover.results])
                            } else {
                                setDataEnd(true)
                            }
                            setLoadingMore(false)
                            break;
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return (
        <FlatList
            onEndReachedThreshold={0.7}
            onEndReached={loadMore}
            style={{ padding: 10, backgroundColor: theme.colors.secondary }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            renderItem={({ item }) => <Banner item={item} isTv={route.params?.isTv} />}
            data={data}
            // removeClippedSubviews
            // windowSize={12}
            // initialNumToRender={4}
            ListFooterComponent={() => {
                return (
                    loadingMore ?
                        <ActivityIndicator size={25} color="#eee" style={{ alignSelf: "center", padding: 10, paddingBottom: 20 }} />
                        :
                        null
                )
            }}
        />
    )
}