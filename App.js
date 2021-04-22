import { StatusBar } from 'expo-status-bar';
import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'; 
import places_reducer from './store/places_reducer';
import {init} from './helpers/db';


init().then(() => {
  console.log("initialized database");
}).catch(err => {
  console.log("initialzing db failed");
  console.log(err);
});

const rootReducer = combineReducers({
    places: places_reducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator/>
    </Provider>
    
  );
}
