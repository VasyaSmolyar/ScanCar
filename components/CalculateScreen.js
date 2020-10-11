import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import close from '../assets/return.png';
import picker from '../assets/picker.png';
import { host } from '../constants';

export default function CalculateScreen({ navigation, route }) {
    const { item } = route.params;
    const [ amount, setAmount ] = useState(100);
    const [ month, setMonth ] = useState(1);
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
        const text = await response.text();
        console.log(text);
        /*
        const json = await response.json();
        console.log(json);
        setFinal(json.loanAmount);
        */
    }

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
                        <Slider style={styles.sliderStyle} onValueChange={(val) => { setAmount(val); onPerform(); }} minimumValue={100} 
                        step={1} maximumValue={1000} thumbImage={picker} minimumTrackTintColor='#3a83f1' />
                        <View style={styles.rangeContainer}>
                            <Text style={styles.rangeText}>100</Text>
                            <Text style={styles.rangeText}>1000</Text>
                        </View>
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.labelText}>Период рассрочки</Text>
                        <Text style={styles.priceText}>{delim(month)} месяцев</Text>
                        <Slider style={styles.sliderStyle} onValueChange={(val) => { setMonth(val); onPerform(); }} minimumValue={1} 
                        step={1} maximumValue={10} thumbImage={picker} minimumTrackTintColor='#3a83f1' />
                        <View style={styles.rangeContainer}>
                            <Text style={styles.rangeText}>1</Text>
                            <Text style={styles.rangeText}>100</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sumContainer}>
                    <Text style={styles.sumLabel}>Сумма кредита к выплате:</Text>
                    <Text style={styles.sumText}>{delim(final)} ₽</Text>
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
    }
});