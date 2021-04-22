import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer}   from 'react-navigation';
import PlacesListScreen  from  '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen    from '../screens/NewPlaceScreen';
import MapScreen         from '../screens/MapScreen';
import {Platform} from 'react-native';
import Colors from '../constant/Colors'; 


const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PLaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
           backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(PlacesNavigator);

