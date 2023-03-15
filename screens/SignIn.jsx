import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleSignIn = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Успешный вход!'))
                .catch(() => Alert.alert('Ошибка входа!'));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#9E8FEC' barStyle="light-content" />
            <View style={styles.whiteSheet}>
                <SafeAreaView style={styles.form}>
                    <Text style={styles.title}>Авторизация</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Введите email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    /> 
                    <TextInput 
                        style={styles.input}
                        placeholder='Введите пароль'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    /> 

                    <TouchableOpacity style={styles.button} onPress={onHandleSignIn}>
                        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Войти</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>У Вас нет аккаунта? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{fontWeight: '600', color: '#9E8FEC', fontSize: 14}}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9E8FEC'
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        paddingTop: 50,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60
    },
    form: {
        justifyContent: 'center',
        marginHorizontal: 30
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#9E8FEC',
        alignSelf: 'center',
        paddingBottom: 24
    },
    input: {
        backgroundColor: '#F3F5F9',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12
    },
    button: {
        backgroundColor: '#9E8FEC',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
});

export default SignIn;