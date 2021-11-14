import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
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

  return (
    <Layout>
      <PageBanner title="Compare" />

      {compare_ && compare_.length > 0 ? (
        <div className="wishlist-area mt-100">
          <div className="container">
            <div className="row pb-100 cart-table">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Price images</th>
                        <th scope="col">Product name </th>
                        <th scope="col">Unit price</th>
                        <th scope="col">Add to cart</th>
                        <th scope="col">Total</th>
                        <th scope="col">Remove</th>
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
                                ${Number(compare_.mainPrice).toFixed(2)}
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="web-btn h2-theme-border1 d-inline-block text-capitalize white rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-30 pr-30 ptb-17"
                                onClick={(e) => {
                                  addToCart(compare_);
                                  e.preventDefault();
                                  setaddCart(true);
                                  toast.success("Thêm vào giỏ hàng thành công");
                                }}
                              >
                                add to cart
                              </a>
                            </td>
                            <td>
                              <div className="cart-price">
                                {" "}
                                ${Number(compare_.mainPrice).toFixed(2)}
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="p-remove theme-color"
                                onClick={(e) => {
                                  compare(compare_);
                                  e.preventDefault();
                                  toast.error("Remove item in compare.");
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
        <h2 className="py-5 text-center w-100">No Product Found</h2>
      )}
    </Layout>
  );
};

export default connect(null, { getCompare, addToCart, compare })(Compare);
