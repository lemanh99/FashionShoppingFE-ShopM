import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import { getOrderByOrderCode } from "../../src/redux/action/order";
import { getCarts } from "../../src/redux/action/utilis";
import { getAddressVietNam } from "../../src/utils/address";

const OrderSuccess = ({ getCarts, getOrderByOrderCode }) => {
  const order = useSelector((state) => state.order);
  const [dataOrder, setDataOrder] = useState({})
  const [shippingAddress, setShippingAddress] = useState({})
  const [orderItem, setOrderItem] = useState([])
  const [addressApi, setAddressApi] = useState([]);

  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      getOrderByOrderCode(code);
      axios.get('https://provinces.open-api.vn/api/?depth=3').then((res) => {
        if (res.status == 200) {
            setAddressApi(res.data)
        }
    })
    }
    getCarts();

  }, [code]);

  useEffect(() => {
    setDataOrder(order.orders);
    setShippingAddress(order.orders.shipping);
    setOrderItem(order.orders.order_item);
  }, [order]);
  const carts = useSelector((state) => state.utilis.carts);
  const chcekoutData = useSelector((state) => state.utilis.chcekoutData);
  let date = new Date();
  date.setDate(date.getDate() + 7);
  // console.log(orderItem)

  return (
    <Layout container footerBg textCenter sticky>
      <main>
        {/* <PageBanner
          title="THANK YOU"
          thankupage
          pageName="order success"
          id={randomNumber}
        /> */}
        <section className="cart-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="total-price-area">
                  <h2 className="font600">Thông tin</h2>
                  <ul className="pt-15 pb-25">
                    <li className="d-flex justify-content-between align-items-center border-gray1 mb-2 pl-25 pr-25 pt-15 pb-15">
                      <span>Tổng tiền</span>
                      <span>{dataOrder && dataOrder.subtotal} VND</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-gray1 pl-25 pr-25 pt-15 pb-15">
                      <span>Tông sản phẩm </span>
                      <span>{dataOrder && dataOrder.total} VND</span>
                    </li>
                  </ul>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="table-content table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Size</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItem &&
                          orderItem.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <a href={`/shop/{}`} className="cart-img d-block">
                                  <img src={item.image} alt="Cart image" />
                                </a>
                              </td>
                              <td>
                                <a href="#" className="p-name primary-color">
                                  {item.product_name}
                                </a>
                              </td>
                              <td>
                                <div className="cart-price">
                                  {item.quantity}
                                </div>
                              </td>
                              <td>
                                <div className="cart-price">
                                  {item.size}
                                </div>
                              </td>
                              <td>
                                <div className="cart-price">
                                  {item.price} VND
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 order-success">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Đơn hàng :</h5>
                    <p>
                      <b>Mã đơn hàng : </b>{dataOrder && dataOrder.order_code}
                    </p>
                    <p>
                      <b>Ngày mua hàng:</b> {dataOrder && dataOrder.order_date}
                    </p>
                    <p>
                      <b>Tổng thanh toán:</b>{dataOrder && dataOrder.payment_total}
                    </p>
                    <p>
                      <b>Phương thức thanh toán: </b>
                      {dataOrder && dataOrder.payment_method}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5>Thông tin giao hàng</h5>
                    <p className="text-capitalize">
                      <b>Họ tên người nhận:</b> {" "}
                      {shippingAddress && shippingAddress.first_name}{" "}{shippingAddress && shippingAddress.last_name}
                    </p>
                    <p>
                      <b>Địa chỉ nhận hàng:</b> {" "}
                      {shippingAddress && shippingAddress.street}{" "}{shippingAddress?(getAddressVietNam(addressApi, shippingAddress.city, shippingAddress.district, shippingAddress.village)):null}
                    </p>
                    <p>
                      <b>Số điện thoại nhận hàng:</b> {" "}
                      {shippingAddress && shippingAddress.phone_number}
                    </p>

                  </div>
                  {shippingAddress && shippingAddress.shipping_status_name != "delivered" &&shippingAddress.shipping_status_name != "cancelled" ? (
                    <div className="col-12 mt-4">
                      <div className="h2-theme-bg  p-3 mt-4 text-center">
                        <h5 className="text-white">Ngày dự kiến nhận hàng</h5>
                        <h2 className="text-white">
                          {moment(date).format("DD-MM-YYYY")}
                        </h2>
                      </div>
                    </div>
                  ) : null}

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default connect(null, { getCarts, getOrderByOrderCode })(withAuth(OrderSuccess));
