import { RATE_PRODUCT_FAILURE, RATE_PRODUCT_REQUEST, RATE_PRODUCT_SUCCESS } from "../action/type";

const initState = {
    rates: [],
    order_code: null,
    loading: false,
    error: "",
    messages: "",
};

export default (state = initState, action) => {
    switch (action.type) {
        case RATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case RATE_PRODUCT_SUCCESS:
            state = {
                ...initState,
                loading: false,
                rates: action.payload.rates,
            };
            break;
        case RATE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};