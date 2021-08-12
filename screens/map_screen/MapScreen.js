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
	Image,
	Button,
	useWindowDimensions,
	Dimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
	PanGestureHandler,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
// import { Image } from "";

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
			if (top.value > dimensions.height / 4) {
        top.value = dimensions.height;
			} else {
				top.value = dimensions.height / 4;
			}
		},
	});
	// const bitM = () => {
	// 	return (
	// 		<View style={s.overlay}>
	// 			<Image
	// 				source={{ uri: "http://i.imgur.com/IGlBYaC.jpg" }}
	// 				style={s.backgroundImage}
	// 			/>
	// 			{console.log("bitM")}
	// 		</View>
	// 	);
	// };
	const s = StyleSheet.create({
		backgroundImage: {
			flex: 1,
			width: null,
			height: null,
		},
		overlay: {
			position: "absolute",
			height: dimensions.height,
			width: dimensions.width,
			top: 0,
			// right: 0,
			// bottom: 0,
			left: 0,
			backgroundColor: "red",
			opacity: 1,
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
						mapView?.current.animateToRegion(
							{
								// latitude: currLocation.latitude,
								// longitude: currLocation.longitude
								latitude:
									33.9652241906269 -
									0.0922 / 8,
								longitude: -118.29209382938507,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 4, // start at half the height
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
					onPress={() => {
						mapView?.current.animateToRegion(
							{
								// latitude: currLocation.latitude,
								// longitude: currLocation.longitude
								latitude:
									33.95000621928571 -
									0.0922 / 8,
								longitude: -118.25372699815792,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 4, // start at half the height
							SPRING_CONFIG
						);
					}}
					coordinate={{
						latitude: 33.95000621928571,
						longitude: -118.25372699815792,
					}}
					image={require("../../assets/organizations/a_new_way_of_life_foundation/Marker.png")}
					title="A New Way of Life Foundation"
					description="Supporting South LA"
				/>
				<Marker
					onPress={() => {
						mapView?.current.animateToRegion(
							{
								// latitude: currLocation.latitude,
								// longitude: currLocation.longitude
								latitude:
									33.9706323755787 -
									0.0922 / 8,
								longitude: -118.25662670611676,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 4, // start at half the height
							SPRING_CONFIG
						);
					}}
					coordinate={{
						latitude: 33.9706323755787,
						longitude: -118.25662670611676,
					}}
					image={require("../../assets/organizations/youth_justice_coalition/Marker.png")}
					title="Youth Justice Coalition"
					description="Supporting South LA"
				/>
				<Marker
					onPress={() => {
						mapView?.current.animateToRegion(
							{
								// latitude: currLocation.latitude,
								// longitude: currLocation.longitude
								latitude:
									34.01742729150679 -
									0.0922 / 8,
								longitude: -118.27857477158378,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 4, // start at half the height
							SPRING_CONFIG
						);
					}}
					coordinate={{
						latitude: 34.01742729150679,
						longitude: -118.27857477158378,
					}}
					image={require("../../assets/organizations/acce_institute/Marker.png")}
					title="ACCE Institute"
					description="Supporting South LA"
				/>
				<Marker
					// onPress={bitM}
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
					title="Your Bitmoji"
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
					<View>
						{/* Header */}
						<View style={{ flexDirection: "row" }}>
							<Image
								source={require("../../assets/organizations/community_coalition/Icon.png")}
							/>
							<View style={{}}>
								<Text>Community Coalition</Text>
								<View
									style={{
										flexDirection:
											"row",
									}}
								>
									<TouchableOpacity
										style={{
											backgroundColor:
												"yellow",
											borderRadius: 50,
										}}
									>
										<Text>
											Subscribe
										</Text>
									</TouchableOpacity>
									<View>
										<Text>
											8101 Vermont
											Ave
										</Text>
										<Text>
											Los Angeles,
											CA 90044
										</Text>
									</View>
								</View>
							</View>
						</View>
						{/* Divider */}
						<View style={styles.divider}></View>
						{/* Body */}
						<View>
							<View
								style={{ flexDirection: "row" }}
							>
								<Image
									source={require("../../assets/organizations/community_coalition/Body1.png")}
								></Image>
								<View>
									<Text>
										Fighting for equal
										and equitable access
									</Text>
									<Text>
										to quality education
										+ resources
									</Text>
								</View>
							</View>
							<View
								style={{ flexDirection: "row" }}
							>
								<Image
									source={require("../../assets/organizations/community_coalition/Body2.png")}
								></Image>
								<View>
									<Text>
										Organized rallies
										and protests
									</Text>
								</View>
							</View>
							<View
								style={{ flexDirection: "row" }}
							>
								<Image
									source={require("../../assets/organizations/community_coalition/Body3.png")}
								></Image>
								<View>
									<Text>
										Encourages youth to
										utilize their
									</Text>
									<Text>voting power</Text>
								</View>
							</View>
						</View>
						{/* Divider */}
						<View style={styles.divider}></View>
						{/* Big Buttons */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text>Academics</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text>Socializing</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text>Organizing</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text>Wellness</Text>
								</TouchableOpacity>
							</View>
						</View>
						{/* Small Buttons */}
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								style={{
									backgroundColor:
										"#31A3F8",
									borderRadius: 15,
									borderWidth: 1,
								}}
							>
								<Text>Lens</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									borderRadius: 15,
									borderWidth: 1,
								}}
							>
								<Text>Contact</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									borderRadius: 15,
									borderWidth: 1,
								}}
							>
								<Text>Donate</Text>
							</TouchableOpacity>
						</View>
					</View>
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
	shadowEffect: {
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	largeButtonContainer: {
		height: 44,
		width: 146,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 15,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 7,
		marginBottom: 7,
	},
	smallButtonContainer: {},
	lensButtonContainer: {},
	subscribeButtonContainer: {},
	divider: {
		backgroundColor: "grey",
		width: Dimensions.get("window").width * 0.9,
		height: 2,
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
