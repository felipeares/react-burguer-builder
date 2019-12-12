import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: actions.token,
        userId: actions.userId,
        error: null
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.error
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
        authRedirectPath: actions.path
      };
    default:
      return state;
  }
};

export default reducer;
