import axiosIntance from "../../helpers/axios";
import { RATE_PRODUCT_FAILURE, RATE_PRODUCT_REQUEST, RATE_PRODUCT_SUCCESS } from "./type";

export const getRateByProduct = (product_id) => {
    return async (dispatch) => {
        dispatch({ type: RATE_PRODUCT_REQUEST });
        const res = await axiosIntance.get(`/product/rate/${product_id}`);
        if (res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: RATE_PRODUCT_SUCCESS,
                payload: {
                    rates: data,
                },
            });
        } else {
            dispatch({
                type: RATE_PRODUCT_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const getRateByProductBySlug = (slug) => {
    return async (dispatch) => {
        dispatch({ type: RATE_PRODUCT_REQUEST });
        const res = await axiosIntance.get(`/product/rate/slug/${slug}`);
        if (res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: RATE_PRODUCT_SUCCESS,
                payload: {
                    rates: data,
                },
            });
        } else {
            dispatch({
                type: RATE_PRODUCT_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const rateProduct = (product_id, data) => {
    return async (dispatch) => {
        const res = await axiosIntance.post(`/product/rate/create/`, {...data});
        if (res.status === 200) {
            dispatch(getRateByProduct(product_id))
        }
    };
};