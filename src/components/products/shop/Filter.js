import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosIntance from "../../../helpers/axios";
import { filterByPrice } from "../../../redux/action/filter";
import { getProductRecommend, getProducts } from "../../../redux/action/product";
import { changeStringPath } from "../../../utils/string";
import {
  arrLengthByKey,
  findFilterValue,
  hideFromArr,
} from "../../../utils/utils";
import Reating from "../../Reating";
import PriceFilter from "./PriceFilter";

const Filter = ({ filterByPrice, products, getProducts, getProductRecommend, product_recommendations }) => {
  const [categoryFilter, setCategoryFilter] = useState({})
  useEffect(() => {
    getCategoryFilter();
    getProducts();
    getProductRecommend();
  }, []);

  async function getCategoryFilter() {
    const res = await axiosIntance.get(`/product/public/filter`)
    if (res && res.status === 200) {
      const { data } = res.data;
      setCategoryFilter(data)
    }
  }

  const [active_, setActive_] = useState(1);


  return (
    <div className="col-xl-3  col-lg-4  col-md-12  col-sm-12 col-12">
      <div className="shop-sidebar-area pt-80">
        <div className="row">
          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="row">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="sidebar-widget mb-20">
                  <h6 className="mb-15 title font600 sidebar-title d-inline-block position-relative pb-1">
                    Tất cả danh mục
                  </h6>
                  <ul>
                    {categoryFilter && categoryFilter.category ?
                      (categoryFilter.category.map((cat, i) => (
                        <li className="pb-15 d-block" key={i}>
                          <Link href={`/shop/category/${changeStringPath(cat)}`}>
                            <a className="text-capitalize">
                              {cat}
                              {/* <span className="ms-1">
                                ({arrLengthByKey(products, "category", cat)})
                              </span> */}
                            </a>
                          </Link>
                          <span className="accordion" />
                        </li>
                      ))) : null}
                  </ul>
                </div>
              </div>

              <PriceFilter
                filterByPrice={filterByPrice}
                setActive_={setActive_}
              />
            </div>
          </div>
          {/* 
          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget">
              <h6 className="mb-25 title font600 sidebar-title d-inline-block position-relative pb-1">
                Màu sắc
              </h6>
              <ul className="shop-color">
                {categoryFilter && categoryFilter.colors ? (
                  categoryFilter.colors.map((color, i) => (
                    <li className="pb-10 font13" key={i}>
                      <Link href={`/shop/color/${changeStringPath(color)}`}>
                        <a className="text-capitalize">
                          {color}
                          {color} ({arrLengthByKey(products, "colors", color)})
                        </a>
                      </Link>
                    </li>
                  ))
                ) : null}
              </ul>
            </div>
          </div> */}

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="mb-15 title font600 sidebar-title d-inline-block position-relative pb-1">
                Loại
              </h6>
              <ul className="shop-color">
                {categoryFilter && categoryFilter.sizes ? (
                  categoryFilter.sizes.slice(0, 25).map((s, i) => (
                    <li className="pb-10 font13" key={i}>
                      <Link href={`/shop/size/${changeStringPath(s)}`}>
                        <a className="text-capitalize">
                          {/* {s} ({arrLengthByKey(products, "size", s)}) */}
                          {s}
                        </a>
                      </Link>
                    </li>
                  ))
                ) : null}
              </ul>
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="mb-20 title font600 sidebar-title d-inline-block position-relative pb-1">
                Thẻ tag phổ biến
              </h6>
              <ul className="shop-tag">
                {categoryFilter && categoryFilter.tags ? (
                  categoryFilter.tags.map((tag, i) => (
                    <li className="pb-10 font13 d-inline-block" key={i}>
                      <Link href={`/shop/tag/${changeStringPath(tag)}`}>
                        <a className="text-capitalize">{tag}</a>
                      </Link>
                    </li>
                  ))) : null}
              </ul>
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="title font600 sidebar-title d-inline-block position-relative mb-20 pb-1">
                Có thể bạn thích
              </h6>
              <div className="side-product mb-50">
                {product_recommendations &&
                  product_recommendations.map(
                    (product, i) =>
                      i < 3 && (
                        <div
                          className="side-pro-wrapper d-flex align-items-start mb-15"
                          key={i}
                        >
                          <div className="side-pro-img border-gray1 mr-10">
                            <Link href={`/shop/${product.slug}`}>
                              <a>
                                <img
                                  src={product.img}
                                  className="img-fluid"
                                  alt="product"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="side-pro-text">
                            <h6 className="pb-10 light-black-color2 fs-card-title-recommend">
                              <Link href={`/shop/${product.id}`}>
                                <a href="#">{product.name}</a>
                              </Link>
                            </h6>

                            <div className="rating rating-shop d-flex">
                              <Reating rating={product.reating} />
                              <span className="gray-color2 ms-1 rate-product-home">
                                ({product && product.reviews ? product.reviews : 0}{""})
                              </span>
                            </div>
                            <span className="price font500">
                              {Number(product.mainPrice).toFixed(2)}{"VND"}
                              {product.price && (
                                <del>{Number(product.price).toFixed(2)} VND</del>
                              )}
                            </span>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: hideFromArr(state.product.products),
  product_recommendations: state.product.recommended,
});


export default connect(mapStateToProps, { filterByPrice, getProducts, getProductRecommend })(Filter);
