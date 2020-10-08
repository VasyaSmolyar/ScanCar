import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './components/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
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
