import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import CarModal from '../modals/CarModal';
import button from '../assets/photo.png';
import load from '../assets/load.gif';
import { host } from '../constants';

function Loading({enable}) {
	return (
		<Modal transparent={true} visible={enable} style={styles.backLoading} animationType="fade">
			<View style={styles.loadingContainer}>
				<Image style={styles.loadingImage} source={load} resizeMode='contain' />
				<Text style={styles.loadingText}>Идёт распознавание..</Text>
			</View>
		</Modal>
	)
}

export default function CartScreen() {
	const [perm, setPerm] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [item, setItem] = useState(null);
	const [mes, setMes] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setPerm(status === 'granted');
        })();
    }, []);    

	if(perm !== true) {
		return (
			<Text>Камера не работает!</Text>
		)
	}

	const setPhoto = async () => {
		const photo = await cameraRef.takePictureAsync();
		const localUri = photo.uri;
		const filename = localUri.split('/').pop();
		const match = /\.(\w+)$/.exec(filename);
		const type = match ? `image/${match[1]}` : `image`;
		const formData = new FormData();
  		formData.append('photo', { uri: localUri, name: filename, type });
		const response = await fetch(host + 'api/photo/recognize', {
			method: 'post',
			body: formData,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		const text = await response.json();
		console.log(text);
		setMes(false);
		setItem(text);
	}

	const onStart = () => {
		if(!mes) {
			setMes(true);
			setPhoto();
		}
	} 

	const container = item === null ? (
		<TouchableOpacity style={styles.buttonContainer} onPress={onStart}>
			<Image source={button} resizeMode='contain' style={styles.photoButton} />
		</TouchableOpacity>
	) : null;
	
    return (
        <View style={{flex: 1}}>
			<CarModal item={item} onClose={() => setItem(null)} />
			<Loading enable={mes} />
            <Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={ref => {setCameraRef(ref);}}>
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				flexDirection: 'row'
			}}></View>
			{container}
		  </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'center', 
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		paddingVertical: 25
	},
	photoButton: {
		width: 75,
		height: 75
	},
	backLoading: {
		alignItems: "center"
	},
	loadingContainer: {
		backgroundColor: 'white',
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15
	},
	loadingImage: {
		width: 30,
		height: 30
	},
	loadingText: {
		marginLeft: 15,
		fontFamily: 'SFPro',
        fontSize: 16,
	}
});