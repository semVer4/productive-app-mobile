import React, {
    useState,
    useEffect,
    useLayoutEffect
} from 'react';
import {
    collection,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Messages = ({ navigation }) => {
    const [message, setMessage] = useState([]);
    const myMessage = [];

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color='#fff' />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        onSnapshot(q, snapshot => {
            setMessage(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text, 
                    user: doc.data().user
                })) 
            )
        });
    }, []);  
    
    useEffect(() => {
        message.map(mes => {
            if (mes.user._id == auth?.currentUser?.email) {
                myMessage.push(mes.text);
            }
        });
    }, [])

    return (
        <ScrollView style={styles.scroll}>
            {
                message.map((mes) => {
                    if (mes.user._id == auth?.currentUser?.email) {
                        return <Text style={styles.text}>{mes.text}</Text>
                    }
                }).reverse()
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#222222'
    },  
    text: {
        borderWidth: 2,
        borderHeight: 2,
        borderColor: '#9E8FEC',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        color: '#fff'
    }
});

export default Messages;