import initialState from '../../reducers/initialState';

export default function accountReducer (state = initialState.account, action) {
    switch (action.type) {
        case 'CRAWLING':
            return {
                ...state,
                instagram: {
                    succeed: false,
                }
            };
        case 'CRAWLING_SUCCESS':
            return {
                ...state,
                instagram: {
                    succeed: true,
                }
            };
        case 'CRAWLING_FAILURE':
            return {
                ...state,
                instagram: {
                    succeed: false,
                }
            };
        case 'SIGN_UP':
            return {
                ...state,
                login: {
                    succeed: false,
                }
            };
        case 'SIGN_UP_SUCCESS':
            return {
                ...state,
                signUp: {
                    succeed: true,
                }
            };
        case 'SIGN_UP_FAILURE':
            return {
                ...state,
                signUp: {
                    succeed: false,
                }
            };
        case 'LOGIN':
            return {
                ...state,
                login: {
                    succeed: false,
                }
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                login: {
                    succeed: true,
                }
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                login: {
                    succeed: false,
                }
            };
        default:
            return state;
    }
}