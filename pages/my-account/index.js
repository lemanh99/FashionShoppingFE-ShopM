// import swal from "@sweetalert/with-react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Formik } from "formik";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import { getOrderHistory } from "../../src/redux/action/order";
import { setCheckoutData } from "../../src/redux/action/utilis";
import { convert_datetime_from_timestamp } from "../../src/utils/time";


const OrderHistory = ({ getOrderHistory }) => {
  const orders = useSelector((state) => state.order.orders);
  const [listOrder, setListOrder] = useState([])
  useEffect(() => {
    getOrderHistory()
  }, [])

  useEffect(() => {
    setListOrder(orders)
  }, [orders])

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
                <div className="col-xl-3  col-lg-3  col-md-12  col-sm-12 col-12">
                  <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                    <h4 className="pb-10 mb-20 border-b-light-gray3">
                      Tài khoản của tôi
                    </h4>
                    <div className="your-order-table table-responsive">
                      <table className="width100">
                        <tbody>
                          <tr className="cart_item">
                            <td className="product-name">
                              <strong className="product-quantity">
                                Lịch sử đơn hàng
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9  col-lg-9  col-md-12  col-sm-12 col-12">
                  <div className="checkbox-form">
                    <h4 className="pb-10 mb-20 border-b-light-gray2">

                    </h4>
                    {/* /row */}
                    <div className="cart-area">
                      <div className="container border-b-light-gray pb-100">
                        <div className="cart-table text-center table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Tình trạng order</th>
                                <th scope="col">Tình trạng thanh toán</th>
                                <th scope="col">Phương thức thanh toán</th>
                                <th scope="col">Ngày nhận hàng</th>
                                <th scope="col">Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listOrder && listOrder.map((order) => (
                                <>
                                  <div key={order.id} className="mt-4 mb-1"><b>Ngày order: </b> {convert_datetime_from_timestamp(order.order_date)}</div>
                                  {order.order_item && order.order_item.map((item) => (
                                    <>
                                      <tr>
                                        <td key={"item" + item.id}>{item.product_name}</td>
                                        <td key={"item" + item.id}>{order.order_status_name}</td>
                                        <td key={"item" + item.id}>{order.payment_status_name}</td>
                                        <td key={"item" + item.id}>{order.payment_method}</td>
                                        <td key={"item" + item.id}>{item.shipping_date}</td>
                                        <td key={"item" + item.id}></td>

                                      </tr>
                                    </>
                                  ))}
                                  {/* {order.order_item && order.order_item.map((

                                  ))} */}
                                </>
                              ))}
                              {/* {carts &&
                    carts.map((cart) => (
                      <tr key={cart.id}>
                        <td>
                          <Link href={`/shop/${cart.id}`}>
                            <a className="cart-img d-block">
                              <img src={cart.img} alt="Cart image" />
                            </a>
                          </Link>
                        </td>
                        <td>
                          <Link href={`/shop/${cart.id}`}>
                            <a className="p-name primary-color">{cart.name}</a>
                          </Link>
                        </td>
                        <td>
                          <div className="cart-price">
                            {" "}
                            {Number(cart.mainPrice).toFixed(2)} VND
                          </div>
                        </td>
                        <td>
                          <div className="cart-price">
                          {cart.sizeSelected}
                          </div>
                        </td>
                        <td>
                          <div className="all-info product-view-info text-center mt-35">
                            <div className="quick-add-to-cart d-sm-flex align-items-centerm-auto  mb-15 mr-10">
                              <div className="quantity-field position-relative d-inline-block m-auto">
                                <span
                                  className="custom-prev c-pointer"
                                  onClick={(e) => onClickCart(e, cart)}
                                >
                                  <i className="icon-plus" />
                                </span>
                                <input
                                  type="text"
                                  name="select1"
                                  value={cart.qty}
                                  disabled
                                  className="quantity-input-arrow quantity-input text-center border-gray"
                                />
                                <span
                                  className="custom-next enable c-pointer"
                                  onClick={(e) =>
                                    cart.qty !== 1 && onClickRemoveCart(e, cart)
                                  }
                                >
                                  <i className="icon-minus" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="cart-price">
                            {" "}
                            {Number(cart.totalPrice).toFixed(2)} VND
                          </div>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="p-remove theme-color"
                            onClick={(e) => {
                              removeCart(cart.product_id);
                              setaddCart(true);
                              toast.error("Xóa sản phẩm từ giỏ hàng thành công");
                              e.preventDefault();
                            }}
                          >
                            <span className="icon-clear" />
                          </a>
                        </td>
                      </tr>
                    ))} */}
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

export default connect(null, { getOrderHistory })(withAuth(OrderHistory));

