import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { db } from '../firebase'

const Newchat = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat", headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async () => {
        if (input) {
            await db.collection('chats').add({
                chatName: input
            }).then(() => {
                navigation.goBack();
            })
                .catch((err) => {
                    alert(err);
                })
        }
        else{
           Alert.alert('Error',
            "Enter Chat room name")
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <View style={styles.bcon}>
                <Button onPress={createChat} title='Create Chat' style={styles.createbtn} color="black" />
            </View>
        </View>
    );
}

export default Newchat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    bcon: {
        width: "50%",
        alignSelf: "center",
    },
    createbtn: {
        backgroundColor: "green",
    },
})