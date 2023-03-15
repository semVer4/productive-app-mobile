import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import Messages from './Messages';
import Main from './Main';
import DailyGoals from './DailyGoals';
import LongGoals from './LongGoals';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
}

const AuthStack = () => {
    return (
        <Stack.Navigator defaultScreenOptions={SignIn} screenOptions={{headerShown: false}}>
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>  
    );
}

const MainStack = () => {
    return (
        <Stack.Navigator defaultScreenOptions={Main} screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' options={{title: 'Главный экран'}} component={Main} />
            <Stack.Screen name='DailyGoals' component={DailyGoals} />
            <Stack.Screen name='LongGoals' component={LongGoals} />
        </Stack.Navigator>  
    );
}

const ChatStack = () => {
    return (
        <Tab.Navigator defaultScreenOptions={Main} screenOptions={{headerShown: false, headerStyle: {backgroundColor: '#9E8FEC'}, headerTintColor: '#fff'}}>
            <Tab.Screen name='Main' options={{title: 'Главный экран'}} component={MainStack} />
            <Tab.Screen name='Chat' options={{title: 'Чат'}} component={Chat} />
            <Tab.Screen name='Messages' options={{title: 'Мои сообщения'}} component={Messages} />
        </Tab.Navigator> 
    );
}

const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, 
            async authenicatedUser => {
                authenicatedUser ? setUser(authenicatedUser) : setUser(null);
            }    
        )

        return () => unsubscribe;
    }, [user]);

    return (
        <NavigationContainer>
            { user ? <ChatStack /> : <AuthStack /> }
        </NavigationContainer>
    );
}

const Navigation = () => {
    return (
        <AuthenticatedUserProvider>
            <RootNavigator />
        </AuthenticatedUserProvider>
    );
}

export default Navigation;