const initialState = {
    app: {
        loading_information: {
            progress: 0,
            total: 0,
            text: '서버로부터 응답을 받는 중입니다 :)'
        }
    },
    data: {
        navigation: {},
        user: {},
        instagram: {},
        signUpInfo: {},
        campaigns: []
    },
    account: {
        login: {
            succeed: false,
        },
        sign_up: {
            succeed: false
        },
        instagram: {
            succeed: false,
        }
    },
};

export default initialState;