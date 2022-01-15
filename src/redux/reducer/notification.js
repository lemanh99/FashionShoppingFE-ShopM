import { NOTIFICATION_FAILURE, NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS } from "../action/type";

const initState = {
    notifications: [],
    loading: false,
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case NOTIFICATION_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case NOTIFICATION_SUCCESS:
            state = {
                ...initState,
                loading: false,
                notifications: action.payload.notifications,
            };
            break;
        case NOTIFICATION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};