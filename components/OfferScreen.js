import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { host } from '../constants';

export default function OfferScreen ({route}) {
    const [list, setList] = useState([]);
    const { car } = route.params;

    useEffect(async () => {
        const response = await fetch(host + 'api/auto/get?brand=' + car.brand + '&model=' + car.model + '&num=' + 20 + '&offset=' + 0);
        const json = await response.json();
        console.log(json);
        setList(json.cars);
    }, []);

    const data = list.map((item) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.carTitle}>{item.model} {item.brand}</Text>
                        <Text style={styles.carYear}>{item.price}</Text>
                    </View>
                    <Text style={styles.carPrice}>{item.production_date}</Text>
                    <View style={styles.marketLabel}>
                        <Text style={styles.marketText}>{item.type}</Text>
                    </View>
                </View>
                <Image />
            </View>
        )
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Найдено 123 предложения</Text>
                <Image />
            </View>
            <ScrollView>
                {data}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
	},
	headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25
    },
    headerText: {
        fontFamily: 'SFPro',
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        padding: 10
    },
    infoContainer: {

    },
    textContainer: {
        flexDirection: 'row'
    },
    carTitle: {
        fontFamily: 'SFPro',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginRight: 5
    },
    carYear: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: '#a0a4ae',
        position: 'relative',
        top: 5
    },
    carPrice: {
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        fontSize: 18,
        color: '#3a83f1',
        marginBottom: 10,
    },
    marketLabel : {
        backgroundColor: '#f3f4f7',
        width: 50,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marketText: {
        fontFamily: 'SFPro',
        fontSize: 12,
        color: '#a0a4ae'
    }
});