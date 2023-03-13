import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase/compat/app';
import { Platform } from 'react-native-web';
import Loader from '../components/Loader'

const Chat = ({ navigation, route }) => {
    const [input, SetInput] = useState("")
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef();
    const { chatName, id } = route.params
    const [loading, setloading] = useState(true)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ marginLeft: 0, flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginLeft: 0, flexDirection: "row", alignItems: "center" }}>
                        <Avatar rounded source={{ uri: auth.currentUser.photoURL ? (auth?.currentUser?.photoURL) : "https://static.wikia.nocookie.net/7472fc18-e4de-49c5-a3e6-26885fb42ac6" }} />
                        <Text style={{ marginLeft: 5, fontWeight: 500, fontSize: 18 }}>{chatName}</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const sendmessage = () => {
        Keyboard.dismiss();
        if (input) {
            db.collection('chats').doc(id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
            })
            SetInput("")
        }
    }

    // function handleKeyPress(event) {
    //     if (event.key === 'Enter') {
    //         sendmessage();
    //     }
    // }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((querySnapshot) => {
                const updatedDocs = [];
                querySnapshot.forEach((doc) => {
                    updatedDocs.push({ id: doc.id, ...doc.data() });
                });
                setMessages(updatedDocs.reverse());
            });
            setloading(false)
            return () =>{
                unsubscribe();
            }
    }, [route]);

    const dateconvert = (timestamp) => {
        const dateObject = timestamp?.toDate();
        const timeString = dateObject?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeString
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90} enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle={styles.messagescon}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                        {loading ? (<Loader />) : (
                            <>
                                {messages.map(({ id, message, email, timestamp, displayName }) => (
                                    email === auth.currentUser.email ? (
                                        <View key={id} style={styles.receivercon}>
                                            <Text style={styles.receiver}>{message}</Text>
                                            <Text style={styles.time}>{dateconvert(timestamp)}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sendercon}>
                                            <Text style={styles.dname}>{displayName}</Text>
                                            <Text style={styles.sender}>{message}</Text>
                                            <Text style={styles.time}>{dateconvert(timestamp)}</Text>
                                        </View>
                                    )
                                ))}
                            </>
                        )}
                    </ScrollView>
                    <View style={styles.bottom}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={(text) => SetInput(text)}
                            placeholder="Type your message here..."
                            returnKeyType="send"
                            cursorColor="black"
                            required
                            // onKeyPress={handleKeyPress}
                            onSubmitEditing={sendmessage}
                        />
                        <TouchableOpacity style={styles.button} >
                            <Ionicons name="send" size={20} color="white" onPress={sendmessage} />
                        </TouchableOpacity>
                    </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 10,
        marginVertical: 10
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginRight: 8,
        bottom: 0,
        height: 40,
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: "#1fa855",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    messagescon: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    receivercon: {
        alignSelf: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 6,
        paddingRight: 57,
        backgroundColor: "#DCF8C5",
        borderRadius: 13,
        marginHorizontal: 15,
        marginVertical: 5,
        position: "relative",
        paddingBottom: 8,
    },
    sendercon: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 6,
        paddingBottom: 8,
        paddingRight: 55,
        backgroundColor: "#ECECEC",
        borderRadius: 13,
        marginHorizontal: 15,
        marginVertical: 5,
        position: "relative",
    },
    sender: {
        fontSize: 16,
        maxWidth: "70%",
    },
    receiver: {
        fontSize: 16,
        maxWidth: "75%",

    },
    time: {
        position: "absolute",
        fontSize: 11,
        color: "#8c8c8c",
        bottom: 4,
        right: 9,
    },
    dname: {
        color: "red",
        textTransform: "capitalize",
    },
})