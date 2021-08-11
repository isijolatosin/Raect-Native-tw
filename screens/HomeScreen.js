import React from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLEMAP_APIKEY } from '@env';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import MapView from 'react-native-maps';
import Description from '../components/Description';

const HomeScreen = () => {
	const origin = useSelector(selectOrigin);
	const dispatch = useDispatch();
	return (
		<View>
			<StatusBar style="dark" />
			<View style={tw`h-2/3`}>
				<View>
					<Image
						style={{
							width: 100,
							marginLeft: 20,
							marginTop: 30,
							height: 100,
							resizeMode: 'contain',
						}}
						source={{
							uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
						}}
					/>
					<View style={tw`items-center`}>
						<NavOptions />
					</View>
				</View>
				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
							width: '85%',
							alignSelf: 'center',
						},
						textInput: {
							fontSize: 16,
							height: 38,
							backgroundColor: '#FAFAFA',
							marginTop: 20,
							marginBottom: 20,
						},
						predefinedPlacesDescription: {
							color: '#1faadb',
						},
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					minLength={2}
					enablePoweredByContainer={false}
					placeholder="Enter Location..."
					nearbyPlacesAPI="GooglePlacesSearch"
					query={{
						key: GOOGLEMAP_APIKEY,
						language: 'en',
					}}
				/>
				{origin ? (
					<Description />
				) : (
					<View style={tw`ml-10 mt-5`}>
						<Text style={tw`text-green-500`}>No data to display...</Text>
					</View>
				)}
			</View>
			<View style={tw`h-1/3 p-5`}>
				<Text style={tw`mb-3 text-base`}>Around you</Text>
				<View style={tw`h-full `}>
					<MapView
						style={tw`flex-1`}
						mapType="mutedStandard"
						initialRegion={{
							latitude: 37.78825,
							longitude: -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}></MapView>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;
