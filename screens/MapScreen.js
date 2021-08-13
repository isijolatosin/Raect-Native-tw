import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import Schedule from '../components/Schedule';
import 'react-native-gesture-handler'; //for smooth slides...
import { createStackNavigator } from '@react-navigation/stack';
import RideList from '../components/RideList';
import ConfirmTrip from '../components/ConfirmTrip';

const MapScreen = () => {
	const Stack = createStackNavigator();
	const navigation = useNavigation();

	return (
		<View style={tw`relative h-full w-full`}>
			<View style={tw`h-1/2`}>
				<Map />
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate('HomeScreen')}
				style={tw`absolute rounded-full bg-gray-500 p-3 mt-16 ml-5`}>
				<Icon name="arrowleft" color="white" type="antdesign" />
			</TouchableOpacity>
			<View style={tw`h-1/2`}>
				<Stack.Navigator>
					<Stack.Screen
						options={{ headerShown: false }}
						name="Schedule"
						component={Schedule}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name="RideList"
						component={RideList}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name="ConfirmTrip"
						component={ConfirmTrip}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({});
