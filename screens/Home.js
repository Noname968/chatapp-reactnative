import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Listitem from '../components/Listitem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import Loader from '../components/Loader'

const Home = ({ navigation }) => {
    const [chats, setchats] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
            setchats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            )
        );
        setloading(false)
        return unsubscribe;
    }, []);

    const logout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity onPress={logout}>
                        <Avatar rounded source={{ uri: auth.currentUser.photoURL ? (auth?.currentUser?.photoURL) : "https://static.wikia.nocookie.net/7472fc18-e4de-49c5-a3e6-26885fb42ac6" }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 60,
                        marginRight: 0,
                    }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={21} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Newchat')}>
                        <SimpleLineIcons name="pencil" size={17} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterchat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (<Loader />) : (
                <>
                    {chats.map(({ id, chatName }) => (
                        <Listitem id={id} chatName={chatName} key={id} enterchat={enterchat} />
                    ))}
                </>
            )}
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        // backgroundColor:"white"
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
});