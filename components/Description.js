import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Description = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const navigation = useNavigation();
	let destinationArr = [];
	if (!destinationArr) {
		destinationArr.push(destination);
	} else {
		destinationArr.splice(destinationArr.length, 0, destination);
	}

	return (
		<>
			<View>
				{origin && (
					<TouchableOpacity
						style={[
							tw`flex rounded-md bg-gray-100 flex-row pl-4 pt-2 pb-2 border-b border-gray-200`,
							{ width: '91%', alignSelf: 'center' },
						]}>
						<View style={tw` mr-1 mt-1`}>
							<Icon name="time" color="gray" size={25} type="ionicon" />
						</View>
						<View>
							<Text style={tw`text-black text-sm font-semibold`}>From: </Text>
							<Text style={tw`text-gray-600 text-xs`}>
								{origin.description}
							</Text>
						</View>
					</TouchableOpacity>
				)}
				{destination ? (
					<FlatList
						data={destinationArr}
						keyExtractor={(item, idx) => idx.toString()}
						renderItem={(item) => (
							<TouchableOpacity
								style={[
									tw`flex rounded-md bg-gray-100 flex-row pl-4 pt-2 pb-2 mb-2 mr-5`,
									{ width: '82%', alignSelf: 'flex-end' },
								]}>
								<View style={tw` mr-1 mt-1`}>
									<Icon name="time" color="gray" size={25} type="ionicon" />
								</View>
								<View>
									<Text style={tw`text-black text-sm font-semibold`}>To: </Text>
									<Text style={tw`text-gray-600 text-xs`}>
										{destination.description}
									</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				) : (
					<View
						style={[
							tw`bg-gray-100 p-1`,
							{ width: '95%', alignSelf: 'center' },
						]}>
						<Text style={tw`text-xs pl-10 text-green-500`}>
							No destination set yet...
						</Text>
					</View>
				)}
			</View>
		</>
	);
};

export default Description;

const styles = StyleSheet.create({});
