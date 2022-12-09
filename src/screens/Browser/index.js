import { View, Text, StyleSheet, ActivityIndicator, BackHandler, ToastAndroid, Image, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import WebView from 'react-native-webview'
import { theme } from '../../utils/theme'
import { OrientationLocker, PORTRAIT, LANDSCAPE } from 'react-native-orientation-locker';
import RefreshLogo from '../../../assets/refresh.png'
import { videoJs } from '../../utils/videoResize';
export default function Browser({ route }) {
    const [url, setUrl] = useState(route.params.url)
    const [filter, setFilter] = useState(route.params.filter)
    const [loading, setLoading] = useState(true)
    const [canGoBack, setCanGoBack] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    const webview = useRef(null);

    const [refreshing, setRefreshing] = useState(false)
    const onAndroidBackPress = () => {
        if (webview.current && canGoBack) {
            webview.current.goBack();
            return true;
        }
        return false;
    };
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
        };
    }, [canGoBack]);



    const injected = `
        ${videoJs}
        document.addEventListener("fullscreenchange", function (e) {
             let fs=document.webkitIsFullScreen
             window.ReactNativeWebView.postMessage(JSON.stringify({isFullScreen:fs})) 
            });`




    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={fullScreen} />
            {
                loading && (
                    <View style={styles.container}>
                        <ActivityIndicator size={40} color="white" />
                    </View>
                )
            }
            {
                pageLoading && (
                    <View style={{ backgroundColor: theme.colors.primary }}>
                        <Text style={{ color: theme.colors.textColor, textAlign: "center" }}>..........loading {Math.floor(progress)} %..........</Text>
                    </View>
                )
            }
            <OrientationLocker
                orientation={fullScreen ? LANDSCAPE : PORTRAIT}
            />
            <WebView
                ref={webview}
                pullToRefreshEnabled={true}
                injectedJavaScript={injected}
                onMessage={(d) => {
                    const e = JSON.parse(d.nativeEvent.data)
                    setFullScreen(e.isFullScreen)
                }}

                onLoadProgress={(e) => {
                    setProgress(e.nativeEvent.progress * 100);
                }}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                setSupportMultipleWindows={false}
                allowsFullscreenVideo={true}

                decelerationRate='normal'
                allowsInlineMediaPlayback={true}
                sharedCookiesEnabled={true}
                mixedContentMode='always'
                startInLoadingState={true}


                onNavigationStateChange={(e) => {
                    setCanGoBack(e.canGoBack);
                    setPageLoading(e.loading)
                }}

                onShouldStartLoadWithRequest={(req) => {
                    if (filter ? req.url.includes(filter) : req.url.includes(url)) {
                        return true
                    }
                    if (req.url.includes("https://shortylinks.info")) {
                        return true
                    }
                    if (req.url.includes("https://streamtape.to")) {
                        return true
                    }
                    console.log(req.url);
                    ToastAndroid.show("Bloacked Ad", ToastAndroid.SHORT)
                    return false
                }
                }

                onLoadEnd={(e) => {
                    setLoading(false)
                    setRefreshing(false)
                }}
                onLoadStart={(e) => {
                    setPageLoading(true)
                }}
                source={{ uri: url }}
            />
            {
                fullScreen || (
                    <TouchableOpacity style={styles.refresh} onPress={() => { webview?.current.reload() }}>
                        <Image source={RefreshLogo}
                            resizeMode="contain"
                            style={styles.img}
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundColor: theme.colors.secondary,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3
    },
    refresh: {
        position: "absolute",
        width: 60,
        height: 60,
        right: 24,
        bottom: 24,
        borderRadius: 100,
        backgroundColor: theme.colors.primary,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 30,
        height: 30
    }
})