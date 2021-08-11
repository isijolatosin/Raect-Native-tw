import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from '../slices/navSlice';
import { GOOGLEMAP_APIKEY } from '@env';

const Map = () => {
	const destination = useSelector(selectDestination);
	const origin = useSelector(selectOrigin);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!origin || !destination) return;

		// zoom & fit to markers
		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		});
	}, [origin, destination]);

	React.useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			await fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLEMAP_APIKEY}`
			)
				.then((res) => res.json())
				.then((data) =>
					dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
				);
		};

		getTravelTime();
	}, [origin, destination, GOOGLEMAP_APIKEY]);
	return (
		<>
			{origin && (
				<MapView
					ref={mapRef}
					style={tw`flex-1`}
					mapType="mutedStandard"
					initialRegion={{
						latitude: origin?.location.lat,
						longitude: origin?.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}>
					{origin && destination && (
						<MapViewDirections
							origin={origin.description}
							destination={destination.description}
							apikey={GOOGLEMAP_APIKEY}
							strokeWidth={3}
							strokeColor="black"
						/>
					)}
					{origin?.location && (
						<Marker
							coordinate={{
								latitude: origin.location.lat,
								longitude: origin.location.lng,
							}}
							title="origin"
							description={origin.description}
							identifier="origin"
						/>
					)}
					{destination && (
						<Marker
							coordinate={{
								latitude: destination.location.lat,
								longitude: destination.location.lng,
							}}
							title="destination"
							description={destination.description}
							identifier="destination"
						/>
					)}
					{origin?.location && (
						<Marker
							coordinate={{
								latitude: origin.location.lat,
								longitude: origin.location.lng,
							}}
							title="origin"
							description={origin.description}
							identifier="origin"
						/>
					)}
				</MapView>
			)}
		</>
	);
};

export default Map;

const styles = StyleSheet.create({});
