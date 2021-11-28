import { ADD_ORDER_FAILURE, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS } from "./type";
import axiosIntance from "../../helpers/axios";

export const addOrder = (data) => {
    console.log(data);
    return async (dispatch) => {
        dispatch({ type: ADD_ORDER_REQUEST });
        const res = await axiosIntance.post(`/order/new`, { ...data });
        if (res.status === 200) {
            dispatch({
                type: ADD_ORDER_SUCCESS,
            });
        } else {
            dispatch({
                type: ADD_ORDER_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};