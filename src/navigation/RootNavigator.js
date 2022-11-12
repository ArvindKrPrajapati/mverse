import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Web from '../screens/Web';
import Browser from '../screens/Browser';
import Home from '../screens/Home';
import { theme } from '../utils/theme';
import SeeMore from '../screens/SeeMore';
import Search from '../screens/Search/Index';
import Details from '../screens/Details';
import Episodes from '../screens/Episodes';
import Play from '../screens/Play';

const Stack = createNativeStackNavigator();


export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} options={{ animation: "fade_from_bottom" }} />
                <Stack.Screen name="SeeMore" component={SeeMore} options={
                    ({ route }) => ({
                        title: route.params.title,
                        headerShown: true,
                        animation: "slide_from_right",
                        headerTintColor: theme.colors.textColor,
                        headerStyle: { backgroundColor: theme.colors.primary }
                    })
                } />
                <Stack.Screen name="Details" component={Details} options={
                    ({ route }) => ({
                        title: route.params.title,
                        headerShown: true,
                        animation: "slide_from_right",
                        headerTintColor: theme.colors.textColor,
                        headerStyle: { backgroundColor: theme.colors.primary }
                    })
                } />
                <Stack.Screen name="Episodes" component={Episodes} options={
                    ({ route }) => ({
                        title: route.params.title,
                        headerShown: true,
                        animation: "slide_from_right",
                        headerTintColor: theme.colors.textColor,
                        headerStyle: { backgroundColor: theme.colors.primary }
                    })
                } />
                <Stack.Screen name="Search" component={Search} options={{ animation: "slide_from_left" }} />
                <Stack.Screen name="Play" component={Play} options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="Web" component={Web} options={{ headerShown: true, animation: "slide_from_right", title: "Websites", headerTintColor: "white", headerStyle: { backgroundColor: theme.colors.primary } }} />
                <Stack.Screen name="Browser" component={Browser} options={{ animation: "slide_from_right" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}