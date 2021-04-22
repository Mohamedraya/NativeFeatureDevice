import ADD_PLACE, { SET_PLACES } from './places_actions';
import Place from '../models/Place';

const initialState = {
    Places: []
};

export default places_reducer = (state= initialState,action) => {

    switch (action.type) {

        case SET_PLACES:
            return {
                places: action.places.map(pl => new Place(pl.id.toString(),pl.title,pl.imageUri,
                                                pl.addrees,pl.lat,pl.lng))
            };
        case ADD_PLACE:
           const newPlace = new Place(action.placeData.id.toString(),action.placeData.title,action.placeData.image,
                                      action.placeData.addrees,action.placeData.coords.lat,action.placeData.coords.lng);
             return {
                Places: state.Places.concat(newPlace)
             };

            default:
                return state;
    }

};