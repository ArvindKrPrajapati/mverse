import { View, Text, TouchableHighlight, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../utils/theme'
import { CONTAINER_OUTER_SPACING } from '../utils/constants'
import Banner from './Banner'
import { useNavigation } from '@react-navigation/native'

export default function Cateogory({ title, data, seemoreData, isTv, id }) {
    const { navigate, push } = useNavigation()
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableHighlight onPress={() => { push("SeeMore", { title, data: seemoreData, isTv, id }) }} style={styles.btn} underlayColor={theme.colors.primary}>
                    <Icon name='chevron-forward' color={theme.colors.textColor} size={20} />
                </TouchableHighlight>
            </View>
            <FlatList
                style={{ paddingLeft: 15 }}
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (<Banner item={item} isTv={isTv} />)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: CONTAINER_OUTER_SPACING,
        paddingVertical: 5
    },
    title: {
        fontSize: 18,
        color: theme.colors.textColor,
        fontWeight: "600"
    },
    btn: {
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5
    }
})