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

import React, { useState, useEffect, useRef } from "react";
import Colors from "../../constants/Colors";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

const LOS_ANGELES_REGION = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const [currLocation, setCurrLocation] = useState(null);
  const mapView = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
        latitude: currLocation.latitude,
        longitude: currLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };

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
              style={{ marginTop: 5, marginLeft: 3 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
