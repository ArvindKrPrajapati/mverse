import React from 'react';
import { ScrollView } from 'react-native';
import { theme } from '../utils/theme';



const Container = ({ children, style }) => (
    <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.secondary }}
        contentContainerStyle={[{ flexGrow: 1 }, style]}
        showsVerticalScrollIndicator={false}
    >
        {children}
    </ScrollView>
);

export default Container;