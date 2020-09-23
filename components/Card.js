import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    //... styles.card + ...estilo seteado en el componente en que se utilice
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        //elevation funciona en Android
        elevation: 5,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10
    }
});

export default Card;