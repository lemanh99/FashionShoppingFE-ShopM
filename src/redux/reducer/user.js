import { CUSTOMER_ADDRESS_FAILURE, CUSTOMER_ADDRESS_REQUEST, CUSTOMER_ADDRESS_SUCCESS } from "../action/type";

const initState = {
    address: [],
    loading: false,
    error: "",
    messages: "",
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case CUSTOMER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case CUSTOMER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case CUSTOMER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};