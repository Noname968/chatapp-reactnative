import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const Listitem = ({ id, chatName, enterchat }) => {
    const [chatmessage, setchatmessage] = useState([])

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setchatmessage(snapshot.docs.map((doc) => doc.data()))
            );
        return unsubscribe;
    });

    return (
        <ListItem style={styles.list} onPress={() => enterchat(id, chatName)}>
            <Avatar rounded source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png" }} style={styles.avatar} />
            <ListItem.Content style={styles.conline}>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatmessage?.[0]?.displayName}: {chatmessage?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default Listitem

const styles = StyleSheet.create({
    list: {
        borderColor: "#cccccc",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        width: 35,
        height: 35,
    },
})