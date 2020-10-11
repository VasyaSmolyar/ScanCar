import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import arrow from '../assets/arrow.png';
import outline from '../assets/outline.png';

function AutoField({name, value}) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{name}</Text>
            <Text style={styles.fieldValue}>{value}</Text>
        </View>
    );
}

export default function AutoScreen ({ route, navigation }) {
    const { item } = route.params;

    const delim = (price) => {
        let parts = price.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Offers', {car: item})}>
                        <Image source={arrow} style={styles.arrowImage} resizeMode='contain' />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Другие предложения</Text>
                </View>
                <TouchableOpacity>
                    <Image source={outline} style={styles.outImage} resizeMode='contain' />
                </TouchableOpacity>
            </View>
            <View style={styles.productContainer}>
                <View style={styles.imagesContainer}>
                    <Image source={{uri: item.image_urls[0]}} style={styles.carImage} resizeMode='contain'/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.carYear}>{item.production_date}</Text>
                    <Text style={styles.carTitle}>{item.model} {item.brand}</Text>
                    <Text style={styles.carPrice}>{delim(item.price)} ₽</Text>
                </View>
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Описание</Text>
                <Text style={styles.labelHeader}>Характеристики</Text>
            </View>
            <ScrollView>
                <AutoField name="Год выпуска" value={item.production_date} />
                <AutoField name="Кузов" value={item.bodywork} />
                <AutoField name="Цвет" value={item.production_date} />
                <AutoField name="Налог" value={item.tax} />
                <AutoField name="КПП" value={item.kpp} />
                <AutoField name="Привод" value={item.steering_wheel} />
                <AutoField name="Руль" value={item.steering_wheel} />
                <AutoField name="Таможня" value={item.customs} />
            </ScrollView>
            <Text></Text>
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Купить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.creditButton} onPress={() => navigation.navigate('Calculate', {item: item})}>
                <Text style={styles.creditText}>Взять в кредит</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 15 
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'SFPro',
        letterSpacing: 1,
        fontSize: 14,
        textDecorationLine: 'underline',
        color: '#3a83f1',
    },
    backContainer: {
        flexDirection: 'row',
    },
    arrowImage: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    outImage: {
        width: 30,
        height: 30
    },
    productContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center'
    },
    imagesContainer: {
        alignItems: 'center',
        width: '100%'
    },
    carImage: {
        width: '100%',
        height: 200
    },
    titleContainer: {
        marginTop: 15,
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
    labelContainer: {
        alignItems: 'flex-end'
    },
    labelHeader: {
        fontFamily: 'SFPro',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    labelText: {
        fontFamily: 'SFPro',
        fontSize: 14,
        letterSpacing: 1
    },
    buyButton: {
        borderWidth: 2,
        borderColor: '#3a83f1',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 15
    },
    buyText: {
        color: '#3a83f1',
        fontSize: 16,
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        letterSpacing: 1.5,
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
    fieldContainer: {
        paddingVertical: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldTitle: {
        width: '33%',
        fontFamily: 'SFPro',
        fontSize: 13,
        color: '#a0a4ae'
    },
    fieldValue: {
        width: '67%',
        fontFamily: 'SFPro',
        fontSize: 14,
    }
});