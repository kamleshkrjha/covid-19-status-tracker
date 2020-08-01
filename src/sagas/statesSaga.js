import { takeEvery, call, put } from 'redux-saga/effects';
import { changeState } from '../features/states/statesSlice';
import { fetchLatestDataIndia } from '../api';
import sagaActions from '../sagaActions';

function* fetchDataSaga({ type, payload }) {
  try {
    const data = yield call(fetchLatestDataIndia, payload);
    const nextPayload = { province: payload, data };
    yield put(changeState(nextPayload));
  } catch (e) {
    console.log('API call failed');
  }
}

export default function* watchChangeState() {
  yield takeEvery(sagaActions.FETCH_INDIAN_SAGA, fetchDataSaga);
}