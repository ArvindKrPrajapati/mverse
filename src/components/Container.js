import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { theme } from '../utils/theme';



const Container = ({ children, style, isRefreshControl, refreshing, onRefresh }) => (
    <ScrollView
        refreshControl={
            isRefreshControl && (
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            )
        }
        style={{ flex: 1, backgroundColor: theme.colors.secondary }}
        contentContainerStyle={[{ flexGrow: 1 }, style]}
        showsVerticalScrollIndicator={false}
    >
        {children}
    </ScrollView>
);

export default Container;