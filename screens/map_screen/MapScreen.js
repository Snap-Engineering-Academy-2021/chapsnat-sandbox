// // MapView.js
// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Constants from 'expo-constants';

// let MapView;

// if (Constants.appOwnership === 'expo') {
//   MapView = props => (
//     <View
//       style={[
//         {
//           backgroundColor: 'lightblue',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         props.style,
//       ]}>
//       <Text>🗺 (Mapbox not available)</Text>
//     </View>
//   );
// } else {
//   const Mapbox = require('@react-native-mapbox-gl/maps').default;
//   Mapbox.setAccessToken('pk.eyJ1IjoidmVnZ2llZGlubyIsImEiOiJja3JyMGQwYWs5Mjg5MzFtdG5tMGY2cWc2In0.l4pyA__TYkJcEkrhofhE3A');
//   MapView = Mapbox.MapView;
// }

// export default MapView;

import React, { useState, useEffect, useRef, useContext } from "react";
import Colors from "../../constants/Colors";
import {
	StyleSheet,
	Text,
	View,
	Button,
	useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
	PanGestureHandler,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

const SPRING_CONFIG = {
	damping: 80, // more damping = more bounciness
	overshootClamping: true,
	restDisplacementThreshold: 0.1,
	restSpeedThreshold: 0.1,
	stiffness: 500, // more stiffness = more bounciness
};

const LOS_ANGELES_REGION = {
	latitude: 33.986072440676935,
	longitude: -118.27652444626881,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

export default function MapScreen() {
	const [currLocation, setCurrLocation] = useState(null);
	const mapView = useRef(null);

	useEffect(() => {
		(async () => {
			let { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrLocation(location.coords);
		})();
	}, []);

	const goToCurrLocation = () => {
		mapView?.current.animateToRegion(
			{
				// latitude: currLocation.latitude,
				// longitude: currLocation.longitude
				latitude: 33.986072440676935,
				longitude: -118.27652444626881,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			1000
		);
	};
	const dimensions = useWindowDimensions();
	const top = useSharedValue(dimensions.height);
	const style = useAnimatedStyle(() => {
		return {
			top: withSpring(top.value, SPRING_CONFIG),
		};
	});
	const gestureHandler = useAnimatedGestureHandler({
		onStart(_, context) {
			context.startTop = top.value;
		},
		onActive(event, context) {
			top.value = context.startTop + event.translationY;
		},
		//Dimissinng the snap point
		onEnd() {
			if (top.value > dimensions.height / 2 + 200) {
				top.value = dimensions.height;
			} else {
				top.value = dimensions.height / 2;
			}
		},
	});

	// const RenderInner = () => (
	// 	<View style={styles.panel}>
	// 		<View style={{ alignItems: "center" }}>
	// 			<Text style={styles.panelTitle}>ACCE Institute</Text>
	// 			<Text style={styles.panelSubTitle}>
	// 				Swipe down to close
	// 			</Text>
	// 		</View>
	// 		<TouchableOpacity style={styles.panelButton}>
	// 			<Text style={styles.panelButtonTitle}>
	// 				Go to Current Location
	// 			</Text>
	// 		</TouchableOpacity>
	// 	</View>
	// );

	// const RenderHeader = () => (
	// 	<View style={styles.header}>
	// 		<View style={styles.panelHeader}>
	// 			<View style={styles.panelHandle}></View>
	// 		</View>
	// 	</View>
	// );

	// const bs = React.createRef();
	// const fall = new Animated.Value(1);

	return (
		<>
			<MapView
				ref={mapView}
				style={styles.map}
				initialRegion={LOS_ANGELES_REGION}
			>
				{currLocation ? (
					<Marker
						coordinate={currLocation}
						title={"Current Location"}
						description={"You are here!"}
					/>
				) : null}
				<Marker
					onPress={() => {
						top.value = withSpring(
							dimensions.height / 2, // start at half the height
							SPRING_CONFIG
						);
					}}
					coordinate={{
						latitude: 33.9652241906269,
						longitude: -118.29209382938507,
					}}
					image={require("../../assets/organizations/community_coalition/Marker.png")}
					title="Community Coalition"
					description="Supporting South LA"
				/>
				<Marker
					coordinate={{
						latitude: 33.95000621928571,
						longitude: -118.25372699815792,
					}}
					image={require("../../assets/organizations/a_new_way_of_life_foundation/Marker.png")}
					title="A New Way of Life Foundation"
					description="Supporting South LA"
				/>
				<Marker
					coordinate={{
						latitude: 33.9706323755787,
						longitude: -118.25662670611676,
					}}
					image={require("../../assets/organizations/youth_justice_coalition/Marker.png")}
					title="Youth Justice Coalition"
					description="Supporting South LA"
				/>
				<Marker
					coordinate={{
						latitude: 34.01742729150679,
						longitude: -118.27857477158378,
					}}
					image={require("../../assets/organizations/acce_institute/Marker.png")}
					title="ACCE Institute"
					description="Supporting South LA"
				/>
				<Marker
					// onPress={() => {
					// 	top.value = withSpring(
					// 		dimensions.height / 2, // start at half the height
					// 		SPRING_CONFIG
					// 	);
					// }}
					coordinate={{
						latitude: 33.986072440676935,
						longitude: -118.27652444626881,
					}}
					image={require("../../assets/bitmoji/CrossedArms.png")}
					title="ACCE Institute"
					description="Supporting South LA"
				/>
			</MapView>
			{currLocation ? (
				<View style={styles.locateButtonContainer}>
					<TouchableOpacity
						style={styles.locateButton}
						onPress={goToCurrLocation}
					>
						<Ionicons
							name={"navigate"}
							size={40}
							color={Colors.snapblue}
							style={{
								marginTop: 5,
								marginLeft: 3,
							}}
						/>
					</TouchableOpacity>
				</View>
			) : null}

			{/* <View
				style={{
					flex: 1,
					backgroundColor: "papayawhip",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Button
					title="Open Sheet"
					onPress={() => {
						top.value = withSpring(
							dimensions.height / 2, // start at half the height
							SPRING_CONFIG
						);
					}}
				/>
			</View> */}

			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View
					style={[
						{
							position: "absolute",
							left: 0,
							right: 0,
							bottom: 0,
							// top: dimensions.height,
							backgroundColor: "white",
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							shadowColor: "000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							evavation: 5,
							padding: 20,
							justifyContent: "center",
							alignItems: "center",
						},
						style,
					]}
				>
					<Text>Sheet</Text>
				</Animated.View>
			</PanGestureHandler>

			{/* ref={this.bs}
				snapPoints={[330, 0]}
				renderContent={this.RenderInner}
				renderHeader={this.RenderHeader}
				initialSnap={1}
				callbackNode={this.fall}
				enabledGestureInteraction={true}
			/> */}
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
	locateButtonContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	locateButton: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: colors.snapyellow,
	},
});
