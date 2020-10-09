import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default function CarModal({item}) {
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

                    </View>
                    <View style={styles.creditContainer}>
                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={styles.buyText}>Купить новую</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.creditButton}>
                            <Text style={styles.creditText}>Взять в кредит</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>

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
        flex: 5,
        backgroundColor: '#fff',
        borderRadius: 20
    },  
    bottomContainer: {
        flex: 1
    },
    carContainer: {
        flex: 2
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
    }
});