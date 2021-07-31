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
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

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
          coordinate={{
            latitude: 33.9652241906269, 
            longitude: -118.29209382938507
          }}
          image={require('../../assets/organizations/community_coalition/Marker.png')}
          title='Community Coalition'
          description='Supporting South LA'
        />
        <Marker
          coordinate={{
            latitude: 33.95000621928571, 
            longitude: -118.25372699815792
          }}
          image={require('../../assets/organizations/a_new_way_of_life_foundation/Marker.png')}
          title='A New Way of Life Foundation'
          description='Supporting South LA'
        />
        <Marker
          coordinate={{
            latitude: 33.9706323755787,
            longitude:  -118.25662670611676, 
          }}
          image={require('../../assets/organizations/youth_justice_coalition/Marker.png')}
          title='Youth Justice Coalition'
          description='Supporting South LA'
        />
        <Marker
          coordinate={{
            latitude: 34.01742729150679, 
            longitude: -118.27857477158378
          }}
          image={require('../../assets/organizations/acce_institute/Marker.png')}
          title='ACCE Institute'
          description='Supporting South LA'
        />
        <Marker
          coordinate={{
            latitude: 33.986072440676935, 
            longitude: -118.27652444626881,
          }}
          image={require('../../assets/bitmoji/CrossedArms.png')}
          title='Your Bitmoji'
          // description='Supporting South LA'
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
              style={{ marginTop: 5, marginLeft: 3 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <View 
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%',
          width: '100%',
          height: '50%',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <Text style={{top: 20, left: 20, fontSize: 20}}>
          Non-Profit Organizations
        </Text>
        
      </View>
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
