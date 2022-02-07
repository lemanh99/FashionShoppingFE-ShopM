// import swal from "@sweetalert/with-react";

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getPrevPath } from "../src/helpers/path";
import withAuth from "../src/HOC/withAuth";
import { logout } from "../src/redux/action/auth";
import { getNotificationReset } from "../src/redux/action/notification";


const Logout = ({ logout, getNotificationReset }) => {
    const Router = useRouter();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        logout();
        getNotificationReset();
    }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!auth.authenticate && !token) {
            const prevPath = getPrevPath()
            if (prevPath && prevPath !== "null") {
                Router.push(`${prevPath}`)
            } else {
                Router.push("/")
            }
        }
        Router.push("/")
    }, [auth])
    return (
        <></>
    );
};
export default connect(null, { logout, getNotificationReset })(withAuth(Logout));