import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import ProductModal from "../src/components/products/ProductModal";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import {
  addToCart,
  addWishlist,
  getWishlist,
} from "../src/redux/action/utilis";

const Wishlist = ({ getWishlist, addToCart, addWishlist }) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);

  useEffect(() => {
    getWishlist();
  }, []);

  const [quickView, setQuickView] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [addWishlist_, setAddWishlist_] = useState(false);
  const [product, setProduct] = useState({});

  return (
    <Layout>
      <PageBanner title="Yêu thích" />
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      {wishlist && wishlist.length > 0 ? (
        <div className="wishlist-area mt-100">
          <div className="container">
            <div className="row pb-100 cart-table">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm </th>
                        <th scope="col">Giá</th>
                        <th scope="col">Thêm vào giỏ hàng</th>
                        <th scope="col">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist &&
                        wishlist.map((wishlist) => (
                          <tr className="text-center" key={wishlist.id}>
                            <td>
                              <Link href={`/shop/${wishlist.id}`}>
                                <a className="cart-img d-block">
                                  <img src={wishlist.img} alt="wishlist" />
                                </a>
                              </Link>
                            </td>
                            <td>
                              <Link href={`/shop/${wishlist.id}`}>
                                <a className="p-name primary-color">
                                  {wishlist.name}
                                </a>
                              </Link>
                            </td>
                            <td>
                              <div className="cart-price">
                                {" "}
                                {Number(wishlist.mainPrice).toFixed(2)}VND
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="web-btn h2-theme-border1 d-inline-block text-capitalize white rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-30 pr-30 ptb-17"
                                onClick={(e) => {
                                  setProduct(wishlist);
                                  e.preventDefault();
                                  setQuickView(true);
                                }}
                              >
                                Thêm vào giỏ hàng
                              </a>
                            </td>

                            <td>
                              <a
                                href="#"
                                className="p-remove theme-color"
                                onClick={(e) => {
                                  addWishlist(wishlist);
                                  e.preventDefault();
                                  toast.error("Xóa sản phẩm yêu thích thành công");
                                  setAddWishlist_(true);
                                }}
                              >
                                <span className="icon-clear"></span>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bottom-line"></div>
          </div>
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

export default connect(null, { getWishlist, addToCart, addWishlist })(Wishlist);
