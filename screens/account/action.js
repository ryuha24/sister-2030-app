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
export const signUp = (nickname, email, password, instaId, follower, following, post, profileUrl, navigation) => ({
    type: 'SIGN_UP',
    nickname: nickname,
    email: email,
    password: password,
    instaId: instaId,
    follower: follower,
    following: following,
    post: post,
    profileUrl: profileUrl,
    navigation: navigation
});

export const signUpSuccess = (signUpUser) => ({
    type: 'SIGN_UP_SUCCESS',
    data: signUpUser
});

export const signUpFailure = () => ({
    type: 'SIGN_UP_FAILURE'
});

export const logout = (navigation) =>({
    type: 'LOGOUT',
    navigation: navigation
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

export const getProfile = (userId, navigation) => ({
    type: 'GET_PROFILE',
    id: userId,
    navigation: navigation
});