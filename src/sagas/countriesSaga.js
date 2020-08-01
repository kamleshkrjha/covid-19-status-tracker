import { takeEvery, call, put } from 'redux-saga/effects';
import { changeCountry } from '../features/countries/countriesSlice';
import { fetchData } from '../api';
import sagaActions from '../sagaActions';

function* fetchDataSaga({ type, payload }) {
  try {
    const data = yield call(fetchData, payload);
    const nextPayload = { country: payload, data };
    yield put(changeCountry(nextPayload));
  } catch (e) {
    console.log('API call failed');
  }
}

export default function* watchChangeCountry() {
  yield takeEvery(sagaActions.FETCH_GLOBAL_SAGA, fetchDataSaga);
}