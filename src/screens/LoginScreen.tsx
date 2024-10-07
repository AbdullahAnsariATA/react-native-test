import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import InputField from '../components/InputField';

type RootStackParamList = {
    Login: undefined;
    Dashboard: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Login'>;
};

interface FormData {
    email: string;
    password: string;
}

const baseUrl = 'https://reqres.in';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errorMessage) setErrorMessage('');
    };

    const handleLogin = async () => {
        const { email, password } = formData;
        if (!email || !password) {
            setErrorMessage('Email and Password are required.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(baseUrl + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response?.ok) {
                console.log('Login Successful:', data);
                setErrorMessage('');

                // Save the token
                await AsyncStorage.setItem('userToken', data.token);
                Alert.alert('Login Successful!');

                navigation.replace('Dashboard');
            } else {
                console.log('Login Failed:', data);
                setErrorMessage(data?.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Email Input */}
            <InputField
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                errorMessage={errorMessage && !formData.email ? 'Email is required' : ''}
            />

            {/* Password Input */}
            <InputField
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry={true}
                errorMessage={errorMessage && !formData.password ? 'Password is required' : ''}
            />

            {/* Error Message */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator size="small" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginScreen;
