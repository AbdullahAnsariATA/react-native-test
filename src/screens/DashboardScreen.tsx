import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DashboardScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dashboard Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#000',
        marginBottom: 50,
    },
});

export default DashboardScreen;
