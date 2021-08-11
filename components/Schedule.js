import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Locations from './Locations';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectDestination,
	selectOrigin,
	setDestination,
} from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLEMAP_APIKEY } from '@env';

const Schedule = () => {
	const destination = useSelector(selectDestination);
	const origin = useSelector(selectOrigin);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	return (
		<View style={tw`relative bg-white pt-1 mt-1 h-full w-full`}>
			<View style={tw`items-center pt-3 pb-10`}>
				<Text style={tw`text-gray-700 font-semibold text-lg`}>
					Hi Christabel
				</Text>
			</View>
			<GooglePlacesAutocomplete
				styles={{
					container: {
						flex: 0,
						width: '100%',
						alignSelf: 'center',
						paddingTop: 5,
						paddingBottom: 5,
					},
					textInput: {
						fontSize: 16,
						height: 38,
						backgroundColor: '#FAFAFA',
					},
					predefinedPlacesDescription: {
						color: '#1faadb',
					},
				}}
				onPress={(data, details = null) => {
					dispatch(
						setDestination({
							location: details.geometry.location,
							description: data.description,
						})
					);
				}}
				fetchDetails={true}
				minLength={2}
				enablePoweredByContainer={false}
				placeholder="Enter Destination..."
				nearbyPlacesAPI="GooglePlacesSearch"
				query={{
					key: GOOGLEMAP_APIKEY,
					language: 'en',
				}}
			/>
			<View>
				<Locations />
			</View>
			{destination && origin && (
				<View style={tw` flex-row self-center h-10 mt-5 justify-between w-64`}>
					<TouchableOpacity
						onPress={() => navigation.navigate('RideList')}
						style={[
							tw`flex-row items-center bg-black rounded-full py-3 px-7 `,
							{ height: 50 },
						]}>
						<View style={tw`mb-1`}>
							<Icon color="white" size={20} name="taxi-alert" type="material" />
						</View>
						<Text style={tw`text-white ml-1 text-xs`}>Rides</Text>
					</TouchableOpacity>
					{
						<TouchableOpacity
							disabled
							style={[
								tw`flex-row items-center bg-gray-100 rounded-full py-3 px-7 `,
								{ height: 50 },
							]}>
							<View style={tw`mb-1`}>
								<Icon
									color="black"
									size={20}
									name="lunch-dining"
									type="material"
								/>
							</View>
							<Text style={tw`text-black ml-1 text-xs`}>Eats</Text>
						</TouchableOpacity>
					}
				</View>
			)}
		</View>
	);
};

export default Schedule;

const styles = StyleSheet.create({});
