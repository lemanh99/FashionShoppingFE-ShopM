// import swal from "@sweetalert/with-react";
import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import InputGroup from "../../src/components/form/InputGroup";
import { connect, useDispatch, useSelector } from "react-redux";
import SideBarMyAccount from "../../src/components/myaccount/sidebar";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import { addressSchema, passwordShema } from "../../src/utils/yupModal";
import axiosIntance from "../../src/helpers/axios";
import { convert_datetime_from_timestamp } from "../../src/utils/time";


const Notification = () => {
    const [data, setData] = useState([])
    const notification = useSelector((state) => state.notification);
    useEffect(() => {
        axiosIntance.get(`/notification/user`).then((res) =>{
            if (res && res.status === 200) {
                const { data } = res.data;
                setData(data.item)
            } 
        })
    }, [])
    return (
        <Layout sticky textCenter container footerBg>
            <main>
                {/* <PageBanner title="Checkout" /> */}
                <div className="coupon-area mt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            </div>
                            {/* /col */}
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">

                            </div>
                            {/* /col */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>

                <div className="checkout-area mb-60">
                    <div className="container">
                        <div action="#">
                            <div className="row">
                                {/* /col */}
                                <SideBarMyAccount />
                                <div className="col-xl-9  col-lg-9  col-md-12  col-sm-12 col-12">
                                    <div className="checkbox-form">
                                        <h4 className="pb-10 mb-20 border-b-light-gray2">

                                        </h4>
                                        {/* /row */}
                                        <div className="cart-area">
                                            <div className="container border-b-light-gray pb-100">
                                                <div className="cart-table table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" >Thông báo</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data && data.length > 0 ?
                                                                data.map((message, index) => (
                                                                    <tr>
                                                                        <td width="90%">
                                                                            {message && message.title}{message && message.title ? ":" : null}{message && message.content}
                                                                        </td>
                                                                        <td width="10%">
                                                                            {message && convert_datetime_from_timestamp(message.created_at)}
                                                                        </td>
                                                                    </tr>
                                                                )) : null}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {/* /container */}
                                        </div>
                                    </div>

                                </div>
                                {/* /col */}
                            </div>
                            {/* /row */}
                        </div>
                    </div>
                    {/* /container */}
                </div>

            </main>
        </Layout>
    );
};
export default connect(null)(withAuth(Notification));

