import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosIntance from "../helpers/axios";
import { LOGIN_SUCCESS } from "../redux/action/type";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const Router = useRouter();
        const [verified, setVerified] = useState(false);

        useEffect(async () => {
            const token = localStorage.getItem("token");
            // if no accessToken was found,then we redirect to "/" page.
            if (!token) {
                Router.replace("/login");
            } else {
                // we call the api that verifies the token.
                const res = await axiosIntance.post(`/user/jwt/verify/`, {
                    token: token,
                });
                if (res && res.status === 200) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            token,
                        },
                    });
                    setVerified(true);
                } else {
                    localStorage.removeItem("token");
                    Router.replace("/");
                }
            }
        }, []);

        if (verified) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withAuth;