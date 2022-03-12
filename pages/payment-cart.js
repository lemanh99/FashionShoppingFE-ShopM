// import swal from "@sweetalert/with-react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
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
import { removeCartAll, setCheckoutData } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";
import toast from "react-hot-toast";
import {
  checkoutSchema,
  couponSchema,
  loginSchema,
} from "../src/utils/yupModal";
import PaymentPaypal from "../src/components/payment/paypal";
import PaymentMomo from "../src/components/payment/momo";
import PaymentVnpay from "../src/components/payment/vnpay";
import { addOrder } from "../src/redux/action/order";
import axiosIntance from "../src/helpers/axios";
import { setLocalStorage } from "../src/utils/localstorage";



// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentCart = ({ addOrder, removeCartAll }) => {

  const carts = useSelector((state) => state.utilis.carts);
  let checkoutData = useSelector((state) => state.utilis.checkoutData);
  const order = useSelector((state) => state.order);

  const [convertVND, setConvertVND] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const price = totalPrice(carts);
  const [tokenUser, setTokenUser] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [payment, setPayment] = useState([])

  const [showMomo, setShowMomo] = useState(false);
  const [urlMomo, setUrlMomo] = useState('');
  const [dataMomo, setDataMomo] = useState(null);

  const [showVnpay, setShowVnpay] = useState(false);
  const [urlVnpay, setUrlVnpay] = useState('');
  const [dataVnpay, setDataVnpay] = useState(null);


  async function getPriceVNDOnUSD() {
    // const res = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=${process.env.EXCHANGE_RATE_CONVERT_KEY}`)
    // const { USD_VND } = res.data
    // setConvertVND(USD_VND);
    setConvertVND(23000);
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
    axiosIntance.get(`setting/payment/`).then((res) => {
      if (res.status == 200) {
        const { data } = res.data;
        setPayment(data);
      }
    })
  }, [])

  useEffect(() => {
    if (checkoutData && checkoutData.deliveryFee) {
      setDeliveryFee(checkoutData.deliveryFee);
    }
    if (checkoutData && checkoutData.discount) {
      setDiscount(checkoutData.discount);
    }
  }, [checkoutData])

  useEffect(() => {
    const total = convertVND ? Number((Number(price) + Number(deliveryFee)) / Number(convertVND)).toFixed(2) : (Number(price) + Number(deliveryFee)) / Number(convertVND)
    // console.log(total, convertVND)
    // setPaymentTotalPayPal(total)
  }, [convertVND])

  useEffect(() => {
    if (order.addOrder) {
      removeCartAll();
      Router.push(
        {
          pathname: `/order-success/${order.order_code}`,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [order])

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
    const orders = {
      order_status_id: value.order_status_id,
      payment_status_id: value.payment_status_id,
      payment_id: value.payment_id,
      total: price,
      subtotal: Number(price) + Number(deliveryFee),
      discount: checkoutData && checkoutData.discount ? Number(checkoutData.discount) : 0,
      delivery_fee_total: deliveryFee,
      payment_total: Number(price) + Number(deliveryFee) - Number(checkoutData && checkoutData.discount ? checkoutData.discount : 0),
      shipping: checkoutData ? checkoutData.shipping : {},
      order_item: order_item
    }
    addOrder(orders);
  }


  const getPayment = (name) => {
    const pay = payment.find((p) => String(p.payment_method).toLowerCase() === name.toLowerCase() && p.visible == true)
    return pay
  }

  const handleClick = () => {
    axiosIntance.post('setting/payment/momo/create', {
      order_code: "Payment",
      amount: String(Number(price) + Number(deliveryFee))

    }).then((res) => {
      if (res.status == 200) {
        const { data } = res.data;
        if (data) {
          setUrlMomo(data)
          setShowMomo(true)
        } else {
          toast.error("Thanh toán bằng momo đang lỗi, vui lòng thử lại sau", { duration: 500 });
        }
      } else {
        toast.error("Thanh toán bằng momo đang lỗi, vui lòng thử lại sau", { duration: 500 });
      }
    })
  }
  const handleCloseMomo = (status) => {
    setShowMomo(false);
    setDataMomo(null);
    if (status == 1) {
      paymentUser({
        order_status_id: 2,
        payment_status_id: 2,
        payment_id: getPayment("momo") ? getPayment("momo").id : null,
      })
      toast.success("Thanh toán bằng ví diện tử momo thành công", { duration: 1000 });
    } else {
      toast.error("Thanh toán bằng ví diện tử momo không thành công", { duration: 1000 });
    }
  };
  const handleShowMomo = () => setShowMomo(true);

  const handleClickVnpay = () => {
    axiosIntance.post('setting/payment/vnpay/create', {
      order_type: "Order",
      order_desc: "Thanh toan don hang",
      bank_code:  null,
      language: "vn",
      amount: String(Number(price) + Number(deliveryFee))*100

    }).then((res) => {
      if (res.status == 200) {
        const { data } = res.data;
        if (data) {
          setUrlVnpay(data.url)
          // setShowVnpay(true);
          
          setLocalStorage('checkoutData', checkoutData)
          setLocalStorage('carts', carts);
          setLocalStorage('orderCode', data.order_id);
          Router.push(data.url)
        } else {
          toast.error("Thanh toán bằng vnpay đang lỗi, vui lòng thử lại sau", { duration: 500 });
        }
      } else {
        toast.error("Thanh toán bằng vnpay đang lỗi, vui lòng thử lại sau", { duration: 500 });
      }
    })
  }

  const handleCloseVnpay = (status) => {
    setShowVnpay(false);
    setDataVnpay(null);
    if (status == 1) {
      // paymentUser({
      //   order_status_id: 2,
      //   payment_status_id: 2,
      //   payment_id: getPayment("momo") ? getPayment("momo").id : null,
      // })
      // toast.success("Thanh toán bằng ví diện tử momo thành công", { duration: 1000 });
    } else {
      toast.error("Thanh toán bằng ví diện tử vnpay không thành công", { duration: 1000 });
    }
  };
  const handleShowVnpay = () => setShowVnpay(true);


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
        <PaymentMomo
          url={urlMomo}
          show={showMomo}
          data={dataMomo}
          setData={setDataMomo}
          handleClose={handleCloseMomo}
        />
        {/* <PaymentVnpay
          url={'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20220209134330&vnp_CurrCode=VND&vnp_IpAddr=10.8.101.6&vnp_Locale=vn&vnp_OrderInfo=1ef8f0bd-6ac8-4664-98c8-8d03041ab4c7&vnp_OrderType=Order12&vnp_ReturnUrl=https%3A%2F%2Fwebhook.site%2F8e595f0a-3222-4dc4-afa7-26db4a6896bd&vnp_TmnCode=RAEX2EIZ&vnp_TxnRef=ORD1644414210836406&vnp_Version=2.1.0&vnp_SecureHash=aa18c27159031bad43c0a66d0cd5a53a4074d65218dad01d1d624d9f8360d6f6c00cba83dbd9640d2d47c27c67af45dbe6f9121140d4ef6da55bb6a8e2b70847'}
          show={showVnpay}
          data={dataVnpay}
          setData={setDataVnpay}
          handleClose={handleCloseVnpay}
        /> */}

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
                          {checkoutData && checkoutData.discount > 0 ? (
                            <tr className="shipping">
                              <th>Mã giảm giá</th>
                              <td>
                                {checkoutData.discount} VND
                              </td>
                            </tr>
                          ) : null}
                          <tr className="order-total">
                            <th>Tổng thanh toán</th>
                            <td>
                              <strong>
                                {price && (
                                  <span className="amount">
                                    {Number(price) + Number(deliveryFee) - Number(checkoutData && checkoutData.discount ? checkoutData.discount : 0)}
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
                      <Accordion defaultActiveKey="4">
                      <div className="accordion-item">
                          <h2 className="accordion-header">
                            <Accordion.Toggle
                              className="accordion-button"
                              as="button"
                              eventKey="0"
                              aria-expanded="false"
                            >
                              Thanh toán qua ví VNPay
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="0">
                            <div className="accordion-body">

                              <div className="mt-3">
                                <div className="logo-momo">
                                  <img src="/images/logo/vnpay.jpg" alt="" />
                                </div>
                              </div>
                              <div className="order-button-payment mt-20">
                                <button
                                  type="submit"
                                  className="bt-btn theme-btn payment-btn"
                                  style={{ background: '#0057a6' }}
                                  onClick={() => handleClickVnpay()}
                                >
                                  Thanh toán
                                </button>
                              </div>
                            </div>
                          </Accordion.Collapse>
                        </div>
                        {/* <div className="accordion-item">
                          <h2 className="accordion-header">
                            <Accordion.Toggle
                              className="accordion-button"
                              as="button"
                              eventKey="1"
                              aria-expanded="false"
                            >
                              Thanh toán qua ví điện tử momo
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="1">
                            <div className="accordion-body">

                              <div className="mt-3">
                                <div className="logo-momo">
                                  <img src="/images/logo/momo.png" alt="" />
                                </div>
                              </div>
                              <div className="order-button-payment mt-20">
                                <button
                                  type="submit"
                                  className="bt-btn theme-btn payment-btn"
                                  style={{ background: '#8d0a56' }}
                                  onClick={() => handleClick()}
                                >
                                  Thanh toán
                                </button>
                              </div>
                            </div>
                          </Accordion.Collapse>
                        </div> */}
                        {/* <div className="accordion-item">
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
                                  onClick={() => handleClick()}
                                >
                                  Tiếp tục
                                </button>
                              </div>
                            </div>
                          </Accordion.Collapse>
                        </div> */}

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <Accordion.Toggle
                              className="accordion-button"
                              as="button"
                              eventKey="2"
                            >
                              Thanh toán khi nhận hàng
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="2">
                            <div className="accordion-body">
                              <div className="order-button-payment mt-20">
                                <button
                                  type="button"
                                  className="bt-btn theme-btn payment-btn"
                                  onClick={(e) => {
                                    paymentUser({
                                      order_status_id: 2,
                                      payment_status_id: 1,
                                      payment_id: getPayment("cod") ? getPayment("cod").id : null,
                                    })
                                  }}
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
                              eventKey="3"
                            >
                              PayPal
                            </Accordion.Toggle>
                          </h2>
                          <Accordion.Collapse eventKey="3">
                            <PaymentPaypal total={Number((Number(price) + Number(deliveryFee) - Number(checkoutData && checkoutData.discount ? checkoutData.discount : 0)) / Number(23000)).toFixed(2)} token={tokenUser} paymentUser={paymentUser} />
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

export default connect(null, { addOrder, removeCartAll })(withAuth(PaymentCart));

