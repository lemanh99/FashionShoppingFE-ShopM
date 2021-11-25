// import swal from "@sweetalert/with-react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Formik } from "formik";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
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

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Checkout = ({ setCheckoutData }) => {
  const carts = useSelector((state) => state.utilis.carts);
  const [freeShpping, setFreeShpping] = useState(false);
  const [differentAddresses, setDifferentAddresses] = useState(false);
  const [country, setCountry] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [flat, setFlat] = useState(false);
  const price = totalPrice(carts);
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
  }, [])

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
          initialValues={checkoutSchema.initialValue}
          validationSchema={checkoutSchema.schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert("Checkout successfully completed");
              Router.push(
                {
                  pathname: "/order-success",
                },
                undefined,
                { shallow: true }
              );

              setCheckoutData(values);
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
                                      name="firstName1"
                                      id="firstName1"
                                      label="Họ"
                                      errors={errors.firstName1}
                                      values={values.firstName1}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="lastName1"
                                      id="lastName1"
                                      label="Tên"
                                      errors={errors.lastName1}
                                      values={values.lastName1}
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
                                      errors={errors.phoneNumber1}
                                      values={values.phoneNumber1}
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
                                      errors={errors.email1}
                                      values={values.email1}
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
                                        value={values.province1}
                                        name="province"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 tỉnh</option>
                                        {provinces.map((province, i) => (
                                          <option value={province.codename} key={i}>
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
                                        value={values.district1}
                                        name="district"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 quận huyện</option>
                                        {getDistrictByProvinces(values.province).map((district, i) => (
                                          <option value={district.codename} key={i}>
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
                                        value={values.wards1}
                                        name="wards"
                                        className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                      >
                                        <option value="">Chọn 1 phường xã</option>
                                        {getWardsByDistrict(values.district).map((ward, i) => (
                                          <option value={ward.codename} key={i}>
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
                                      name="address1"
                                      id="address1"
                                      label="Địa chị cụ th"
                                      placeholder="Địa chỉ cụ thể"
                                      errors={errors.address1}
                                      values={values.address1}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
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
                                      value={values.province}
                                      name="province"
                                      className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                    >
                                      <option value="">Chọn 1 tỉnh</option>
                                      {provinces.map((province, i) => (
                                        <option value={province.codename} key={i}>
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
                                    >
                                      <option value="">Chọn 1 quận huyện</option>
                                      {getDistrictByProvinces(values.province).map((district, i) => (
                                        <option value={district.codename} key={i}>
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
                                    >
                                      <option value="">Chọn 1 phường xã</option>
                                      {getWardsByDistrict(values.district).map((ward, i) => (
                                        <option value={ward.codename} key={i}>
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
                                    name="address2"
                                    id="address2"
                                    label="Địa chị cụ th"
                                    placeholder="Địa chỉ cụ thể"
                                    errors={errors.address2}
                                    values={values.address2}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>) : null}
                        </div>
                        <div className="order-notes">
                          <div className="checkout-form-list mb-40">
                            <label>Ghi chú</label>
                            <textarea
                              id="checkout-mess"
                              placeholder="Điền những thông tin bổ sung"
                              className="form-control pt-20 pl-20 primary-bg2 border-gray"
                              defaultValue={""}
                            />
                          </div>
                        </div>
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
                                <Formik
                                  initialValues={couponSchema.initialValue}
                                  validationSchema={couponSchema.schema}
                                  onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                      alert(JSON.stringify(values, null, 2));
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
                                    <div className="row">
                                      <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                                        <form action="#">
                                          <p className="checkout-coupon">
                                            <input
                                              className="mb-0"
                                              type="text"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.coupon}
                                              name="coupon"
                                              placeholder="Coupon Code"
                                            />

                                            <div
                                              id="val-username1-error"
                                              className="invalid-feedback animated fadeInUp mb-3"
                                              style={{ display: "block" }}
                                            >
                                              {errors.coupon && errors.coupon}
                                            </div>
                                          </p>
                                        </form>
                                      </div>
                                      {/* /col */}
                                      <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                                        <a
                                          disabled={isSubmitting}
                                          href="#"
                                          className="web-btn h2-theme-border1 d-inline-block text-capitalize white mt-15 rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-60 pr-60 ptb-15 mr-20"
                                        >
                                          Apply coupon
                                        </a>
                                      </div>
                                      {/* /col */}
                                    </div>

                                  )}
                                </Formik>
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
                                        ${Number(cart.totalPrice).toFixed(2)}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr className="cart-subtotal">
                                <th>Tổng giỏ hàng</th>
                                <td>
                                  <span className="amount">${price}</span>
                                </td>
                              </tr>
                              <tr className="shipping">
                                <th>Phí giao hàng</th>
                                <td>
                                  <ul>
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
                                          ${flatPrice.toFixed(2)}
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
                                        Free Shipping: $
                                        {shppingPrice.toFixed(2)}
                                      </label>
                                    </li>
                                    <li />
                                  </ul>
                                </td>
                              </tr>
                              <tr className="order-total">
                                <th>Tổng thanh toán</th>
                                <td>
                                  <strong>
                                    {price && (
                                      <span className="amount">
                                        $
                                        {flat && freeShpping
                                          ? (
                                            price -
                                            flatPrice -
                                            shppingPrice
                                          ).toFixed(2)
                                          : flat
                                            ? (price - flatPrice).toFixed(2)
                                            : freeShpping
                                              ? (price - shppingPrice).toFixed(2)
                                              : price}
                                      </span>
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        <div className="payment-method mt-40">
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
                          <div className="order-button-payment mt-20">
                            <button
                              type="submit"
                              className="bt-btn theme-btn"
                              disabled={
                                carts && carts.length <= 0 ? true : isSubmitting
                              }
                            >
                              Place order
                            </button>
                          </div>
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

export default connect(null, { setCheckoutData })(withAuth(Checkout));
