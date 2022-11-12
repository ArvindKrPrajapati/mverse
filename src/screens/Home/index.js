import { View, Text, TouchableHighlight, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Header from './Header'
import { _getPopular, _getTopRated, _getHindiMovies, _discoverMore, _getPopularTv, _getTopRatedTv, _getHindiTv, _discoverMoreTv } from "../../utils/api.service"
import Loader from '../../components/Loader'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import BigBanner from '../../components/BigBanner'
import Cateogory from '../../components/Cateogory'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../../utils/theme'

export default function Home({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [res, setRes] = useState({})
    const [discoverLoading, setDiscoverLoading] = useState(false)
    const [isTv, setIsTv] = useState(route.params?.isTv)

    const _init = async () => {
        try {
            var popularRes;
            var topRatetRes;
            var hindiRes;
            if (isTv) {
                popularRes = await _getPopularTv(1)
                topRatetRes = await _getTopRatedTv(1)
                hindiRes = await _getHindiTv(1)
            } else {
                popularRes = await _getPopular(1)
                topRatetRes = await _getTopRated(1)
                hindiRes = await _getHindiMovies(1)
            }


            const carousel = popularRes.results.slice(0, 5)
            const popular = popularRes.results.slice(5, 12)
            const top = topRatetRes.results.slice(0, 7)
            const hindi = hindiRes.results.slice(0, 7)


            setData({ carousel, popular, top, hindi })
            setRes({ popular: popularRes, top: topRatetRes, hindi: hindiRes })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        _init()
    }, [])

    const discoverMore = async () => {
        setDiscoverLoading(true)
        try {
            var res;
            if (isTv) {
                res = await _discoverMoreTv(1)
            } else {
                res = await _discoverMore(1)
            }
            setDiscoverLoading(false)
            navigation.navigate("SeeMore", { title: isTv ? "Discover Series" : "Discover Movies", data: res, isTv })
        } catch (error) {
            setDiscoverLoading(false)
            console.log(error);
        }
    }

    return (
        <>
            <Header isTv={isTv} />
            <Container>
                {loading && <Loader />}
                {
                    loading || (
                        <>
                            <View>
                                <SwiperFlatList
                                    autoplay
                                    autoplayDelay={3}
                                    autoplayLoop
                                    autoplayLoopKeepAnimation
                                    showPagination
                                    data={data.carousel}
                                    paginationDefaultColor="#eee"
                                    paginationStyleItem={{ height: 6, width: 6, margin: -5, marginLeft: -3 }}
                                    paginationStyleItemActive={{ width: 40, height: 6 }}
                                    renderItem={({ item }) => (<BigBanner item={item} isTv={isTv} details={false} />)}
                                />
                            </View>
                            <Cateogory
                                title={isTv ? "Popular Series" : "Popular Movies"}
                                data={data.popular}
                                seemoreData={res.popular}
                                isTv={isTv}
                            />
                            <Cateogory
                                title={isTv ? "Top Rated Series" : "Top Rated Movies"}
                                data={data.top}
                                seemoreData={res.top}
                                isTv={isTv}
                            />
                            <Cateogory
                                title={isTv ? "Hindi Series" : "Hindi Movies"}
                                data={data.hindi}
                                seemoreData={res.hindi}
                                isTv={isTv}
                            />
                            {
                                discoverLoading ?
                                    (
                                        <ActivityIndicator style={styles.discoverBtn} size={20} color={theme.colors.textColor} />
                                    )
                                    :
                                    (<TouchableOpacity onPress={discoverMore} underlayColor={theme.colors.primary}>
                                        <View style={styles.discoverBtn}>
                                            <Text style={styles.discoverMoreText}>Discover More</Text>
                                            <Icon name='chevron-down' color={theme.colors.textColor} size={25} />
                                        </View>
                                    </TouchableOpacity>)
                            }
                        </>
                    )
                }
            </Container>
        </>
    )
}
const styles = StyleSheet.create({
    discoverBtn: {
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    discoverMoreText: {
        color: theme.colors.textColor,
        fontWeight: "600",
        fontSize: 16
    }
})