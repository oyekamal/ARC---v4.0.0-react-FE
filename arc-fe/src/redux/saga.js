import { put, takeLatest, call } from 'redux-saga/effects';
import request from '../request'

// import request

import { message } from 'antd';
import { loadListDevices, listDevicesLoaded, listDevicesLoadingError } from './slice';

export function* getListDevices() {
    console.log('sf')
    const requestURL = `http://localhost:8000/device`
    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = yield call(request, requestURL, options);
        console.log(response, requestURL )
        yield put(listDevicesLoaded(response));

    } catch (error) {
        yield put(listDevicesLoadingError());
        message.error({
            content: "Get Device List failed",
        });

    }
}


export default function* arcWatcherSaga() {
    yield takeLatest(loadListDevices.type, getListDevices);
}