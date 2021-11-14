// import swal from "@sweetalert/with-react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import SelectGroup from "../src/components/form/SelectGroup";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { setCheckoutData } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";
import {
  checkoutSchema,
  couponSchema,
  loginSchema,
} from "../src/utils/yupModal";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Checkout = ({ setCheckoutData }) => {
  const carts = useSelector((state) => state.utilis.carts);
  const [freeShpping, setFreeShpping] = useState(false);
  const [flat, setFlat] = useState(false);
  const price = totalPrice(carts);
  let shppingPrice = 30,
    flatPrice = 7;

  const [activeId, setActiveId] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const countrys = [
    "bangladesh",
    "Algeria",
    "Afghanistan",
    "Ghana",
    "Albania",
    "Bahrain",
    "Colombia",
    "Dominican Republic",
  ];

  return (
    <Layout sticky textCenter container footerBg>
      <main>
        <PageBanner title="Checkout" />
        <div className="coupon-area mt-80">
          <div className="container">
            <div className="row">
              <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                <Accordion>
                  <div className="coupon-accordion">
                    <h6 className="pt-15 pl-40 pb-15 mb-25 position-relative">
                      Returning customer?{" "}
                      <Accordion.Toggle
                        as="span"
                        eventKey="0"
                        id="login"
                        className="light-black-color2 font600 transition-3"
                      >
                        Click here to login
                      </Accordion.Toggle>
                    </h6>
                    <Accordion.Collapse
                      eventKey="0"
                      id="checkout-login"
                      className="coupon-content border-gray pt-20 pb-35 pl-30 pr-30 mb-25"
                    >
                      <div className="coupon-info">
                        <p className="coupon-text mb-15">
                          Quisque gravida turpis sit amet nulla posuere lacinia.
                          Cras sed est sit amet ipsum luctus.
                        </p>
                        <Formik
                          initialValues={loginSchema.initialValue}
                          validationSchema={loginSchema.schema}
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
                            <form onSubmit={handleSubmit} action="#">
                              <p className="log-mail mb-0">
                                <InputGroup
                                  label="Email Address"
                                  id="email"
                                  name="email"
                                  type="string"
                                  placeholder="Enter Username or Email address..."
                                  values={values.email}
                                  errors={errors.email}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                />
                              </p>
                              <p className="log-pass mb-0">
                                <InputGroup
                                  label="Password"
                                  id="password"
                                  name="password"
                                  type="password"
                                  placeholder="Enter password..."
                                  values={values.password}
                                  errors={errors.password}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                />
                              </p>
                              <div className="log-btn mb-0">
                                <a
                                  href="#"
                                  className="web-btn h2-theme-border1 d-inline-block text-capitalize white mt-15 mb-30 rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-60 pr-60 ptb-17 mr-20"
                                  disabled={isSubmitting}
                                >
                                  Login
                                </a>
                                <div className="save-info d-inline-block mb-30 mt-2">
                                  <input
                                    className="p-0 "
                                    type="checkbox"
                                    aria-label="Checkbox for following text input"
                                  />
                                  <p className="mb-0  ms-1 d-inline-block">
                                    Remember me
                                  </p>
                                </div>
                              </div>
                              <p className="lost-password mb-0">
                                <a
                                  href="#"
                                  className="light-black-color2 font600"
                                >
                                  Lost your password?
                                </a>
                              </p>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </Accordion.Collapse>
                  </div>
                </Accordion>
              </div>
              {/* /col */}
              <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                <div className="coupon-accordion">
                  {/* accordion start */}
                  <Accordion>
                    <h6 className="pt-15 pl-40 pb-15 mb-25 position-relative">
                      Have a coupon?{" "}
                      <Accordion.Toggle
                        as="span"
                        eventKey="0"
                        id="couponshow"
                        className="light-black-color2 font600 transition-3"
                      >
                        Click here to enter your code
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
                                <a
                                  disabled={isSubmitting}
                                  href="#"
                                  className="web-btn h2-theme-border1 d-inline-block text-capitalize white mt-15 mb-30 rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-60 pr-60 ptb-17 mr-20"
                                >
                                  Apply coupon
                                </a>
                              </p>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
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
                          Billing Details
                        </h4>
                        <div className="row">
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="country-select mb-30">
                              <SelectGroup
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                name="country"
                                id="country"
                                values={values.country}
                                errors={errors.country}
                                options={countrys}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="fName"
                                id="fName"
                                label="First Name"
                                errors={errors.fName}
                                values={values.fName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="lName"
                                id="lName"
                                label="Last Name"
                                errors={errors.lName}
                                values={values.lName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="cName"
                                id="cName"
                                label="Company Name"
                                errors={errors.cName}
                                values={values.cName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="address"
                                id="address"
                                label="Address"
                                placeholder="Street address"
                                errors={errors.address}
                                values={values.address}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="checkout-form-list mb-20">
                              <input
                                type="text"
                                placeholder="Apartment, suite, unit etc. (optional)"
                                className="form-control primary-bg2 border-gray"
                              />
                            </div>
                          </div>
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="city"
                                id="city"
                                label="Town / City"
                                placeholder="Town / City"
                                errors={errors.city}
                                values={values.city}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="state"
                                id="state"
                                label="State / County"
                                placeholder="State / County"
                                errors={errors.state}
                                values={values.state}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="zip"
                                id="zip"
                                label="Postcode / Zip"
                                placeholder="Postcode / Zip"
                                errors={errors.zip}
                                values={values.zip}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                name="email"
                                id="email"
                                label="Email Address"
                                type="email"
                                errors={errors.email}
                                values={values.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                            <div className="checkout-form-list mb-20">
                              <InputGroup
                                type="number"
                                name="phone"
                                id="phone"
                                label="Phone"
                                errors={errors.phone}
                                values={values.phone}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                            <div className="checkout-form-list create-acc mr-1">
                              <Accordion>
                                <div className="save-info d-inline-block">
                                  <Accordion.Toggle
                                    eventKey="0"
                                    as="input"
                                    id="cbox-account"
                                    className="p-0 pr-2"
                                    type="checkbox"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="createAccount"
                                  />
                                  <label
                                    htmlFor="cbox-account"
                                    className="mb-0 d-inline-block ms-1 c-pointer"
                                  >
                                    Create an account?
                                  </label>
                                </div>
                                <Accordion.Collapse
                                  eventKey="0"
                                  id="cbox-account-info"
                                  className="checkout-form-list create-account"
                                >
                                  <div>
                                    <p>
                                      Create an account by entering the
                                      information below. If you are a returning
                                      customer please login at the top of the
                                      page.
                                    </p>
                                    <InputGroup
                                      name="password2"
                                      id="password2"
                                      label="Account password"
                                      type="password"
                                      errors={errors.password2}
                                      values={values.password2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </Accordion.Collapse>
                              </Accordion>
                            </div>
                          </div>
                        </div>
                        {/* /row */}
                        <div className="different-address">
                          <Accordion>
                            <div className="ship-different-title pb-15 pt-1">
                              <div className="save-info pb-10 border-b-light-gray">
                                <label
                                  htmlFor="ship-box"
                                  className="mb-0 d-inline-block text-uppercase pr-15"
                                >
                                  Ship to a different address?
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
                                />
                              </div>
                            </div>

                            <Accordion.Collapse eventKey="0" id="ship-box-info">
                              <div className="row">
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="country-select mb-30">
                                    <SelectGroup
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                      name="country2"
                                      id="country2"
                                      values={values.country2}
                                      errors={errors.country2}
                                      options={countrys}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="fName2"
                                      id="fName2"
                                      label="First Name"
                                      errors={errors.fName2}
                                      values={values.fName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <label>
                                      Last Name{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <InputGroup
                                      name="lName2"
                                      id="lName2"
                                      label="Last Name"
                                      errors={errors.lName2}
                                      values={values.lName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="cName2"
                                      id="cName2"
                                      label="Company Name"
                                      errors={errors.cName2}
                                      values={values.cName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="address2"
                                      id="address2"
                                      label="Address2"
                                      placeholder="Street address"
                                      errors={errors.address2}
                                      values={values.address2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <input
                                      type="text"
                                      placeholder="Apartment, suite, unit etc. (optional)"
                                      className="form-control primary-bg2 border-gray"
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="city2"
                                      id="city2"
                                      label="Town / City"
                                      placeholder="Town / City"
                                      errors={errors.city2}
                                      values={values.city2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <label>
                                      State / County{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control primary-bg2 border-gray"
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="state2"
                                      id="state2"
                                      label="State / County"
                                      placeholder="State / County"
                                      errors={errors.state2}
                                      values={values.state2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      name="zip2"
                                      id="zip2"
                                      label="Postcode / Zip"
                                      placeholder="Postcode / Zip"
                                      errors={errors.zip2}
                                      values={values.zip2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                  <div className="checkout-form-list mb-30">
                                    <InputGroup
                                      type="number"
                                      name="phone2"
                                      id="phone2"
                                      label="Phone"
                                      errors={errors.phone2}
                                      values={values.phone2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* /row */}
                            </Accordion.Collapse>
                          </Accordion>
                          <div className="order-notes">
                            <div className="checkout-form-list mb-40">
                              <label>Order Notes</label>
                              <textarea
                                id="checkout-mess"
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                className="form-control pt-20 pl-20 primary-bg2 border-gray"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /col */}
                    <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                      <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                        <h4 className="pb-10 mb-20 border-b-light-gray3">
                          Your order
                        </h4>
                        <div className="your-order-table table-responsive">
                          <table className="width100">
                            <thead>
                              <tr>
                                <th className="product-name">Product</th>
                                <th className="product-total">Total</th>
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
                                <th>Cart Subtotal</th>
                                <td>
                                  <span className="amount">${price}</span>
                                </td>
                              </tr>
                              <tr className="shipping">
                                <th>Shipping</th>
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
                                <th>Order Total</th>
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
                                <div className="accordion-body">
                                  Pay via PayPal; you can pay with your credit
                                  card if you don’t have a PayPal account.
                                  <div className="mt-3">
                                    <PayPalScriptProvider
                                      options={{ "client-id": "test" }}
                                    >
                                      <PayPalButtons
                                        style={{ layout: "horizontal" }}
                                      />
                                    </PayPalScriptProvider>
                                  </div>
                                </div>
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

export default connect(null, { setCheckoutData })(Checkout);
