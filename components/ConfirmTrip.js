import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
	selectSelection,
	selectTravelTimeInformation,
} from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ConfirmTrip = () => {
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	const selection = useSelector(selectSelection);
	const SURGE_CHARGE_RATE = 1.5;
	const navigation = useNavigation();

	return (
		<View style={tw`items-center pt-3 bg-white h-full`}>
			<Text style={tw` text-xs text-green-500 font-semibold py-3 `}>
				Trip Confirmation ({travelTimeInformation?.distance.text})
			</Text>
			<View style={tw`shadow-lg bg-white p-5 rounded-md mt-2`}>
				<View>
					<Image
						style={{
							width: 180,
							height: 180,
							resizeMode: 'contain',
						}}
						source={{ uri: selection.image }}
					/>
				</View>
				<Text style={tw`font-semibold text-xs`}>
					Car Type: {selection.title}
				</Text>
				<Text style={tw`text-xs font-semibold`}>
					Total Distance: {travelTimeInformation?.duration.text} way
				</Text>
				<View style={tw`flex-row items-center`}>
					<Text style={tw`font-semibold text-xs`}>Trip Estimation:</Text>
					<Text style={tw` text-sm text-green-500 ml-2`}>
						{new Intl.NumberFormat('en-us', {
							style: 'currency',
							currency: 'USD',
						}).format(
							(travelTimeInformation?.duration.value *
								SURGE_CHARGE_RATE *
								selection.multiplier) /
								100
						)}
					</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate('RideList')}
				style={tw`rounded-full mt-5 ml-5`}>
				<Icon name="arrowleft" color="gray" type="antdesign" />
				<Text style={tw`text-gray-400 italic text-xs`}>
					Back to Select a Ride
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ConfirmTrip;

const styles = StyleSheet.create({});
