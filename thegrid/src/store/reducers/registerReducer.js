import { TOGGLE_MAIN, SET_USER_ID } from '../actions/master';

const initialState = {
    isSignUp: false,
    userID: ''
}

export const registerReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_MAIN:
            return {
                ...state,
                isSignUp: !state.isSignUp
            };
        case SET_USER_ID:
            return {
                ...state,
                userID: action.payload
            }
        default:
            return state
    };
};