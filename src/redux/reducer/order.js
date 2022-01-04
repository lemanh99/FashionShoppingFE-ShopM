import { ADD_ORDER_FAILURE, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, GET_HISTORY_ORDER_FAILURE, GET_HISTORY_ORDER_REQUEST, GET_HISTORY_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_LASTED } from "../action/type";

const initState = {
    addOrder: false,
    orders: [],
    order_code: null,
    loading: false,
    historyOrder: [],
    error: "",
    messages: "",
    orderLasted: [],
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

        case GET_HISTORY_ORDER_REQUEST:
            state = {
                ...initState,
                addOrder: false,
                loading: true,
            };
            break;
        case GET_HISTORY_ORDER_SUCCESS:
            state = {
                ...initState,
                loading: false,
                historyOrder: action.payload.orders,
            };
            break;
        case GET_HISTORY_ORDER_FAILURE:
            state = {
                ...state,
                historyOrder: [],
                addOrder: false,
                loading: false,
            };
            break;
        case ADD_ORDER_REQUEST:
            state = {
                ...state,
                order_code: null,
                addOrder: false,
                loading: true,
            };
            break;
        case ADD_ORDER_SUCCESS:
            state = {
                ...state,
                addOrder: true,
                order_code: action.order_code,
                loading: false,
            };
            break;
        case ADD_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                order_code: null,
                error: action.payload.error,
            };
            break;

        case GET_ORDER_LASTED:
            state = {
                ...state,
                orderLasted: action.payload
            };
            break;
    }

    return state;
};