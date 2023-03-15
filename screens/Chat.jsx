import React, {
    useState,
    useLayoutEffect,
    useCallback, 
} from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { schedulePushNotification } from '../components/Test';

const Chat = () => {
    const chats = 'chats';
    const [messages, setMessage] = useState([]);
    const navigation = useNavigation();

    const onSignOut = () => {
        //signOut(auth).catch(error => console.log(error));
        navigation.navigate('Messages');
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

    useLayoutEffect(() => {
        const collectionRef = collection(database, chats);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessage(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text, 
                    user: { //left user
                        _id: doc.data().user._id
                    }
                })) 
            )

            snapshot.docs.map(doc => {
                console.log(auth?.currentUser?.displayName);
            })
        });
        return unsubscribe; 
    }, []); 

    const onSend = useCallback((messages = []) => {
        setMessage(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];

        addDoc(collection(database, chats), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return [
        <StatusBar backgroundColor='#9E8FEC' barStyle="light-content" />,

        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            renderUsernameOnMessage={true}
            user={{
                _id: auth?.currentUser?.email
            }}
            placeholder="Напишите сообщение..."
            messagesContainerStyle={{
                backgroundColor: '#222222'
            }}
        />
    ];
}

export default Chat;