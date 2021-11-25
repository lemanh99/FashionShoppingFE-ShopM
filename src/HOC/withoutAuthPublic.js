import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosIntance from "../helpers/axios";
import { LOGIN_SUCCESS } from "../redux/action/type";

const withoutAuthPublic = (WrappedComponent) => {
    return (props) => {
        const router = useRouter()
        const dispatch = useDispatch();
        const Router = useRouter();
        const [verified, setVerified] = useState(false);
        const auth = useSelector((state) => state.auth);

        useEffect(async () => {
            const token = localStorage.getItem("token");
            // if no accessToken was found,then we redirect to "/" page.
            if (!token) {
                Router.replace(`/${router.pathname}`);
            } else {
                // we call the api that verifies the token.
                if (!auth.authenticate) {
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

                    }
                }
                Router.replace(`/${router.pathname}`);
            }
        }, []);
        return <WrappedComponent {...props} />;
    };
};

export default withoutAuthPublic;