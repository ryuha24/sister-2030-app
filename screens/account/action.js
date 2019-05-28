export const crawlingInfo = (nickname, email, password, instaId, navigation) => ({
    type: 'CRAWLING',
    nickname: nickname,
    email: email,
    password: password,
    instaId: instaId,
    navigation: navigation
});

export const crawlingInfoSuccess = () => ({
    type: 'CRAWLING_SUCCESS'
});

export const crawlingInfoFailure = () => ({
    type: 'CRAWLING_FAILURE'
});
export const signUp = (nickname, email, password, instaId, follower, following, profileUrl, navigation) => ({
    type: 'SIGN_UP',
    nickname: nickname,
    email: email,
    password: password,
    instaId: instaId,
    follower: follower,
    following: following,
    profileUrl: profileUrl,
    navigation: navigation
});

export const signUpSuccess = () => ({
    type: 'SIGN_UP_SUCCESS'
});

export const signUpFailure = () => ({
    type: 'SIGN_UP_FAILURE'
});

export const login = (email, password, navigation) => ({
    type: 'LOGIN',
    email: email,
    password: password,
    navigation: navigation
});

export const loginSuccess = () => ({
    type: 'LOGIN_SUCCESS'
});

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE'
});

