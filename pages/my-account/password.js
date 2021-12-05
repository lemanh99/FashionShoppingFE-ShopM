// import swal from "@sweetalert/with-react";
import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import InputGroup from "../../src/components/form/InputGroup";
import { connect, useSelector } from "react-redux";
import SideBarMyAccount from "../../src/components/myaccount/sidebar";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import { addressSchema, passwordShema } from "../../src/utils/yupModal";
import axiosIntance from "../../src/helpers/axios";
import toast from "react-hot-toast";


const PasswordPage = () => {
    const formikRef = useRef();
    async function changePassword(password) {
        const res = await axiosIntance.post(`/user/password/`, { password: password });
        if (res.status === 200) {
            toast.success("Thay đổi mật khẩu thành công")
        } else {
            toast.error("Thay đổi mật khẩu thành công")
        }
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "password",
                ""
            );
            formikRef.current.setFieldValue(
                "repassword",
                ""
            );
        }
    }

    const handlePassword = (values) => {
        changePassword(values.password)
    }

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
                                                <Formik
                                                    innerRef={formikRef}
                                                    initialValues={passwordShema.initialValue}
                                                    validationSchema={passwordShema.schema}
                                                    onSubmit={(values, { setSubmitting }) => {
                                                        setTimeout(() => {
                                                            handlePassword(values)
                                                            setSubmitting(false);
                                                        }, 400);
                                                    }}
                                                >
                                                    {({
                                                        values,
                                                        errors,
                                                        handleChange,
                                                        handleBlur,
                                                        handleSubmit,
                                                        isSubmitting,
                                                    }) => (
                                                        <div className="checkout-area mb-60">
                                                            <div className="container">
                                                                <form action="#" onSubmit={handleSubmit}>
                                                                    <div className="row">
                                                                        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                                                            <div className="checkbox-form">
                                                                                <h4 className="pb-10 mb-20 border-b-light-gray2">
                                                                                    Thay đổi mật khẩu
                                                                                </h4>
                                                                                {/* /row */}
                                                                                <div className="different-address">
                                                                                    <div className="row">
                                                                                        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                                                                            <div className="checkout-form-list mb-30">
                                                                                                <InputGroup
                                                                                                    name="password"
                                                                                                    id="password"
                                                                                                    label="Mật khẩu"
                                                                                                    type="password"
                                                                                                    errors={errors.password}
                                                                                                    values={values.password}
                                                                                                    handleBlur={handleBlur}
                                                                                                    handleChange={handleChange}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                                                                            <div className="checkout-form-list mb-30">
                                                                                                <InputGroup
                                                                                                    name="repassword"
                                                                                                    id="repassword"
                                                                                                    label="Nhập lại mật khẩu"
                                                                                                    type="password"
                                                                                                    errors={errors.repassword}
                                                                                                    values={values.repassword}
                                                                                                    handleBlur={handleBlur}
                                                                                                    handleChange={handleChange}
                                                                                                />
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="order-button-payment mt-20">

                                                                                <button
                                                                                    type="submit"
                                                                                    className="bt-btn theme-btn"
                                                                                    disabled={isSubmitting}
                                                                                >
                                                                                    Lưu
                                                                                </button>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* /row */}
                                                                </form>
                                                            </div>
                                                            {/* /container */}
                                                        </div>
                                                    )}
                                                </Formik>
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
export default connect(null)(withAuth(PasswordPage));

