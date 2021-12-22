// import swal from "@sweetalert/with-react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Formik } from "formik";
import Router from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import SelectGroup from "../src/components/form/SelectGroup";
import withAuth from "../src/HOC/withAuth";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { setCheckoutData } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";
import {
  checkoutSchema,
  couponSchema,
  loginSchema,
} from "../src/utils/yupModal";
import PaymentPaypal from "../src/components/payment/paypal";
import { getCustomerAddress } from "../src/redux/action/user";
import axiosIntance from "../src/helpers/axios";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Checkout = ({ setCheckoutData, getCustomerAddress }) => {
  const carts = useSelector((state) => state.utilis.carts);
  const addressCustomer = useSelector((state) => state.user.address)
  const [freeShpping, setFreeShpping] = useState(false);
  const [differentAddresses, setDifferentAddresses] = useState(false);
  const [country, setCountry] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(30000);
  const [discount, setDiscount] = useState(0)
  const [coupon, setCoupon] = useState("")
  const [errorCoupon, setErrorCoupon] = useState("")

  const [flat, setFlat] = useState(false);
  const price = totalPrice(carts);
  const formikRef = useRef();
  let shppingPrice = 30, flatPrice = 7;

  const [activeId, setActiveId] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [tokenUser, setTokenUser] = useState(null);

  async function getCountry() {
    const res = await axios.get('https://provinces.open-api.vn/api/?depth=3')
    setProvinces(res.data);
  }

  useEffect(() => {
    getCountry()
    const token = localStorage.getItem("token")
    setTokenUser(token);
    getCustomerAddress();
    setErrorCoupon("");
  }, [])
  useEffect(() => {
    if (addressCustomer && addressCustomer.length > 0) {
      if (formikRef.current) {
        formikRef.current.setFieldValue(
          "province",
          addressCustomer[0].city
        );
        formikRef.current.setFieldValue(
          "district",
          addressCustomer[0].district
        );
        formikRef.current.setFieldValue(
          "wards",
          addressCustomer[0].village
        );
        formikRef.current.setFieldValue(
          "street",
          addressCustomer[0].street
        );
        formikRef.current.setFieldValue(
          "firstName",
          addressCustomer[0].first_name
        );
        formikRef.current.setFieldValue(
          "lastName",
          addressCustomer[0].last_name
        );
        formikRef.current.setFieldValue(
          "email",
          addressCustomer[0].email
        );
        formikRef.current.setFieldValue(
          "phoneNumber",
          addressCustomer[0].phone_number
        );
      }

    }
  }, [addressCustomer])


  const getDistrictByProvinces = (value) => {
    const province_info = provinces.filter((province) => province.codename == value)[0]
    if (province_info) {
      setDistricts(province_info["districts"])
      return province_info["districts"]
    }
    return []
  }
  const getWardsByDistrict = (value) => {
    const district_info = districts.filter((district) => district.codename == value)[0]
    if (district_info) {
      setWards(district_info["wards"])
      return district_info["wards"]
    }
    return []
  }

  const getInfomationOrder = (values) => {
    let addressUser = null;
    if (!values.defferentAddress) {
      addressUser = {
        city: values.province,
        district: values.district,
        village: values.wards,
        street: values.street,
        email: values.email,
        phone_number: values.phoneNumber,
        first_name: values.firstName,
        last_name: values.lastName,
      }
    } else {
      addressUser = {
        city: values.province2,
        district: values.district2,
        village: values.wards2,
        street: values.street2,
        email: values.email2,
        phone_number: values.phoneNumber2,
        first_name: values.firstName2,
        last_name: values.lastName2,
      }
    }
    const shipping = {
      ...addressUser,
      customer_address_id: null,
      delivery_id: 1,
      country: "viet_nam",
      postal_code: "000000",

    }
    return { shipping: shipping, deliveryFee: deliveryFee, discount: discount };
  }

  async function getCoupon(code) {
    const res = await axiosIntance.get(`/product/coupon/check/${code}`)
    if (res && res.status === 200) {
      const { data } = res.data;
      setDiscount(data.price)
      setErrorCoupon("")
    } else {
      const { meta } = res.data;
      if (meta.detail == "Coupon does not exits") {
        setErrorCoupon("Mã giảm giá không tồn tại")
      } else if (meta.detail == "Coupon expired") {
        setErrorCoupon("Mã giảm giá đã hết hạn")
      } else {
        setErrorCoupon("Lỗi không xác định")
      }
      setDiscount(0)
    }
  }
  const handerCoupon = (e) => {
    e.preventDefault();
    getCoupon(coupon);
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

        <Formik
          innerRef={formikRef}
          initialValues={checkoutSchema.initialValue}
          validationSchema={checkoutSchema.schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const shipping = getInfomationOrder(values)
              setCheckoutData(shipping);
              Router.push(
                {
                  pathname: "/payment-cart",
                },
                undefined,
                { shallow: true }
              );


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
                    <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                      <div className="checkbox-form">
                        <h4 className="pb-10 mb-20 border-b-light-gray2">
                          Thông tin giao hàng
                        </h4>
                        {/* /row */}
                        <div className="different-address">
                          <Accordion>
                            <div className="ship-different-title pb-15 pt-1">
                              <div className="save-info pb-10 border-b-light-gray">
                                <label
                                  htmlFor="ship-box"
                                  className="mb-0 d-inline-block text-uppercase pr-15"
                                >
                                  Sử dụng địa chỉ giao hàng khác?
                                </label>
                                <Accordion.Toggle
                                  eventKey="0"
                                  as="input"
                                  id="ship-box"
                                  className="p-0"
                                  type="checkbox"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="defferentAddress"
                                  onClick={() => { setDifferentAddresses(!differentAddresses) }}
                                />

                              </div>
                            </div>
                            <Accordion.Collapse eventKey="0" id="ship-box-info">
                              <div className="row">
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="firstName2"
                                      id="firstName2"
                                      label="Họ"
                                      errors={errors.firstName2}
                                      values={values.firstName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="lastName2"
                                      id="lastName2"
                                      label="Tên"
                                      errors={errors.lastName2}
                                      values={values.lastName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="phoneNumber2"
                                      id="phoneNumber2"
                                      label="Số điện thoại"
                                      errors={errors.phoneNumber2}
                                      values={values.phoneNumber2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="email2"
                                      id="email2"
                                      label="Email"
                                      type="email"
                                      errors={errors.email2}
                                      values={values.email2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                    <div className="country-select mb-30">
                                      <label>
                                        Tỉnh/Thành phố <span className="required">*</span>
                                      </label>
                                      <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.province2}
                                        name="province2"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 tỉnh</option>
                                        {provinces.map((province, i) => (
                                          <option value={province.codename} key={"province2" + i}>
                                            {province.name}
                                          </option>
                                        ))}
                                        <div
                                          id="val-username1-error"
                                          className="invalid-feedback animated fadeInUp mb-3"
                                          style={{ display: "block" }}
                                        >
                                          {errors.province2 && errors.province2}
                                        </div>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                    <div className="country-select mb-30">
                                      <label>
                                        Quận/Huyện <span className="required">*</span>
                                      </label>
                                      <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.district2}
                                        name="district2"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 quận huyện</option>
                                        {getDistrictByProvinces(values.province2).map((district, i) => (
                                          <option value={district.codename} key={"district2" + i}>
                                            {district.name}
                                          </option>
                                        ))}
                                        <div
                                          id="val-username1-error"
                                          className="invalid-feedback animated fadeInUp mb-3"
                                          style={{ display: "block" }}
                                        >
                                          {errors.district2}
                                        </div>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                    <div className="country-select mb-30">
                                      <label>
                                        Phường/xã <span className="required">*</span>
                                      </label>
                                      <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.wards2}
                                        name="wards2"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 phường xã</option>
                                        {getWardsByDistrict(values.district2).map((ward, i) => (
                                          <option value={ward.codename} key={"wards2" + i}>
                                            {ward.name}
                                          </option>
                                        ))}
                                        <div
                                          id="val-username1-error"
                                          className="invalid-feedback animated fadeInUp mb-3"
                                          style={{ display: "block" }}
                                        >
                                          {errors.wards2 && errors.wards2}
                                        </div>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="street2"
                                      id="street2"
                                      label="Địa chị cụ thể"
                                      placeholder="Địa chỉ cụ thể"
                                      errors={errors.street2}
                                      values={values.street2}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}

                                    />
                                  </div>
                                </div>
                              </div>
                            </Accordion.Collapse>

                            {/* /row */}
                          </Accordion>
                          {!differentAddresses ? (
                            <div className="row">
                              <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                <div className="checkout-form-list mb-30">
                                  <InputGroup
                                    name="firstName"
                                    id="firstName"
                                    label="Họ"
                                    errors={errors.firstName}
                                    values={values.firstName}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                <div className="checkout-form-list mb-30">
                                  <InputGroup
                                    name="lastName"
                                    id="lastName"
                                    label="Tên"
                                    errors={errors.lastName}
                                    values={values.lastName}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                <div className="checkout-form-list mb-30">
                                  <InputGroup
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    label="Số điện thoại"
                                    errors={errors.phoneNumber}
                                    values={values.phoneNumber}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                <div className="checkout-form-list mb-30">
                                  <InputGroup
                                    name="email"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    errors={errors.email}
                                    values={values.email}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                  <div className="country-select mb-30">
                                    <label>
                                      Tỉnh/Thành phố <span className="required">*</span>
                                    </label>
                                    <select
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.province}
                                      name="province"
                                      className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      disabled
                                    >
                                      <option value="">Chọn 1 tỉnh</option>
                                      {provinces.map((province, i) => (
                                        <option value={province.codename} key={"province" + i}>
                                          {province.name}
                                        </option>
                                      ))}
                                      <div
                                        id="val-username1-error"
                                        className="invalid-feedback animated fadeInUp mb-3"
                                        style={{ display: "block" }}
                                      >
                                        {errors.province && errors.province}
                                      </div>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                  <div className="country-select mb-30">
                                    <label>
                                      Quận/Huyện <span className="required">*</span>
                                    </label>
                                    <select
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.district}
                                      name="district"
                                      className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      disabled
                                    >
                                      <option value="">Chọn 1 quận huyện</option>
                                      {getDistrictByProvinces(values.province).map((district, i) => (
                                        <option value={district.codename} key={"district" + i}>
                                          {district.name}
                                        </option>
                                      ))}
                                      <div
                                        id="val-username1-error"
                                        className="invalid-feedback animated fadeInUp mb-3"
                                        style={{ display: "block" }}
                                      >
                                        {errors.district}
                                      </div>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                                  <div className="country-select mb-30">
                                    <label>
                                      Phường/xã <span className="required">*</span>
                                    </label>
                                    <select
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.wards}
                                      name="wards"
                                      className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      disabled
                                    >
                                      <option value="">Chọn 1 phường xã</option>
                                      {getWardsByDistrict(values.district).map((ward, i) => (
                                        <option value={ward.codename} key={"wards" + i}>
                                          {ward.name}
                                        </option>
                                      ))}
                                      <div
                                        id="val-username1-error"
                                        className="invalid-feedback animated fadeInUp mb-3"
                                        style={{ display: "block" }}
                                      >
                                        {errors.wards && errors.wards}
                                      </div>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                <div className="checkout-form-list mb-30">
                                  <InputGroup
                                    name="street"
                                    id="street"
                                    label="Địa chị cụ thể"
                                    placeholder="Địa chỉ cụ thể"
                                    errors={errors.street}
                                    values={values.street}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              {/* <div className="order-button-payment mt-20">
                                <button
                                  type="button"
                                  className="bt-btn theme-btn"
                                  onClick={(e) => {
                                    Router.push(
                                      {
                                        pathname: "/my-account",
                                      },
                                      undefined,
                                      { shallow: true }
                                    );
                                  }}
                                >
                                  Chỉnh sửa
                                </button>
                              </div> */}
                            </div>
                          ) : null}
                        </div>
                        {/* <div className="order-notes">
                          <div className="checkout-form-list mb-40">
                            <label>Ghi chú</label>
                            <textarea
                              id="checkout-mess"
                              placeholder="Điền những thông tin bổ sung"
                              className="form-control pt-20 pl-20 primary-bg2 border-gray"
                              defaultValue={""}
                            />
                          </div>
                        </div> */}
                      </div>

                    </div>
                    {/* /col */}
                    <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                      <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                        <h4 className="pb-10 mb-20 border-b-light-gray3">
                          Thông tin đơn hàng
                        </h4>
                        <div className="coupon-accordion">
                          {/* accordion start */}
                          <Accordion>
                            <h6 className="pt-15 pl-40 pb-15 mb-25 position-relative">
                              Bạn có mã giảm giá không?{" "}
                              <Accordion.Toggle
                                as="span"
                                eventKey="0"
                                id="couponshow"
                                className="light-black-color2 font600 transition-3"
                              >
                                Nhập mã tại đây
                              </Accordion.Toggle>
                            </h6>
                            <Accordion.Collapse
                              eventKey="0"
                              id="checkout-coupon"
                              className="checkout-content"
                            >
                              <div className="coupon-info">
                                <div className="coupon-and-update-area">
                                  <div className="row">
                                    <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                                      <div className="coupon-code-area">
                                        <input
                                          className="pl-15 mr-10 pt-0 mb-15 d-inline-block width100"
                                          type="text"
                                          value={coupon}
                                          onChange={(e) => setCoupon(e.target.value)}
                                          name="coupon"
                                          placeholder="Mã giảm giá"
                                        />
                                        {errorCoupon ? (
                                          <div
                                            id="val-username1-error"
                                            className="invalid-feedback animated fadeInUp mb-3"
                                            style={{ display: "block" }}
                                          >
                                            {errorCoupon}
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                                      <button
                                        type="button"
                                        className="web-btn h2-theme-border1 d-inline-block text-uppercase white  rounded-0 h2-theme-color cart-c-btn h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17 mr-20"
                                        onClick={handerCoupon}
                                      >
                                        Áp dụng
                                      </button>
                                    </div>
                                    {/* /col */}
                                  </div>
                                </div>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                        </div>
                        <div className="your-order-table table-responsive">
                          <table className="width100">
                            <thead>
                              <tr>
                                <th className="product-name">Sản phẩm</th>
                                <th className="product-total">Tổng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {carts &&
                                carts.map((cart) => (
                                  <tr className="cart_item" key={cart.id}>
                                    <td className="product-name">
                                      {cart.name}{" "}
                                      <strong className="product-quantity">
                                        {" "}
                                        × {cart.qty}
                                      </strong>
                                    </td>
                                    <td className="product-total">
                                      <span className="amount">
                                        {Number(cart.totalPrice).toFixed(2)} VND
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr className="cart-subtotal">
                                <th>Tổng giỏ hàng</th>
                                <td>
                                  <span className="amount">{price} VND</span>
                                </td>
                              </tr>
                              <tr className="shipping">
                                <th>Phí giao hàng</th>
                                <td>
                                  {deliveryFee} VND
                                  {/* <ul>
                                    <li className="d-flex">
                                      <input
                                        type="radio"
                                        checked={flat}
                                        onClick={() => setFlat(!flat)}
                                        className="r-inpt mb-2 mr-1"
                                      />
                                      <label>
                                        Flat Rate:{" "}
                                        <span className="amount">
                                          {" "}
                                          {flatPrice.toFixed(2)} VND
                                        </span>
                                      </label>
                                    </li>
                                    <li className="d-flex">
                                      <input
                                        type="radio"
                                        checked={freeShpping}
                                        onClick={() =>
                                          setFreeShpping(!freeShpping)
                                        }
                                        className="r-inpt mb-2 mr-1"
                                      />
                                      <label>
                                        Free Shipping:
                                        {shppingPrice.toFixed(2)} VND
                                      </label>
                                    </li>
                                    <li />
                                  </ul> */}
                                </td>
                              </tr>
                              {discount ? (
                                <tr className="cart-subtotal" >
                                  <th>Giảm giá</th>
                                  <td>
                                    <span className="amount" style={{ color: "#dc3545" }}>-{discount} VND</span>
                                  </td>
                                </tr>
                              ) : null}
                              <tr className="order-total">
                                <th>Tổng thanh toán</th>
                                <td>
                                  <strong>
                                    {price && (
                                      <span className="amount">

                                        {/* {flat && freeShpping
                                          ? (
                                            price -
                                            flatPrice -
                                            shppingPrice
                                          ).toFixed(2)
                                          : flat
                                            ? (price - flatPrice).toFixed(2)
                                            : freeShpping
                                              ? (price - shppingPrice).toFixed(2)
                                              : price} */}
                                        {Number(price) + Number(deliveryFee) - Number(discount)}
                                        VND
                                      </span>
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* <div className="payment-method mt-40">
                          <Accordion defaultActiveKey="0">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <Accordion.Toggle
                                  className="accordion-button"
                                  as="button"
                                  eventKey="0"
                                  aria-expanded="false"
                                >
                                  Direct Bank Transfer
                                </Accordion.Toggle>
                              </h2>
                              <Accordion.Collapse eventKey="0">
                                <div className="accordion-body">
                                  Make your payment directly into our bank
                                  account. Please use your Order ID as the
                                  payment reference. Your order won’t be shipped
                                  until the funds have cleared in our account.
                                  <div className="mt-3">
                                    <Elements stripe={stripePromise}>
                                      <CardElement className="form-control" />
                                    </Elements>
                                  </div>
                                </div>
                              </Accordion.Collapse>
                            </div>

                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <Accordion.Toggle
                                  className="accordion-button"
                                  as="button"
                                  eventKey="1"
                                >
                                  Cheque Payment
                                </Accordion.Toggle>
                              </h2>
                              <Accordion.Collapse eventKey="1">
                                <div className="accordion-body">
                                  Please send your cheque to Store Name, Store
                                  Street, Store Town, Store State / County,
                                  Store Postcode.
                                </div>
                              </Accordion.Collapse>
                            </div>

                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <Accordion.Toggle
                                  className="accordion-button"
                                  as="button"
                                  eventKey="2"
                                >
                                  PayPal
                                </Accordion.Toggle>
                              </h2>
                              <Accordion.Collapse eventKey="2">
                                <PaymentPaypal total="10.00" token={tokenUser} />
                              </Accordion.Collapse>
                            </div>
                          </Accordion>

                        </div> */}
                        <div className="order-button-payment mt-20">
                          <button
                            type="submit"
                            className="bt-btn theme-btn"
                            disabled={
                              carts && carts.length <= 0 ? true : isSubmitting
                            }
                          >
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </form>
              </div>
              {/* /container */}
            </div>
          )}
        </Formik>
      </main>
    </Layout>
  );
};
export default connect(null, { setCheckoutData, getCustomerAddress })(withAuth(Checkout));
