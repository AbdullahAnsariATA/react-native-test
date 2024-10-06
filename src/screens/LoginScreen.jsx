import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputField from '../components/InputField';

const LoginScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: 'george.bluth@reqres.in',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        const { email, password } = formData;
        if (!email || !password) {
            setErrorMessage('Email and Password are required.');
            return;
        }
        setLoading(true)
        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response?.ok) {
                console.log('Login Successful:', data);
                setErrorMessage('');

                await AsyncStorage.setItem('userToken', data.token); // Save the token
                Alert.alert('Login Successful!')

                navigation.replace('Dashboard');
            } else {
                console.log('Login Failed:', data);
                setErrorMessage(data?.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
        finally {
            setLoading(false)
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loading ? <ActivityIndicator size='small' /> : <Text style={styles.buttonText}>Login</Text>}
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
