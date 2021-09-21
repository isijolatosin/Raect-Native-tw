import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { selectOrigin } from '../slices/navSlice';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule from '../components/Schedule';
import RideList from '../components/RideList';
import ConfirmTrip from '../components/ConfirmTrip';

const MapScreen = () => {
	const Stack = createStackNavigator();
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);

	return (
		<View style={tw`h-full w-full`}>
			<View style={tw`h-2/5`}>
				<Map />
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate('HomeScreen')}
				style={tw`absolute rounded-full bg-gray-500 p-3 mt-16 ml-5`}>
				<Icon name="arrowleft" color="white" type="antdesign" />
			</TouchableOpacity>
			<View style={tw`h-3/5`}>
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
