import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generatedRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generatedRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRounds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText># {numOfRounds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    );
}
const GameScreen = props => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    const initialGuess = generatedRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });


    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generatedRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuess => [nextNumber, ...curPastGuess])
    };
    
    let listContainerStyle = styles.listContainer;

    if (Dimensions.get('window').width < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (Dimensions.get('window').height < 500) {
        return (
            <View style={styles.screen}>
                <TitleText>Opponent's Guess</TitleText>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%'
    }
});

export default GameScreen;