import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';

export default function CartScreen() {
    const [perm, setPerm] = useState(null);

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
	
    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={Camera.Constants.Type.back}>
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				flexDirection: 'row'
			}}></View>
		  </Camera>
        </View>
    );
}