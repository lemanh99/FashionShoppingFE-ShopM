import { ADD_ORDER_FAILURE, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "../action/type";

const initState = {
    addOrder: false,
    orders: [],
    loading: false,
    error: "",
    messages: "",
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_ORDER_BY_ID_REQUEST:
            state = {
                ...state,
                addOrder: false,
                loading: true,
            };
            break;
        case GET_ORDER_BY_ID_SUCCESS:
            state = {
                ...initState,
                loading: false,
                orders: action.payload.orders,
            };
            break;
        case GET_ORDER_BY_ID_FAILURE:
            state = {
                ...state,
                addOrder: false,
                loading: false,
                error: action.payload.error,
            };
            break;
        case ADD_ORDER_REQUEST:
            state = {
                ...state,
                addOrder: false,
                loading: true,
            };
            break;
        case ADD_ORDER_SUCCESS:
            state = {
                ...state,
                addOrder: true,
                loading: false,
            };
            break;
        case ADD_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};