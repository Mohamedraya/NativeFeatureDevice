import React ,{useEffect, useState}from 'react';
import {View,Text,Button,ActivityIndicator,Alert,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';


const LocationPicker = (props) => {

    const [isFetching,setIsFetching] = useState();
    const [pickedLocation,setPickedLocation] = useState();

    const mapPickedLocation = props.navigation.getParams("pickedLocation");
    const onLocationPicked = props;

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    },[mapPickedLocation,onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted') {
           Alert.alert('insufficient Permissions!',
           'you need to grant location permissions to use this app',
           [{text: 'Okay'}]);
    
           return false;
        }
    
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }
        try {
          setIsFetching(true);  
          const location = await Location.getCurrentPositionAsync({timeout: 5000});
          console.log(location);
          setPickedLocation({
              lat: location.coords.latitude,
              lng: location.coords.longitude
          });
          props.onLocationPicked({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
        }
        catch (err) {
            Alert.alert('could not fetch location!' , 'please try again',({text:'Okay'}));
        }
        setIsFetching(false);     
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map");
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
              <View style={styles.mapPreview}>
                {isFetching ? <ActivityIndicator size="large"/> : <Text>No Loaction Chosen yet!</Text>}
              </View>
            </MapPreview>
            <View style={styles.actions}>
              <Button title= "Get User Location" onPress={getLocationHandler}/>
              <Button title= "pick on map" onPress={pickOnMapHandler}/>
            </View>
            
        </View>
        );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },

    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,        
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
});

export default LocationPicker;