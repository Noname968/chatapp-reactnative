import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (name!=='' && email!=='') {
            if(password === confirmPassword){
                auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: name,
                    })
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("Error creating user:", errorMessage);
                });
            }
            else{
                Alert.alert("Error"
                , "passwords do not match"
            ) 
            }
        }
        else {
            Alert.alert("Error"
                , "Enter all details"
            )
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor="#003f5c"
                    cursorColor="black"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    placeholderTextColor="#003f5c"
                    cursorColor="black"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholderTextColor="#003f5c"
                    cursorColor="black"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                    placeholderTextColor="#003f5c"
                    cursorColor="black"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
                Or, register with ...
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
                    <Text>Signup With Google</Text>
                </View>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                    marginTop: 8,
                }}>
                <Text>Already a user? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        height: 50,
        color: 'black',
        borderColor: '#003f5c',
        borderBottomWidth: 0.2,
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
    button: {
        width: '30%',
        backgroundColor: 'black',
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

export default Register;
