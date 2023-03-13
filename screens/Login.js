import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../firebase'
import { Google } from 'expo';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            // console.log(authUser)
            if (authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, [navigation])

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert(
                'Error',
                'Enter details correctly',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            );
        }
        else {
            try {
                await auth.signInWithEmailAndPassword(email, password);
                console.log('User signed in successfully!');
            } catch (error) {
                console.log(error.message);
            }
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    cursorColor="black"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    cursorColor="black"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}

                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
                Or, login with ...
            </Text>
            <TouchableOpacity
                onPress={() => { }}
                style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 12,
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    marginBottom: 10,
                }}>
                <View style={styles.gcon}>
                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/009/469/630/original/google-logo-isolated-editorial-icon-free-vector.jpg" }} style={styles.google} />
                    <Text>Login With Google</Text>
                </View>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                    marginTop: 8,
                }}>
                <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
    },
    inputView: {
        width: "80%",
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 50,
        marginBottom: 12,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: 'black',
        borderColor: '#003f5c',
        borderBottomWidth: 0.2,
    },
    loginBtn: {
        width: '30%',
        backgroundColor: 'black',
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
    },
    gcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    google: {
        width: 26,
        height: 26,
        marginRight: 5,
    },
});
