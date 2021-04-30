import { combineReducers } from 'redux';
import { registerReducer } from './registerReducer';
import { userReducer } from './userReducer';


export const rootReducer = combineReducers({
    registerReducer,
    userReducer
});