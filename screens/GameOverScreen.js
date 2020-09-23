import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        //fadeDuration={1000}
                        //Para incluir local images
                        source={require('../assets/success.png')}
                        //Para incluir web images
                        //source={{ uri: 'https://ep01.epimg.net/politica/imagenes/2017/08/11/tiempo_al_tiempo/1502456374_910683_1502463362_noticia_normal.jpg' }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.textContainer}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
                 to guess the number <Text style={styles.highlight}>{props.userNumber}</Text> !
                </BodyText>
                </View>

                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    imageContainer: {
        //width: 200,
        width: Dimensions.get('window').width * 0.7,
        //height: 200,
        height: Dimensions.get('window').width * 0.7,
        //borderRadius: 100, 
        borderRadius: Dimensions.get('window').width * 0.7 / 2, //Proporcional al ancho y alto de la imagen
        borderWidth: 3,
        borderColor: Colors.primary,
        overflow: 'hidden',
        //marginVertical: 5
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    resultContainer: {
        marginHorizontal: 20,
        //marginVertical: 20
        marginVertical: Dimensions.get('window').height / 60
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;