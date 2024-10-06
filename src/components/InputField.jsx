import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    errorMessage = '',
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    errorMessage ? { borderColor: 'red' } : { borderColor: '#ccc' },
                ]}
                placeholderTextColor='grey'
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: '#000'
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default InputField;
