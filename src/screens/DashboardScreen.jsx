import { Text, View } from "react-native";

export default function DashboardScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#000', marginBottom: 50 }}>Dashboard Screen</Text>
        </View>
    );
}