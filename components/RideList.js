import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
	selectSelection,
	selectTravelTimeInformation,
	setSelection,
} from '../slices/navSlice';

const RideList = () => {
	const data = [
		{
			id: 'Uber-X-1',
			title: 'Uber-X',
			multiplier: 1,
			image: 'https://i.dlpng.com/static/png/6453338_preview.png',
			price: '$20',
		},
		{
			id: 'Uber-Pool-2',
			title: 'Uber-Pool',
			multiplier: 0.8,
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5GcV83DPsMEbUoQafLyuw0qnIN-mXoPH_cEokmkjE-mdcY-bQXp36CWnZOaEmiESiXz4&usqp=CAU',
			price: '$20',
		},
		{
			id: 'Uber-XL-3',
			title: 'Uber-XL',
			multiplier: 1.9,
			image: 'https://devbtours.netlify.app/assets/fleet/minivan.png',
			price: '$20',
		},
		{
			id: 'Uber-Green-4',
			title: 'Uber-Green',
			multiplier: 0.9,
			image:
				'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_956/v1599010311/assets/00/4c6379-7586-4d55-9fe6-8170b18260d1/original/Product-Icon-2.jpg',
			price: '$20',
		},
		{
			id: 'Uber-C-5',
			title: 'Uber-Comfort',
			multiplier: 1.5,
			image:
				'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png',
			price: '$20',
		},
		{
			id: 'Uber-P-6',
			title: 'Uber-Premium',
			multiplier: 2.0,
			image:
				'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png',
			price: '$20',
		},
	];
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const selection = useSelector(selectSelection);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	const SURGE_CHARGE_RATE = 1.5;

	return (
		<View style={tw`relative bg-white`}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Schedule')}
				style={[tw`absolute rounded-full mt-5 ml-5`, { zIndex: 100 }]}>
				<Icon name="arrowleft" color="gray" type="antdesign" />
			</TouchableOpacity>
			<View style={tw`items-center mt-3`}>
				<Text style={tw` text-xs text-green-500 font-semibold`}>
					distant travel: {travelTimeInformation?.distance.text}
				</Text>
				<Text style={tw` text-base font-semibold`}>Select a Ride</Text>
			</View>
			<View style={tw`h-2/3`}>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item: { id, title, image, multiplier, price } }) => (
						<TouchableOpacity
							onPress={() =>
								dispatch(setSelection({ id, title, multiplier, image, price }))
							}
							style={tw`py-1 px-3 flex-row items-center ${
								selection?.id === id ? 'bg-gray-100' : 'bg-white'
							}`}>
							<Image
								style={{
									width: 80,
									height: 80,
									resizeMode: 'contain',
								}}
								source={{ uri: image }}
							/>
							<View style={tw`ml-2 w-3/4`}>
								<Text style={tw`text-base font-semibold`}>{title}</Text>
								<Text style={tw`text-xs`}>
									{travelTimeInformation?.duration.text} way
								</Text>
								<View style={tw`absolute right-0 top-1`}>
									<Text style={tw` text-base`}>
										{new Intl.NumberFormat('en-us', {
											style: 'currency',
											currency: 'USD',
										}).format(
											(travelTimeInformation?.duration.value *
												SURGE_CHARGE_RATE *
												multiplier) /
												100
										)}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>

			<View
				style={tw`bg-white w-full h-1/3 items-center border-t border-gray-100 pt-1  `}>
				<View style={tw`flex-row items-center justify-center `}>
					<TouchableOpacity
						onPress={() => selection && navigation.navigate('ConfirmTrip')}
						disabled={!selection}
						style={tw`bg-black ${!selection && 'bg-gray-200'} w-2/4`}>
						<Text
							style={tw`text-white p-2 text-base self-center font-semibold `}>
							Confirm {selection?.title}
						</Text>
					</TouchableOpacity>
					<View style={[tw`bg-gray-200 ml-2`, { padding: 11 }]}>
						<Icon color="black" size={18} name="taxi-alert" type="material" />
					</View>
				</View>
			</View>
		</View>
	);
};

export default RideList;

const styles = StyleSheet.create({});
