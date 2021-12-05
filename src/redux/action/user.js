import axiosIntance from "../../helpers/axios";
import { CUSTOMER_ADDRESS_FAILURE, CUSTOMER_ADDRESS_REQUEST, CUSTOMER_ADDRESS_SUCCESS } from "./type";

export const getCustomerAddress = () => {
    return async (dispatch) => {
        dispatch({ type: CUSTOMER_ADDRESS_REQUEST });
        const res = await axiosIntance.get(`/user/customer/delivery-address/`);
        if (res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: CUSTOMER_ADDRESS_SUCCESS,
                payload: {
                    address: data,
                },
            });
        } else {
            dispatch({
                type: CUSTOMER_ADDRESS_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const createCustomerAddress = (address) => {
    return async (dispatch) => {
        const res = await axiosIntance.post(`/user/customer/delivery-address/new`, { ...address });
        if (res.status === 200) {
            dispatch(getCustomerAddress());
        }
    };
};

export const updateCustomerAddress = (customerAddressId, data) => {
    return async (dispatch) => {
        const res = await axiosIntance.put(`/user/customer/delivery-address/update/${customerAddressId}`, { ...data });
        if (res.status === 200) {
            dispatch(getCustomerAddress());
        }
    };
};