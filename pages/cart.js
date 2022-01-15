import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import withoutAuthNotPath from "../src/HOC/withoutAuthNotPath";
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
    toast.success("Thêm số lượng thành công", { duration: 500 });
  };
  const onClickRemoveCart = (e, cart) => {
    e.preventDefault();
    decreaseCart(cart);
    setaddCart(true);
    toast.success("Giảm số lượng thành công", { duration: 500 });
  };
  return (
    <Layout>
      {carts && carts.length > 0 ? (
        <div className="cart-area mt-100">
          <div className="container border-b-light-gray pb-100">
            <div className="cart-table text-center table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng</th>
                    <th scope="col">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {carts &&
                    carts.map((cart) => (
                      <tr key={cart.id}>
                        <td>
                          <Link href={`/shop/${cart.slug}`}>
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
                              removeCart(cart.product_sku_id);
                              setaddCart(true);
                              toast.error("Xóa sản phẩm từ giỏ hàng thành công" , { duration: 500 });
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
            <div className="row">
              <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12 offset-xl-6 offset-lg-6">
                <div className="total-price-area mt-60">
                  <h2 className="font600">Thanh toán giỏ hàng</h2>
                  <ul className="pt-15 pb-25">
                    <li className="d-flex justify-content-between align-items-center border-gray1 mb-2 pl-25 pr-25 pt-15 pb-15">
                      <span>Tổng tiền</span>
                      <span>{totalPrice(carts)} VND</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-gray1 pl-25 pr-25 pt-15 pb-15">
                      <span>Tổng thanh toán </span>
                      <span>{totalPrice(carts)} VND</span>
                    </li>
                  </ul>
                  <Link href="/checkout">
                    <a className="web-btn h2-theme-border1 d-inline-block text-uppercase white  rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17 mr-20">
                      Thanh toán
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
        <div className="container">
          <div className="row">
            <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 d-flex align-items-center justify-content-center">
              <div className="page-title-not-found mt-50 text-center">
                <div className="position-relative">
                  <Link href={`/`}>
                    <a className="d-block">
                      {/* <img src= alt="" /> */}
                      <img src="/images/product/notfound.png" alt="notfound" className="d-block m-auto fs-card-img" />
                    </a>
                  </Link>
                </div>
                <h2 className="text-capitalize font600 mb-10">Không có sản phẩm nào</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center bg-transparent">
                    <li
                      className="breadcrumb-item active text-capitalize"
                      aria-current="page"
                    >
                      <Link href="/">
                        <a className="text-center mt-100 mb-100">Quay lại trang chủ</a>
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default connect(null, { removeCart, addToCart, decreaseCart, getCarts })(
  withoutAuthNotPath(Cart)
);
