import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid, StatusBar, Button, Pressable, TouchableHighlight } from 'react-native'
import React, { useState, useRef } from 'react'
import WebView from 'react-native-webview'
import { theme } from '../utils/theme'
import { OrientationLocker, PORTRAIT, LANDSCAPE } from 'react-native-orientation-locker';

export default function Player({ url }) {
    const [loading, setLoading] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const [resizeMode, setResizeMode] = useState("contain")
    const webview = useRef()



    const injected = `
    alert=''
    confirm=()=>false
    window.onbeforeunload=function(){}
    
    document.querySelector(".jw-spacer").innerHTML='<div id="r-btn" style="display:flex; justify-content:end;margin:10px"><button style="padding:5px">Resize</button></div>'
    document.querySelector("#r-btn").addEventListener("click",function(){
        let fs=document.webkitIsFullScreen
        window.ReactNativeWebView.postMessage(JSON.stringify({isFullScreen:fs,clicked:true})) 
      })
    document.addEventListener("fullscreenchange", function (e) {
         let fs=document.webkitIsFullScreen
         alert=''
         confirm=()=>false
         window.onbeforeunload=function(){}
         window.ReactNativeWebView.postMessage(JSON.stringify({isFullScreen:fs,clicked:false})) 
        });`



    const resizeVideo = () => {
        switch (resizeMode) {
            case "contain":
                setResizeMode("contain")
                contain()
                break;
            case "fill":
                setResizeMode("fill")
                fill()
                break;
            case "cover":
                setResizeMode("cover")
                cover()
                break;
            default:
                break;
        }
    }
    const handleClick = () => {
        switch (resizeMode) {
            case "contain":
                setResizeMode("fill")
                fill()
                break;
            case "fill":
                setResizeMode("cover")
                cover()
                break;
            case "cover":
                setResizeMode("contain")
                contain()
                break;
            default:
                break;
        }
    }

    const fill = () => {
        webview.current.injectJavaScript(`
        document.querySelector("video").style.objectFit="fill"
        `)
    }
    const contain = () => {
        webview.current.injectJavaScript(`
        document.querySelector("video").style.objectFit="contain"
        `)
    }
    const cover = () => {
        webview.current.injectJavaScript(`
        document.querySelector("video").style.objectFit="cover"
        `)
    }



    return (
        <>
            <StatusBar hidden={fullScreen} />
            {loading && (<View style={[styles.webview, { justifyContent: "center", backgroundColor: "black", alignItems: "center", position: "absolute", top: 0, width: "100%", zIndex: 2 }]}>
                <ActivityIndicator size={35} color={theme.colors.textColor} />
            </View>)}
            <View style={styles.webview}>
                <OrientationLocker
                    orientation={fullScreen ? LANDSCAPE : PORTRAIT}
                />
                <WebView
                    ref={webview}
                    injectedJavaScript={injected}
                    onMessage={(d) => {
                        const e = JSON.parse(d.nativeEvent.data)
                        setFullScreen(e.isFullScreen)
                        resizeVideo()
                        if (e.clicked) {
                            handleClick()
                        }
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
                    setBuiltInZoomControls={false}
                    onShouldStartLoadWithRequest={(req) => {

                        if (req.url.includes("gdriveplayer")) {
                            return true
                        }
                        if (req.url.includes("membed")) {
                            return true
                        }
                        if (req.url.includes("vidsrc.me")) {
                            return true
                        }
                        console.log("blocked", req.url);

                        ToastAndroid.show("Bloacked Ad", ToastAndroid.SHORT)
                        return false
                    }
                    }

                    onLoadEnd={(e) => {
                        console.log("load ended");
                        setLoading(false)
                    }}
                    onLoadProgress={(e) => {
                        // console.log(e.nativeEvent.url);
                    }}

                    source={{ uri: url }}
                />
            </View>
            {/* <TouchableHighlight onPress={handleClick} style={styles.resizeBtn}>
                <Text style={styles.resizeText}>Resize video ( {resizeMode} )</Text>
            </TouchableHighlight> */}
        </>
    )
}
const styles = StyleSheet.create({
    webview: {
        aspectRatio: 16 / 9,
    },
    controls: {
        backgroundColor: "rgba(0,0,0,0.2)",
        position: "absolute",
        top: 0,
        width: "100%",
        height: 50,
        zIndex: 10
    },
    resizeBtn: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        alignItems: "center",
        elevation: 5
    },
    resizeText: {
        color: theme.colors.textColor
    }
})