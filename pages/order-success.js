import moment from "moment";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { getCarts } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";

const OrderSuccess = ({ getCarts }) => {
  useEffect(() => {
    getCarts();
  }, []);
  const carts = useSelector((state) => state.utilis.carts);
  const chcekoutData = useSelector((state) => state.utilis.chcekoutData);
  let date = new Date();
  date.setDate(date.getDate() + 7);

  let randomNumber = `${Math.floor(Math.random() * 100000)}VUE${Math.floor(
    Math.random() * 100000
  )}`;

  return (
    <Layout container footerBg textCenter sticky>
      <main>
        <PageBanner
          title="THANK YOU"
          thankupage
          pageName="order success"
          id={randomNumber}
        />
        <section className="cart-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* <h5>Order Details : </h5> */}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="table-content table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Price images</th>
                          <th scope="col">Product name </th>
                          <th scope="col">Unit price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts &&
                          carts.map((cart) => (
                            <tr key={cart.id}>
                              <td>
                                <a href="#" className="cart-img d-block">
                                  <img src={cart.img} alt="Cart image" />
                                </a>
                              </td>
                              <td>
                                <a href="#" className="p-name primary-color">
                                  {cart.name}
                                </a>
                              </td>
                              <td>
                                <div className="cart-price">
                                  {" "}
                                  ${Number(cart.mainPrice).toFixed(2)}
                                </div>
                              </td>

                              <td>
                                <div className="cart-price">
                                  {" "}
                                  ${Number(cart.totalPrice).toFixed(2)}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </form>
                <div className="total-price-area mt-60">
                  <h2 className="font600">Cart totals</h2>
                  <ul className="pt-15 pb-25">
                    <li className="d-flex justify-content-between align-items-center border-gray1 mb-2 pl-25 pr-25 pt-15 pb-15">
                      <span>Subtotal</span>
                      <span>${totalPrice(carts)}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-gray1 pl-25 pr-25 pt-15 pb-15">
                      <span>Total </span>
                      <span>${totalPrice(carts)}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 order-success">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Summery :</h5>
                    <p>
                      <b>Order ID:</b> {randomNumber}
                    </p>
                    <p>
                      <b>Order Date:</b> {moment().format("MMMM DD, YYYY")}
                    </p>
                    <p>
                      <b>Order Total:</b> ${totalPrice(carts)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5>Shipping Address</h5>
                    <p className="text-capitalize">
                      {chcekoutData
                        ? `${chcekoutData.fName} ${chcekoutData.lName}`
                        : "Sabuj Hasan Sarker"}
                    </p>
                    <p>
                      {chcekoutData
                        ? `${chcekoutData.address} ${chcekoutData.country}`
                        : "Jatrabari,Dhaka-1204 Bangladesh"}
                    </p>
                    <p>
                      Contact No.{" "}
                      {chcekoutData ? chcekoutData.phone : "987456321"}
                    </p>
                  </div>
                  <div className="col-12 mt-4">
                    <h5>Payment Method</h5>
                    <p>
                      Pay on Delivery (Cash/Card). Cash on delivery (COD)
                      available. Card/Net banking acceptance subject to device
                      availability.
                    </p>
                    <div className="h2-theme-bg  p-3 mt-4 text-center">
                      <h5 className="text-white">Expected Date Of Delivery</h5>
                      <h2 className="text-white">
                        {moment(date).format("MMMM DD, YYYY")}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default connect(null, { getCarts })(OrderSuccess);
