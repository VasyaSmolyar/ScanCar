import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import close from '../assets/close.png';
import { useNavigation } from '@react-navigation/native';

export default function CarModal({item, onClose}) {
    const navigation = useNavigation();
    if(item === null) {
        return (
            <View></View>
        );
    }

    return (
        <Modal transparent={true} visible={true}>
            <View style={styles.backContainer}>
                <View style={{flex: 1}}></View>
                <View style={styles.container}>
                    <View style={styles.carContainer}>
                        <Image source={{uri: item.poster}} style={styles.carImage} resizeMode='contain' />
                        <Text style={styles.carTitle}>{item.title}</Text>
                        <Text style={styles.carYear}>{item.year}</Text>
                    </View>
                    <View style={styles.creditContainer}>
                        <TouchableOpacity style={styles.buyButton} onPress={() => {
                            onClose();
                            navigation.navigate('Offers', {car: item});
                        }}>
                            <Text style={styles.buyText}>Купить новую</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.creditButton}>
                            <Text style={styles.creditText}>Взять в кредит</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={close} style={styles.closeImage} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
	backContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 15,
        width: '100%'
    },
    container: {
        flex: 7,
        backgroundColor: '#fff',
        borderRadius: 20
    },  
    bottomContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carContainer: {
        flex: 2,
        alignItems: 'center'
    },
    creditContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    buyButton: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#3a83f1',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 25
    },
    buyText: {
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        fontSize: 15,
        letterSpacing: 1.5,
        color: '#fff'
    },
    creditButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    },
    creditText: {
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        fontSize: 15,
        letterSpacing: 1.5,
        color: '#3a83f1'
    },
    carImage: {
        height: 200,
        width: '100%',
        marginBottom: 10
    },
    carTitle: {
        fontFamily: 'SFPro',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        fontSize: 16,
        marginBottom: 15
    },
    carYear: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: '#a0a4ae'
    },
    closeImage : {
        width: 50,
        height: 50
    }
});