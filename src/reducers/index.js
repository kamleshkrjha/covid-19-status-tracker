import { combineReducers } from 'redux';
import countriesReducer from '../features/countries/countriesSlice';
import statesReducer from '../features/states/statesSlice';

export default combineReducers({
  countries: countriesReducer,
  states: statesReducer
});