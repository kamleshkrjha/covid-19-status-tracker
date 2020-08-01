//this will export root saga
import { all } from 'redux-saga/effects'
import watchChangeState from './statesSaga';
import watchChangeCountry from './countriesSaga';



export default function* rootSaga() {
  yield all([
    watchChangeState(),
    watchChangeCountry()
  ]);
}
