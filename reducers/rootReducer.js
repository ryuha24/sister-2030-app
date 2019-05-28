
import { combineReducers } from 'redux';

import initialState from './initialState';

import accountReducer from '../screens/account/reducer';
import dataReducer from './data/reducer';


const rootReducer = combineReducers({
    data: dataReducer,
    account: accountReducer
});

export default rootReducer;