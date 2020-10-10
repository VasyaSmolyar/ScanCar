import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { host } from '../constants';
import close from '../assets/return.png';

export default function OfferScreen ({ route, navigation }) {
    const [list, setList] = useState([]);
    const { car } = route.params;

    useEffect(async () => {
        const response = await fetch(host + 'api/auto/get', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            /*
            body: JSON.stringify({
                brand: car.brand,
                model: car.model,
                num: 20,
                offset: 0
            })
            */
            body: JSON.stringify({
                brand: "KIA",
                model: "K5",
                num: 20,
                offset: 0
            })
        });
        const json = await response.json();
        console.log(json);
        if(json.error === undefined) {
            setList(json.cars);
        } else {
            setList([]);
        }
    }, []);

    const getType = (type) => {
        return type === "vtb" ? "Партнёр ВТБ" : "auto.ru";
    }

    const getSize = (len) => {
        const bunch = len % 10;
        if(bunch == 1) {
            return "Найдено " + bunch + " предложение";
        } else if(bunch > 1 && bunch < 5) {
            return "Найдено " + bunch + " предложения";
        }
        return "Найдено " + bunch + " предложений"; 
    }

    const data = list.map((item) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Auto', { item: item })}>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.carTitle}>{item.model} {item.brand}</Text>
                        <Text style={styles.carYear}>{item.production_date}</Text>
                    </View>
                    <Text style={styles.carPrice}>{item.price.toLocaleString()} ₽</Text>
                    <View style={styles.marketLabel}>
                        <Text style={styles.marketText}>{getType(item.type)}</Text>
                    </View>
                </View>
                <Image source={{uri: item.image_urls[0]}} style={styles.carImage} resizeMode='contain' />
            </TouchableOpacity>
        )
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{getSize(list.length)}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                    <Image source={close} style={styles.closeImage} resizeMode='contain' />
                </TouchableOpacity>
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
        alignItems: 'center',
        paddingVertical: 25
    },
    headerText: {
        fontFamily: 'SFPro',
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 2
    },
    marketText: {
        fontFamily: 'SFPro',
        fontSize: 12,
        color: '#a0a4ae'
    }, 
    closeImage: {
        width: 30,
        height: 30
    },
    carImage: {
        width: 200,
        height: 100
    }
});