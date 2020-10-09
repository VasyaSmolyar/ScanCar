import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './components/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
	const [loaded, error] = Font.useFonts({
		SFPro: require('./assets/SFPro.ttf'),
	});

	if(!loaded) {
		return (
			<Text>{error}</Text>
		)
	}

	return (
		<View style={{flex: 1}}>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
					<Stack.Screen name="Camera" component={CameraScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}
