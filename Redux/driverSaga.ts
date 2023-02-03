import { call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {REQUEST_API_DATA, receiveApiData } from './actions'
import { fetchData } from './api'

interface IAction {
    type: string;
    payload: any;
  }


function* getApiData(action: IAction): any {
    try {
        const page = action.payload
        const data = yield call(fetchData, page)
        yield put(receiveApiData(data))
    } catch (e) {
        console.log(e)
    }
}

export default function* driverSaga() {
    yield takeLatest( REQUEST_API_DATA , getApiData)
}