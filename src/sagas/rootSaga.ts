import { put, takeLatest } from 'redux-saga/effects'
import { fetchReviews, setError, setLoading, setReviews } from '../slices/reviewsSlice.ts';
import { reviews } from '../mockData.ts';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* fetchReviewsSaga(action) {
  try {
    yield put(setLoading(true));

    // имитируем загрузку по сети, т.к. нет бэкенда
    yield delay(1000)

    yield put(setReviews(reviews))
  } catch (e) {
    yield put(setError(e.message))
  } finally {
    yield put(setLoading(false));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchReviews, fetchReviewsSaga)
}
