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
import { addOrder } from "../src/redux/action/order";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentCart = ({ addOrder }) => {
  const carts = useSelector((state) => state.utilis.carts);
  const checkoutData = useSelector((state) => state.utilis.checkoutData);

  const [convertVND, setConvertVND] = useState(null);
  const [paymentTotalPayPal, setPaymentTotalPayPal] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(30000);
  const price = totalPrice(carts);
  const [tokenUser, setTokenUser] = useState(null);

  async function getPriceVNDOnUSD() {
    const res = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=${process.env.EXCHANGE_RATE_CONVERT_KEY}`)
    const { USD_VND } = res.data
    setConvertVND(USD_VND);
  }
  useEffect(() => {
    if (!checkoutData) {
      Router.push(
        {
          pathname: "/checkout",
        },
        undefined,
        { shallow: true }
      );
    }
    getPriceVNDOnUSD()
    const token = localStorage.getItem("token")
    setTokenUser(token);
  }, [])

  useEffect(() => {
    const total = convertVND ? Number((Number(price) + Number(deliveryFee)) / Number(convertVND)).toFixed(2) : (Number(price) + Number(deliveryFee)) / Number(convertVND)
    console.log(total, convertVND)
    setPaymentTotalPayPal(total)
  }, [convertVND])

  const paymentUser = (value) => {
    let order_item = []
    for (const cart of carts) {
      var item = {
        product_id: cart.id,
        product_sku_id: cart.product_sku_id,
        quantity: cart.qty
      }
      order_item.push(item);
    }
    const order = {
      order_status_id: value.order_status_id,
      payment_status_id: value.payment_status_id,
      payment_id: value.payment_id,
      total: price,
      subtotal: Number(price) + Number(deliveryFee),
      discount: 0,
      delivery_fee_total: deliveryFee,
      payment_total: Number(price) + Number(deliveryFee),
      shipping: checkoutData ? checkoutData.shipping : {},
      order_item: order_item
    }
    addOrder(order);
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
            <div>
              <div className="row">

                <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                  <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                    <h4 className="pb-10 mb-20 border-b-light-gray3">
                      Hóa đơn
                    </h4>
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
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Tổng thanh toán</th>
                            <td>
                              <strong>
                                {price && (
                                  <span className="amount">
                                    {Number(price) + Number(deliveryFee)}
                                    VND
                                  </span>
                                )}
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                  <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                    <h4 className="pb-10 mb-20 border-b-light-gray3">
                      Chọn phương thức thanh toán
                    </h4>
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
                              Thanh toán qua ngân hàng
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="0">
                            <div className="accordion-body">

                              <div className="mt-3">
                                <Elements stripe={stripePromise}>
                                  <CardElement className="form-control" />
                                </Elements>
                              </div>
                              <div className="order-button-payment mt-20">
                                <button
                                  type="submit"
                                  className="bt-btn theme-btn"
                                >
                                  Tiếp tục
                                </button>
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
                              Thanh toán khi nhận hàng
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="1">
                            <div className="accordion-body">
                              <div className="order-button-payment mt-20">
                                <button
                                  type="submit"
                                  className="bt-btn theme-btn"
                                >
                                  Xác nhận
                                </button>
                              </div>
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
                            <PaymentPaypal total={price} token={tokenUser} paymentUser={paymentUser} />
                          </Accordion.Collapse>
                        </div>
                      </Accordion>

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

export default connect(null, { addOrder })(withAuth(PaymentCart));
