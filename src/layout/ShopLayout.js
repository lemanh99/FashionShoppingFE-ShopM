import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { getProductFilterByApi, getProducts } from "../../src/redux/action/product";
import { getProductByFilter } from "../../src/utils/filterProduct";
import { hideFromArr } from "../../src/utils/utils";
import Paggination from "../components/Paggination";
import Product3 from "../components/products/Product3";
import Product5 from "../components/products/Product5";
import ProductListView from "../components/products/ProductListView";
import Filter from "../components/products/shop/Filter";
import withoutAuthNotPath from "../HOC/withoutAuthNotPath";
import { activeData, dblock } from "../utils/utils";

const ShopLayout = ({
  getProducts,
  allProducts,
  loading,
  keyValueForQurey,
  value,
  active_,
  getProductFilterByApi
}) => {
  useEffect(() => {
    if (value) {
      if (keyValueForQurey == "catagory") {
        getProductFilterByApi({ category_name: value });
      } else if (keyValueForQurey == "search") {
        getProductFilterByApi({ search_keyword: value })
      } else if (keyValueForQurey == "colors") {
        getProductFilterByApi({ color_name: value })
      } else if (keyValueForQurey == "sizes") {
        getProductFilterByApi({ size_name: value })
      } else if (keyValueForQurey == "tags") {
        getProductFilterByApi({ tag: value })
      }
    }
    else { getProducts() };
  }, [value]);
  const [active, setActive] = useState(active_ ? active_ : 0);
  let sort = 12;
  let products = allProducts;
  return (
    <div className="product-area shop-product mt-20 mb-100">
      <div className="container">
        <div className="product-wrapper mt-1">
          <div className="row">
            <Filter />
            <div className="col-xl-9  col-lg-8  col-md-12  col-sm-12 col-12">
              <Tab.Container defaultActiveKey="grid">
                <div className="row">
                  <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                    <div className="shop-header pt-70 mb-20">
                      <div className="row align-items-center position-relative s-top-nv">
                        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pb-15 position-static pl-xl-0">
                          <div className="shop-header-right d-flex align-items-center justify-content-between">
                            <ul className="d-flex  align-items-center s-fil-vm clear-both">
                              <li>
                                <div className="view-mode d-flex align-items-center">
                                  <Nav
                                    className="nav nav-tabs border-0"
                                    id="myTab"
                                    role="tablist"
                                  >
                                    <Nav.Item
                                      className="nav-item border-0"
                                      role="presentation"
                                    >
                                      <Nav.Link
                                        as="button"
                                        eventKey="grid"
                                        className="border-0"
                                      >
                                        <span>
                                          <i className="fas fa-th" />
                                        </span>
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                      className="nav-item"
                                      role="presentation"
                                    >
                                      <Nav.Link
                                        as="button"
                                        eventKey="list"
                                        className="border-0"
                                      >
                                        <span>
                                          <i className="fas fa-bars" />
                                        </span>
                                      </Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                  {/* /view-mode-tab nav */}
                                </div>
                              </li>
                            </ul>
                            <ul className="shop-right d-flex align-items-center">
                              <li>
                                <div className="shop-h-title">
                                  <h6 className="primary-color2 mb-0 font13">
                                    {/* Showing 1–12 of 38 results */}
                                    {activeData(active, sort, products)}
                                  </h6>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  products && products.length > 0 ? (
                    <Tab.Content>
                      <Tab.Pane eventKey="grid">
                        <div className="popular-product">
                          <div className="row shop-page-product-active">
                            {products &&
                              products.map((product, i) => (
                                <div
                                  className={`col-md-3  col-sm-6 ${dblock(
                                    active,
                                    i,
                                    sort
                                  )}`}
                                  key={product.id}
                                >
                                  {/* <Product product={product} /> */}
                                  <Product5 product={product} productActionOff />
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="list">
                        {products &&
                          products.map((product, i) => (
                            <div
                              className={dblock(active, i, sort)}
                              key={product.id}
                            >
                              <ProductListView product={product} />
                            </div>
                          ))}
                      </Tab.Pane>
                    </Tab.Content>
                  ) : (
                    <h2 className="text-center">Không có sản phẩm nào</h2>
                  )
                )}

              </Tab.Container>
              {!loading ? (
              <div className="mt-5">
                <Paggination
                  length={products && products.length}
                  sort={sort}
                  active={active}
                  setActive={setActive}
                />
              </div>
              ):(null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProducts: hideFromArr(
    getProductByFilter(state.product.products, state.filter)
  ),
  loading: state.product.loading
});

export default connect(mapStateToProps, { getProducts, getProductFilterByApi })( withoutAuthNotPath(ShopLayout));