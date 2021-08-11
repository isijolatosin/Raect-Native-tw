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
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';

const data = [
	{
		id: '123',
		title: 'Get a Ride',
		image: 'https://i.dlpng.com/static/png/6453338_preview.png',
		screen: 'MapScreen',
	},
	{
		id: '456',
		title: 'Order Food',
		image:
			'https://i.pinimg.com/originals/f3/6e/a9/f36ea96f315e30383d24d0c8e4ccfa8b.png',
		screen: 'EatScreen', //Later build...
	},
];

const NavOptions = () => {
	const origin = useSelector(selectOrigin);
	const navigation = useNavigation();
	return (
		<FlatList
			data={data}
			horizontal
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() =>
						item.id !== '456' && origin && navigation.navigate(item.screen)
					}
					style={tw`relative p-2 pl-6 pb-24 pt-2 bg-gray-200 m-2 w-44 rounded-md h-28`}>
					<Image
						style={{
							width: 100,
							height: 100,
							resizeMode: 'contain',
							alignSelf: 'flex-end',
						}}
						source={{ uri: item.image }}
					/>
					<Text style={tw`absolute bottom-2 left-2 text-gray-400 text-xs `}>
						{item.title}
					</Text>
					<View style={tw`absolute bottom-2 right-2`}>
						<Icon name="arrowright" color="gray" size={15} type="antdesign" />
					</View>
					{item.id === '456' && (
						<View style={tw`absolute top-12 self-center`}>
							<Text style={tw`text-white text-xs`}>-- Future Build --</Text>
						</View>
					)}
					{origin && item.id === '123' && (
						<View style={tw`absolute bottom-2 right-6 self-center`}>
							<Text style={tw`text-green-500 text-xs`}>Destinations</Text>
						</View>
					)}
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavOptions;
