import { ADD_ORDER_FAILURE, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, GET_HISTORY_ORDER_REQUEST, GET_HISTORY_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_LASTED } from "./type";
import axiosIntance from "../../helpers/axios";

export const addOrder = (order) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ORDER_REQUEST });
        const res = await axiosIntance.post(`/order/new`, { ...order });
        const { data } = res.data;
        if (res.status === 200) {
            dispatch({
                type: ADD_ORDER_SUCCESS,
                order_code: data.order_code,
            });
        } else {
            dispatch({
                type: ADD_ORDER_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const getOrderByOrderCode = (code) => {
    return async (dispatch) => {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST });
        const res = await axiosIntance.get(`/order/detail/${code}`);
        if (res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: GET_ORDER_BY_ID_SUCCESS,
                payload: {
                    orders: data,
                },
            });
        } else {
            dispatch({
                type: GET_ORDER_BY_ID_FAILURE,
                payload: { error: null },
            });
        }
    };
};

export const getOrderHistory = () => {
    return async (dispatch) => {
      dispatch({ type: GET_HISTORY_ORDER_REQUEST });
      const res = await axiosIntance.get(`/order/customer/history`);
      if (res.status === 200) {
        const { data } = res.data;
        dispatch({
          type: GET_HISTORY_ORDER_SUCCESS,
          payload: {
            orders: data,
          },
        });
      } else {
        dispatch({
          type: GET_HISTORY_ORDER_FAILURE,
          payload: "",
        });
      }
    };
  };

  export const cancelOrder = (id) => {
    return async (dispatch) => {
      const res = await axiosIntance.put(`/order/customer/cancel/${id}`);
      if (res.status === 200) {
          dispatch(getOrderHistory())
      }
    };
  };
  

  export const getOrderLasted = () => {
    return async (dispatch) => {
      const res = await axiosIntance.get(`/order/customer/last-order`);
      if (res.status === 200) {
        const { data } = res.data;
        dispatch({
          type: GET_ORDER_LASTED,
          payload: data,
        });
      } else {
        dispatch({
          type: orderConstants.GET_ORDER_LASTED,
          payload: [],
        });
      }
    };
  };