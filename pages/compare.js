import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import ProductModal from "../src/components/products/ProductModal";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { addToCart, compare, getCompare } from "../src/redux/action/utilis";

const Compare = ({ getCompare, addToCart, compare }) => {
  const compare_ = useSelector((state) => state.utilis.compares);
  useEffect(() => {
    getCompare();
  }, []);

  const [addCart, setaddCart] = useState(false);
  const [addCompare, setAddCompare] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [product, setProduct] = useState(false);
  const handerAddToCart = (id) => {
    const productCompare = compare_.find((compare) => Number(compare.id) === Number(id));
    setProduct(productCompare);
    setQuickView(true);
  }


  return (
    <Layout>
      {/* <PageBanner title="Compare" /> */}
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      {compare_ && compare_.length > 0 ? (
        <div className="wishlist-area mt-100">
          <div className="container">
            <div className="row pb-100 cart-table">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col"></th>
                        <th scope="col">Xóa sản phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compare_ &&
                        compare_.map((compare_) => (
                          <tr className="text-center" key={compare_.id}>
                            <td>
                              <Link href={`/shop/${compare_.id}`}>
                                <a className="cart-img d-block">
                                  <img src={compare_.img} alt="compare_" />
                                </a>
                              </Link>
                            </td>
                            <td>
                              <Link href={`/shop/${compare_.id}`}>
                                <a className="p-name primary-color">
                                  {compare_.name}
                                </a>
                              </Link>
                            </td>
                            <td>
                              <div className="cart-price">
                                {Number(compare_.mainPrice).toFixed(2)} VND
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="web-btn h2-theme-border1 d-inline-block text-capitalize white rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-30 pr-30 ptb-17"
                                value={compare_.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handerAddToCart(e.target.value)
                                }}>
                                Thêm vào giỏ hàng
                              </button>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="p-remove theme-color"
                                onClick={(e) => {
                                  compare(compare_);
                                  e.preventDefault();
                                  toast.error("Bạn đã xóa 1 sản phẩm so sánh");
                                  setAddCompare(true);
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
        <h2 className="py-5 text-center w-100">Không có sản phẩm so sánh</h2>
      )}
    </Layout>
  );
};

export default connect(null, { getCompare, addToCart, compare })(Compare);
