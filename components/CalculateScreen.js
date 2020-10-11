import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import close from '../assets/return.png';
import picker from '../assets/picker.png';
import { host } from '../constants';

export default function CalculateScreen({ navigation, route }) {
    const { item } = route.params;
    const [ amount, setAmount ] = useState(10000);
    const [ month, setMonth ] = useState(6);
    const [ final, setFinal ] = useState(0);

    const delim = (price) => {
        let parts = price.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    const onPerform = async () => {
        const response = await fetch(host + 'api/credit/calc', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                cost: item.price,
                initialFee: amount,
                kaskoValue: 0,
                term: month,
                specialConditions: []
            })
        });
        const json = await response.json();
        console.log(json);
        setFinal(json.loanAmount);
    }

    useEffect(() => onPerform(), []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Калькулятор кредита</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auto', { item: item })}>
                    <Image source={close} style={styles.closeImage} resizeMode='contain' />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.pageContainer}>
                <View style={{paddingHorizontal: 30}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.carYear}>{item.production_date}</Text>
                        <Text style={styles.carTitle}>{item.model} {item.brand}</Text>
                        <Text style={styles.carPrice}>{delim(item.price)} ₽</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.labelText}>Первоначальный взнос</Text>
                        <Text style={styles.priceText}>{delim(amount)} ₽</Text>
                        <Slider style={styles.sliderStyle} onValueChange={(val) => { setAmount(val); onPerform(); }} minimumValue={10000} 
                        step={1000} maximumValue={100000} thumbImage={picker} minimumTrackTintColor='#3a83f1' />
                        <View style={styles.rangeContainer}>
                            <Text style={styles.rangeText}>10000</Text>
                            <Text style={styles.rangeText}>100000</Text>
                        </View>
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.labelText}>Период рассрочки</Text>
                        <Text style={styles.priceText}>{delim(month)} месяцев</Text>
                        <Slider style={styles.sliderStyle} onValueChange={(val) => { setMonth(val); onPerform(); }} minimumValue={6} 
                        step={3} maximumValue={120} thumbImage={picker} minimumTrackTintColor='#3a83f1' />
                        <View style={styles.rangeContainer}>
                            <Text style={styles.rangeText}>6</Text>
                            <Text style={styles.rangeText}>120</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sumContainer}>
                    <Text style={styles.sumLabel}>Сумма кредита к выплате:</Text>
                    <Text style={styles.sumText}>{delim(final)} ₽</Text>
                </View>
                <View style={{ paddingHorizontal: 30 }}>
                    <View style={{paddingVertical: 30}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.carTitle}>Мультикарта</Text>
                            <Text style={styles.carYear}>·· 3289</Text>
                        </View>
                        <Text style={styles.carPrice}>{delim(99999)} ₽</Text>
                    </View>
                    <TouchableOpacity style={styles.creditButton} onPress={() => {}}>
                        <Text style={styles.creditText}>Взять кредит</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    closeImage: {
        width: 30,
        height: 30
    },
    pageContainer: {
        borderStyle: 'dashed',
        borderTopWidth: 1,
        borderTopColor: '#a0a4ae',
        paddingTop: 30
    },
    titleContainer: {
        marginBottom: 30,
        alignItems: 'center'
    },
    carTitle: {
        fontFamily: 'SFPro',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        fontSize: 16,
    },
    carYear: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: '#a0a4ae'
    },
    carPrice: {
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        fontSize: 18,
        color: '#3a83f1',
        marginBottom: 10,
    },
    sliderContainer: {
        borderStyle: 'dashed',
        borderBottomWidth: 1,
        borderBottomColor: '#a0a4ae',
        paddingVertical: 15,
        width: '100%'
    },
    labelText: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: '#a0a4ae',
        fontWeight: 'bold'
    },
    priceText: {
        fontFamily: 'SFPro',
        fontSize: 16,
        paddingTop: 10,
        fontWeight: 'bold'
    },
    sliderStyle: {
        width: '100%',
        height: 40
    },
    rangeContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    rangeText: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: '#a0a4ae',
        fontWeight: 'bold'
    },
    sumContainer: {
        height: 175,
        width: '100%',
        backgroundColor: '#f3f4f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    sumLabel: {
        fontFamily: 'SFPro',
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    sumText: {
        fontFamily: 'SFPro',
        fontSize: 22,
        color: '#3a83f1',
        fontWeight: 'bold'
    },
    textContainer: {
        flexDirection: 'row',
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
    },
    creditButton: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#3a83f1',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 50
    },
    creditText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
});