export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_RES = 'LOADING_RES';
export const SET_USER_ID = 'SET_USER_ID';

export const TOGGLE_ADD = 'TOGGLE_ADD';
export const TOGGLE_USER = 'TOGGLE_USER';
export const TOGGLE_MAIN = 'TOGGLE_MAIN';
export const TOGGLE_USER_VIEW = 'TOGGLE_USER_VIEW';

export const setErrors = (err) => (dispatch) => {
    dispatch({ type: GET_TODO_FAIL, payload: err.message })
}

export const loadingRes = () => (dispatch) => {
    dispatch({ type: LOADING_RES })
}

export const setUserID = (res) => (dispatch) => {
    dispatch({ type: SET_USER_ID, payload: res })
}

export const toggleAdd = () => (dispatch) => {
    dispatch({ type: TOGGLE_ADD })
}

export const toggleUser = () => (dispatch) => {
    dispatch({ type: TOGGLE_USER })
}

export const toggleMain = () => (dispatch) => {
    dispatch({ type: TOGGLE_MAIN })
}

export const toggleViewUser = () => (dispatch) => {
    dispatch({ type: TOGGLE_USER_VIEW })
}
