import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const host = "http://194.67.92.163/";

export default function CartScreen() {
	const [perm, setPerm] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);

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
		const text = await response.text();
		console.log(text);
	}
	
    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={ref => {setCameraRef(ref);}}>
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				flexDirection: 'row'
			}}></View>
			<TouchableOpacity style={{flex: 0.1, backgroundColor: '#fff'}} onPress={setPhoto}>
				<Text>Отправить фото</Text>
			</TouchableOpacity>
		  </Camera>
        </View>
    );
}