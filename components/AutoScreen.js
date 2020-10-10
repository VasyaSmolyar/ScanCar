import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import arrow from '../assets/arrow.png';
import outline from '../assets/outline.png';

function AutoField({name, value}) {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{value}</Text>
        </View>
    );
}

export default function AutoScreen ({ route, navigation }) {
    const { item } = route.params;
    const fields = item.additional;

    console.log("AUTO");
    console.log(item);

    /*
    const data = fields.map((value, key) => {
        return <AutoField name={key} value={value} />
    });
    */

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.backContainer}>
                    <Image source={arrow} style={styles.arrowImage} resizeMode='contain' />
                    <Text style={styles.headerText}>Другие предложения</Text>
                </View>
                <Image source={outline} style={styles.outImage} resizeMode='contain' />
            </View>
            <View style={styles.productContainer}>
                <View style={styles.imagesContainer}>
                    <Image source={{uri: item.image_urls[0]}} style={styles.carImage} resizeMode='contain'/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.carYear}>{item.production_date}</Text>
                    <Text style={styles.carTitle}>{item.model} {item.brand}</Text>
                    <Text style={styles.carPrice}>{item.price.toLocaleString()} ₽</Text>
                </View>
            </View>
            <View>
                <Text>Описание</Text>
                <Text>Характеристики</Text>
            </View>
            <ScrollView>
                {undefined}
            </ScrollView>
            <Text></Text>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        width: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15 
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
});