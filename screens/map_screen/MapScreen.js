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
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";

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
	const [bitmojiFrame, setBitmojiFrame] = useState(0);

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
		onEnd() {
			if (top.value > dimensions.height / 4) {
				top.value = dimensions.height;
			} else {
				top.value = dimensions.height / 3.3;
			}
		},
	});

	if (bitmojiFrame % 7 == 6) {
		mapView?.current.animateToRegion(
			{
				latitude: 33.9652241906269 - 0.0922 / 7.2,
				longitude: -118.29209382938507,
				latitudeDelta: 0.0922 / 2,
				longitudeDelta: 0.0421 / 2,
			},
			1000
		);
		top.value = withSpring(
			dimensions.height / 3.3,
			SPRING_CONFIG
		);
		setBitmojiFrame(0);
	}

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
								latitude:
									33.9652241906269 -
									0.0922 / 7.2,
								longitude: -118.29209382938507,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 3.3,
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
								latitude:
									33.95000621928571 -
									0.0922 / 7.2,
								longitude: -118.25372699815792,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 3.3,
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
								latitude:
									33.9706323755787 -
									0.0922 / 7.2,
								longitude: -118.25662670611676,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 3.3,
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
								latitude:
									34.01742729150679 -
									0.0922 / 7.2,
								longitude: -118.27857477158378,
								latitudeDelta: 0.0922 / 2,
								longitudeDelta: 0.0421 / 2,
							},
							1000
						);
						top.value = withSpring(
							dimensions.height / 3.3,
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
					onPress={() => {
						setBitmojiFrame(1);
					}}
					coordinate={{
						latitude: 33.986072440676935,
						longitude: -118.27652444626881,
					}}
					image={require("../../assets/bitmoji/map/ArmsOnWaist.png")}
					title="Danny"
				/>
			</MapView>
			{currLocation ? (
				<View style={styles.locateButtonContainer}>
					<TouchableOpacity
						style={{
							...styles.locateButton,
							...styles.shadowEffect,
						}}
						onPress={() => {
							goToCurrLocation();
							console.log("hi");
						}}
					>
						<Ionicons
							name={"navigate"}
							size={20}
							color={Colors.black}
							style={{
								marginTop: 5,
								marginLeft: 3,
							}}
						/>
					</TouchableOpacity>
				</View>
			) : null}
			{bitmojiFrame % 7 && bitmojiFrame % 7 != 6 ? (
				<>
					<View
						style={{
							position: "absolute",
							left: 0,
							top: 0,
						}}
					>
						<View
							style={{
								position: "absolute",
								backgroundColor: "black",
								opacity: 0.5,
								height: Dimensions.get("window")
									.height,
								width: Dimensions.get("window")
									.width,
							}}
						/>

						<TouchableOpacity
							style={{
								height: Dimensions.get("window")
									.height,
								width: Dimensions.get("window")
									.width,
							}}
							onPress={() => {
								setBitmojiFrame(
									bitmojiFrame + 1
								);
								console.log(bitmojiFrame % 6);
							}}
						>
							{bitmojiFrame % 7 == 1 ? (
								<Image
									style={{
										opacity: 1,
										top:
											Dimensions.get(
												"window"
											).height / 5,
									}}
									source={require("../../assets/bitmoji/walkthrough/1.png")}
								/>
							) : null}
							{bitmojiFrame % 7 == 2 ? (
								<>
									<Image
										style={{
											opacity: 1,
                      top: 70,
										}}
										source={require("../../assets/bitmoji/walkthrough/2.png")}
									/>
									<Image
										style={{
											opacity: 1,
											right: 20,
											bottom: 150,
											position: "absolute",
										}}
										source={require("../../assets/bitmoji/walkthrough/2-1.png")}
									/>
								</>
							) : null}
							{bitmojiFrame % 7 == 3 ? (
								<Image
									style={{
										opacity: 1,
										top:
											Dimensions.get(
												"window"
											).height / 6,
									}}
									source={require("../../assets/bitmoji/walkthrough/3.png")}
								/>
							) : null}
							{bitmojiFrame % 7 == 4 ? (
								<Image
									style={{
										opacity: 1,
										top:
											Dimensions.get(
												"window"
											).height / 5,
									}}
									source={require("../../assets/bitmoji/walkthrough/4.png")}
								/>
							) : null}
							{bitmojiFrame % 7 == 5 ? (
								<>
									<Image
										style={{
											opacity: 1,
											top:
												Dimensions.get(
													"window"
												)
													.height /
												3,
										}}
										source={require("../../assets/bitmoji/walkthrough/5.png")}
									/>
									<Image
										style={{
											opacity: 1,
											top: 150,
											left: 25,
											position: "absolute",
										}}
										source={require("../../assets/organizations/community_coalition/Option.png")}
									/>
									<Image
										style={{
											opacity: 1,
											top: 150,
											right: 25,
											position: "absolute",
										}}
										source={require("../../assets/organizations/a_new_way_of_life_foundation/Option.png")}
									/>
									<Image
										style={{
											opacity: 1,
											top: 500,
											right: 50,
											position: "absolute",
										}}
										source={require("../../assets/organizations/youth_justice_coalition/Option.png")}
                    
									/>
								</>
							) : null}
						</TouchableOpacity>
					</View>
				</>
			) : null}

			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={goToCurrLocation}
			>
				<Animated.View
					style={[
						{
							position: "absolute",
							left: 0,
							right: 0,
							bottom: 0,
							// top: dimensions.height,
							backgroundColor: "white",
							borderTopLeftRadius: 18,
							borderTopRightRadius: 18,
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
					<View style={{ alignItems: "center" }}>
						{/* Header */}
						<View
							style={{
								flexDirection: "row",
								marginRight: 25,
							}}
						>
							<TouchableOpacity>
								<Image
									style={{
										marginRight: 10,
									}}
									source={require("../../assets/organizations/community_coalition/Icon.png")}
								/>
							</TouchableOpacity>
							<View style={{}}>
								<Text
									style={{
										fontWeight: "700",
										fontSize: 20,
										marginLeft: 5,
										marginBottom: 5,
									}}
								>
									Community Coalition
								</Text>
								<View
									style={{
										flexDirection:
											"row",
										alignItems:
											"center",
										justifyContent:
											"space-between",
									}}
								>
									<TouchableOpacity
										style={{
											...styles.subscribeButtonContainer,
											...styles.shadowEffect,
										}}
									>
										<Text
											style={{
												fontWeight:
													"600",
											}}
										>
											Subscribe
										</Text>
									</TouchableOpacity>
									<View
										style={{
											margin: 5,
										}}
									>
										<Text
											style={{
												fontSize: 10,
											}}
										>
											8101 Vermont
											Ave
										</Text>
										<Text
											style={{
												fontSize: 10,
											}}
										>
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
						<View style={{ alignSelf: "center" }}>
							<View
								style={{ flexDirection: "row" }}
							>
								<Image
									style={{ marginRight: 5 }}
									source={require("../../assets/organizations/community_coalition/Body1.png")}
								></Image>
								<View
									style={{
										justifyContent:
											"center",
									}}
								>
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
									style={{ marginRight: 5 }}
									source={require("../../assets/organizations/community_coalition/Body2.png")}
								></Image>
								<View
									style={{
										justifyContent:
											"center",
									}}
								>
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
									style={{ marginRight: 5 }}
									source={require("../../assets/organizations/community_coalition/Body3.png")}
								></Image>
								<View
									style={{
										justifyContent:
											"center",
									}}
								>
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
						<View style={{ flexDirection: "row" }}>
							<View>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text
										style={{
											fontWeight:
												"600",
										}}
									>
										Academics
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text
										style={{
											fontWeight:
												"600",
										}}
									>
										Socializing
									</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text
										style={{
											fontWeight:
												"600",
										}}
									>
										Organizing
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										...styles.largeButtonContainer,
										...styles.shadowEffect,
									}}
								>
									<Text
										style={{
											fontWeight:
												"600",
										}}
									>
										Wellness
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						{/* Small Buttons */}
						<View
							style={{
								flexDirection: "row",
								marginTop: 5,
							}}
						>
							<TouchableOpacity
								style={{
									...styles.smallButtonContainer,
									...styles.shadowEffect,
									backgroundColor:
										"#31A3F8",
								}}
							>
								<Text
									style={{
										fontWeight: "600",
										color: "white",
									}}
								>
									Lens
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									...styles.smallButtonContainer,
									...styles.shadowEffect,
								}}
							>
								<Text
									style={{
										fontWeight: "600",
									}}
								>
									Contact
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.smallButtonContainer,
									styles.shadowEffect,
								]}
							>
								<Text
									style={{
										fontWeight: "600",
									}}
								>
									Donate
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
			</PanGestureHandler>

			<View style={{ flexDirection: "row", }}>
				<Image
					style={{
						position: "absolute",
						left: 15,
						top: 50,
					}}
					source={require("../../assets/dansHead_logo.png")}
				></Image>
				<Image
					style={{
						position: "absolute",
						right: 15,
						top: 50,
						// center: true,\
						// zIndex: 100,
						// alignItems: "center",
					}}
					source={require("../../assets/Group_194.png")}
				></Image>
			</View>
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
	smallButtonContainer: {
		height: 29,
		width: 81,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 15,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 7,
		marginBottom: 7,
	},
	subscribeButtonContainer: {
		width: 81,
		height: 30,
		borderRadius: 30,
		backgroundColor: "#FFFB54",
		alignItems: "center",
		justifyContent: "center",
		margin: 5,
	},
	divider: {
		backgroundColor: "#c4c4c4",
		width: Dimensions.get("window").width * 0.9,
		height: 1,
		marginTop: 10,
		marginBottom: 10,
	},
	locateButtonContainer: {
		position: "absolute",
		bottom: 20,
		left: Dimensions.get("window").width * 0.5 - 12,
	},
	locateButton: {
		height: 30,
		width: 30,
		borderRadius: 25,
		backgroundColor: "white",
	},
});
