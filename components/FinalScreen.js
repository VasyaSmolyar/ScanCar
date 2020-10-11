import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import close from '../assets/return.png';

export default function FinalScreen({ navigation, route }) {
    const { data, item } = route.params;
    const text = data.approved ? "Ваша заявка предварительно одобрена" : "Ваша заявка предварительно не одобрена" ;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Калькулятор кредита</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Offers', { item: item })}>
                    <Image source={close} style={styles.closeImage} resizeMode='contain' />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={styles.fieldValue}>{text}</Text>
                    <Text style={styles.fieldName}>После рассмотрения заявки вы получите уведомление о её статусе</Text>
                    <TouchableOpacity style={styles.creditButton} onPress={() => {}}>
                        <Text style={styles.creditText}>Оформить страховку</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.creditButton} onPress={() => {}}>
                        <Text style={styles.creditText}>Заказать госсномер автомобиля</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.creditButton} onPress={navigation.navigate('Offers', { item: item })}>
                        <Text style={styles.creditText}>Назад к списку предложений</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30
	},
	headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 25,
        paddingTop: 35
    },
    headerText: {
        fontFamily: 'SFPro',
        fontSize: 20,
        fontWeight: 'bold'
    },
    fieldName: {
        fontFamily: 'SFPro',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    fieldValue: {
        fontFamily: 'SFPro',
        fontSize: 16,
    },
    closeImage: {
        width: 30,
        height: 30
    },
    creditButton: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#3a83f1',
        alignItems: 'center',
        paddingVertical: 10
    },
    creditText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
});