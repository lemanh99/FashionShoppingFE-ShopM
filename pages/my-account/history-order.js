// import swal from "@sweetalert/with-react";
import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import SideBarMyAccount from "../../src/components/myaccount/sidebar";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import { getOrderHistory, cancelOrder } from "../../src/redux/action/order";
import { convert_datetime_from_timestamp } from "../../src/utils/time";


const OrderHistory = ({ getOrderHistory, cancelOrder }) => {
  const orders = useSelector((state) => state.order.orders);
  const [listOrder, setListOrder] = useState([])
  useEffect(() => {
    getOrderHistory()
  }, [])

  useEffect(() => {
    setListOrder(orders)
  }, [orders])

  const handleCancel = (value) => {
    console.log("dá", value)
    cancelOrder(value)
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
                                        <td key={"item" + item.id}>
                                          {order.is_cancelled ? (
                                            <div className="order-button-payment mt-20">
                                              <button
                                                type="button"
                                                className="bt-btn theme-btn"
                                                style={{ padding: '9px 14px' }}
                                                value={order.id}
                                                onClick={(e)=>handleCancel(e.target.value)}
                                              >Hủy đơn hàng</button>
                                            </div>
                                          ) : null}
                                        </td>

                                      </tr>
                                    </>
                                  ))}
                                  {/* {order.order_item && order.order_item.map((

                                  ))} */}
                                </>
                              ))}
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

export default connect(null, { getOrderHistory, cancelOrder })(withAuth(OrderHistory));

