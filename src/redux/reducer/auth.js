import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../action/type";

const initState = {
    token: null,
    authenticate: false,
    authenticating: false,
    register: false,
    loading: false,
    error: "",
    message: "",
};



export default (state = initState, action) => {
    console.log(state.type)
    switch (action.type) {
        case REGISTER_REQUEST:
            state = {
                ...initState,
            };
            break;
        case REGISTER_SUCCESS:
            state = {
                ...initState,
                register: true,
                message: action.payload.message,
            };
            break;
        case REGISTER_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false,
            };
            break;
        case LOGIN_REQUEST:
            state = {
                ...state,
                register: false,
                authenticating: true,
            };
            break;
        case LOGIN_SUCCESS:
            state = {
                ...state,
                register: false,
                token: action.payload.token,
                loading: false,
                authenticate: true,
                authenticating: false,
            };
            break;
        case LOGIN_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false,
            };
            break;

        case LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case LOGOUT_SUCCESS:
            state = {
                ...initState,
                message: "Logout Success",
            };

            break;
        case LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
    }
    return state;
};