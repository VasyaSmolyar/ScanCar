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
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container: {
        flex: 5,
        backgroundColor: '#fff',
        borderRadius: 20
    },  
    bottomContainer: {
        flex: 1
    },
});