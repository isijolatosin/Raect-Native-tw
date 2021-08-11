import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
	Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'; //for smooth slides...
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';

export default function App() {
	const Stack = createStackNavigator();
	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={{ flex: 1 }}
						keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
						<Stack.Navigator>
							<Stack.Screen
								options={{ headerShown: false }}
								name="HomeScreen"
								component={HomeScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="MapScreen"
								component={MapScreen}
							/>
						</Stack.Navigator>
					</KeyboardAvoidingView>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({});
