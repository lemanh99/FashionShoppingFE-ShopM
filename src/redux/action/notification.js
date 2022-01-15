import axiosIntance from "../../helpers/axios";
import { NOTIFICATION_FAILURE, NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS } from "./type";

export const getNotification = () => {
    return async (dispatch) => {
        dispatch({ type: NOTIFICATION_REQUEST });
        const res = await axiosIntance.get(`/notification/user`);
        
        if (res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: {
                    notifications: data,
                },
            });
        } else {
            dispatch({
                type: NOTIFICATION_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};