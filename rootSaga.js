import { all } from 'redux-saga/effects';

import accoutSaga from './screens/account/saga';

export default function* rootSaga() {
    yield all([
        accoutSaga()
    ]);
}