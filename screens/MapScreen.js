import React ,{useState,useEffect,useCallback}from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Platform} from 'react-native';
import MapView , {Marker} from 'react-native-maps'

const MapScreen = props => {
    const initialLocation = props.navigation.getParams("initialLocation");
    const readonly        = props.navigation.getParams("readonly");

    const [selectedLocation,setSelectedLocation] = useState(initialLocation);
    const mapRegion = {
        latitude : initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelte: 0.0421 
    };

    const selectLocationHandler = event => {
        if(readonly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            return;
        }
        props.navigation.navigate("NewPlace",{pickedLocation: selectedLocation});
    },[selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler});
    },[savePickedLocationHandler]);

    let markerCoordinates;

    if(selectedLocation) {
       markerCoordinates = {
           latitude: selectedLocation.lat,
           longitude: selectedLocation.lng
       };
    }

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates && (<Marker title= "PickedLocation" coordinate={markerCoordinates}>

            </Marker>)}
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {

    const saveFn   = navData.navigation.getParams("saveLocation");
    const readonly = navData.navigation.getParams("readonly");
    
    if(readonly) {
        return;
    }

    return {
        headerRight:<TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                       <Text style={styles.headerButtonText}>Save</Text>
                    </TouchableOpacity>        
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    headerButton: {
        marginHorizontal: 20
    },

    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === "android" ? "white" : "red"
    }
});

export default MapScreen;