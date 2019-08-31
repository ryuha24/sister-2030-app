import {login, loginFailure, loginSuccess, signUpFailure, signUpSuccess, crawlingInfoSuccess, crawlingInfoFailure} from './action';
import {all, call, put, takeEvery} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

import {setMainNavigation,updateData, updateUser} from '../../reducers/data/action';

import api from '../../api/api';

function navigateToMain(navigation) {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}

function navigateToLoading(navigation) {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'Loading' }));
}

function navigateToInstagramCheck(navigation) {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'InstagramCheck' }));
}

function* crawlingInstagram(action) {
    try {
        let instagramInfo = yield call(api, 'GET', '/users/crawling/'+action.instaId, {});
        const data = {
            // instagram: yield put(updateData(instagramInfo)),
            instagram: instagramInfo,
            signUpInfo: action
        };
        yield put(updateData(data));
        yield call(navigateToInstagramCheck, action.navigation);
        yield put(crawlingInfoSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(crawlingInfoFailure());
        alert('아이디, 비밀번호 또는 인스타아이디를 \n 잘못 입력 하셨습니다.');
    }
}

function* signUp(action) {
    try {
        let signUpUser = yield call(api, 'POST', '/users/register', {
            nickname: action.nickname,
            email: action.email,
            password: action.password,
            instagramId: action.instaId,
            following: action.following,
            follower: action.follower,
            post: action.post,
            profileUrl: action.profileUrl
        });
        yield put(login(action.email, action.password, action.navigation));
        yield put(signUpSuccess(signUpUser));
    } catch(err) {
        action.navigation.pop();
        yield put(signUpFailure());
        alert('회원가입 실패!');
    }
}

function* loginUser(action) {
    try {
        let userInfo = yield call(api, 'POST', '/users/login', {email: action.email, password: action.password});
        // const data = yield all({
        //     user: call(api, 'GET', '/users/mypage/'+userInfo.id, {}), //instagramId, follower, following, applicationInfo
        // });
        //
        yield put(updateUser(userInfo));
        yield call(navigateToMain, action.navigation);
        yield put(loginSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(loginFailure());
        alert('로그인 실패!');
    }
}

function* logoutUser(action) {
    try {
        console.log("saga", action);
        yield call(api, 'GET', '/users/logout');
        yield call(navigateToLoading, action.navigation);
    } catch(err) {
        action.navigation.pop();
        alert('로그아웃 실패!');
    }
}

function* getProfile(action) {
    try {
        let userInfo = yield call(api, 'GET', '/users/mypage/'+action.id, {});
        const data = yield all({
            user: call(api, 'GET', '/users/mypage/'+action.id, {}), //instagramId, follower, following, applicationInfo
        });
        let user = data.user;
        let inputUser = {
            id: user.USER_ID,
            email: user.USER_EMAIL,
            name : user.USER_NICKNAME,
            profileUrl: user.USER_PROFILE_URL,
            following: user.USER_FOLLOWING,
            follower: user.USER_FOLLOWER,
            post: user.USER_POST,
            instagram: user.USER_INSTAGRAM_ID,
            point: user.USER_POINT
        };

        yield put(updateUser(inputUser));
        yield call(navigateToMain, action.navigation);
        yield put(loginSuccess());
    } catch(err) {
        action.navigation.pop();
        yield put(loginFailure());
        alert('로그인 실패!');
    }
}

function* accountSaga() {
    yield takeEvery('GET_PROFILE', getProfile);
    yield takeEvery('LOGOUT', logoutUser);
    yield takeEvery('LOGIN', loginUser);
    yield takeEvery('SIGN_UP', signUp);
    yield takeEvery('CRAWLING', crawlingInstagram);
}

export default accountSaga;