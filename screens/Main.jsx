import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase';

const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#9E8FEC' barStyle="light-content" />
            <Text style={styles.headText}>Приветствуем  {'\n'} <Text style={{fontSize: 30}}>semVer4</Text></Text>

            <View style={styles.block}>
                <TouchableOpacity style={styles.group} onPress={() => navigation.navigate('DailyGoals')}>
                    <Text style={styles.desc}>Цели на день</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.group} onPress={() => navigation.navigate('LongGoals')}>
                    <Text style={styles.desc}>Долгосрочные цели</Text>
                </TouchableOpacity>
                
                <Text style={styles.middleText}>Цели и план достижения предложенные приложением</Text>

                <TouchableOpacity style={styles.group}>
                    <Text style={styles.desc}>Изучение Английского</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    headText: {
        backgroundColor: '#9E8FEC',
        height: 150,
        color: '#fff',
        fontSize: 20,
        padding: 40
    },  

    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: 50
    },  

    group: {
        width: '45%',
        height: 100,
        backgroundColor: 'black',
        marginVertical: 5,
        justifyContent: 'center',
        backgroundColor: '#9E8FEC',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },

    middleText: {
        marginTop: 20,
        fontSize: 20,
        padding: 10
    },

    desc: {
        color: '#fff'
    },

    NavContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 20,
        color: 'red'
    },

    NavBar: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-evenly',
        borderRadius: 40
    },

    IconBehave: {
        padding: 14
    }
});

export default Main;