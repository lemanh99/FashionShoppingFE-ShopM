import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import {
  addToCart,
  decreaseCart,
  getCarts,
  removeCart,
} from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";

const Cart = ({ removeCart, addToCart, decreaseCart, getCarts }) => {
  useEffect(() => {
    getCarts();
  }, []);
  const carts = useSelector((state) => state.utilis.carts);
  const [cartValue, setCartValue] = useState(0);

  const [addCart, setaddCart] = useState(false);

  const onClickCart = (e, cart) => {
    e.preventDefault();
    addToCart(cart);
    setaddCart(true);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  const onClickRemoveCart = (e, cart) => {
    e.preventDefault();
    decreaseCart(cart);
    setaddCart(true);
    toast.error("Remove item from Cart.");
  };
  return (
    <Layout>
      <PageBanner pageName="Cart" title="Shoping Cart" />

      {carts && carts.length > 0 ? (
        <div className="cart-area mt-100">
          <div className="container border-b-light-gray pb-100">
            <div className="cart-table text-center table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Price images</th>
                    <th scope="col">Product name </th>
                    <th scope="col">Unit price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {carts &&
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
                            ${Number(cart.mainPrice).toFixed(2)}
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
                            ${Number(cart.totalPrice).toFixed(2)}
                          </div>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="p-remove theme-color"
                            onClick={(e) => {
                              removeCart(cart.id);
                              setaddCart(true);
                              toast.error("Remove Item from cart.");
                              e.preventDefault();
                            }}
                          >
                            <span className="icon-clear" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="coupon-and-update-area pt-20">
              <div className="row">
                <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                  <div className="coupon-code-area pt-15">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="pl-15 mr-10 pt-0 mb-15 d-inline-block width50"
                      />
                      <a
                        href="#"
                        className="web-btn h2-theme-border1 d-inline-block text-uppercase white  rounded-0 h2-theme-color cart-c-btn h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17 mr-20"
                      >
                        Apply coupon
                      </a>
                    </form>
                  </div>
                </div>
                {/* /col */}
                <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                  <div className="update-area d-flex justify-content-xl-end">
                    <a
                      href="#"
                      className="web-btn h2-theme-border1 d-inline-block text-uppercase white mt-15 rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-60 pr-60 ptb-17 mr-20"
                    >
                      UPDATE CART
                    </a>
                  </div>
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            <div className="row">
              <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12 offset-xl-6 offset-lg-6">
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
                  <Link href="/checkout">
                    <a className="web-btn h2-theme-border1 d-inline-block text-uppercase white  rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17 mr-20">
                      Checkout
                    </a>
                  </Link>
                </div>
              </div>
              {/* /col */}
            </div>
          </div>
          {/* /container */}
        </div>
      ) : (
        <h2 className="py-5 text-center w-100">No Product Found</h2>
      )}
    </Layout>
  );
};

export default connect(null, { removeCart, addToCart, decreaseCart, getCarts })(
  Cart
);
