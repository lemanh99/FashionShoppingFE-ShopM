import axiosIntance from "../../helpers/axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./type";

export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTER_REQUEST,
            });
            const res = await axiosIntance.post(`/user/customer/new`, {
                ...user,
            });

            if (res.status === 200) {
                const { message } = res.data;
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: { message },
                });
                dispatch(signin(user));
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: REGISTER_FAILURE,
                        payload: { error: res.data.error },
                    });
                }
            }
        } catch (error) { }
    };
};

export const login = (user) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });

        const res = await axiosIntance.post(`/user/login/`, {
            ...user,
        });
        try {
            if (res.status === 200) {
                // const { token, user } = res.data;
                const { data } = res.data;
                console.log(data);
                const token = data.access;
                const refresh = data.refresh;
                localStorage.setItem("token", token);
                localStorage.setItem("refresh", refresh);

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        token,
                        // user,
                    },
                });
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: {
                            error: res.data.error,
                        },
                    });
                }
            }
        } catch (error) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    error: "Error Server",
                },
            });
        }
    };
};

export const isCustomerLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    error: ' Please login first'
                }
            })
        }
    };
};

export const verifyToken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const res = await axiosIntance.post(`/user/jwt/verify/`, {
                token: token,
            });
            if (res.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        token,
                    },
                });
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: {
                            error: res.data.error,
                        },
                    });
                }
            }
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    error: ' Please login first'
                }
            })
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: LOGOUT_REQUEST });
        const res = await axiosIntance.post(`/admin/signout`);
        console.log("Logout", res)
        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: LOGOUT_FAILURE,
                payload: res.data.error,
            });
        }
    };
};