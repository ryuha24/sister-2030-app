import {loginFailure, loginSuccess, signUpFailure, signUpSuccess, crawlingInfoSuccess, crawlingInfoFailure} from './action';
import {all, call, put, takeEvery} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

import {setMainNavigation,updateData} from '../../reducers/data/action';

import api from '../../api/api';

function navigateToMain(navigation) {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}

function navigateToInstagramCheck(navigation) {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'InstagramCheck' }));
}

function* crawlingInstagram(action) {
    try {
        let instagramInfo = yield call(api, 'GET', '/users/crawling/'+action.instaId, {});
        const data = {
            instagram: yield put(updateData(instagramInfo)),
            signUpInfo: action
        };
        yield put(updateData(data));
        yield call(navigateToInstagramCheck, action.navigation);
        yield put(crawlingInfoSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(crawlingInfoFailure());
        alert('정보 확인 필요!');
    }
}

function* signUp(action) {
    try {
        yield call(api, 'POST', '/users/register', {
            nickname: action.nickname,
            email: action.email,
            password: action.password,
            instagramId: action.instaId,
            following: action.following,
            follower: action.follower,
            profileUrl: action.profileUrl
        });
        yield call(navigateToMain, action.navigation);
        yield put(signUpSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(signUpFailure());
        alert('회원가입 실패!');
    }
}

function* login(action) {
    try {
        let userInfo = yield call(api, 'POST', '/users/login', {email: action.email, password: action.password});
        const data = yield all({
            user: call(api, 'GET', '/users/userInfo/'+userInfo.id, {}), //instagramId, follower, following, applicationInfo
            campaigns: call(api, 'GET', '/campaign', {}),
        });

        yield put(updateData(data));
        yield call(navigateToMain, navigation);
        yield put(loginSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(loginFailure());
        alert('로그인 실패!');
    }
}

function* accountSaga() {
    yield takeEvery('LOGIN', login);
    yield takeEvery('SIGN_UP', signUp);
    yield takeEvery('CRAWLING', crawlingInstagram);
}

export default accountSaga;