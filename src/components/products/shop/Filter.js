import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { filterByPrice } from "../../../redux/action/filter";
import { getProducts } from "../../../redux/action/product";
import {
  arrLengthByKey,
  findFilterValue,
  hideFromArr,
} from "../../../utils/utils";
import PriceFilter from "./PriceFilter";

const Filter = ({ filterByPrice, products, getProducts }) => {
  useEffect(() => {
    getProducts();
  }, []);
  const [active_, setActive_] = useState(0);
  const tags = findFilterValue(products, "tags"),
    category = findFilterValue(products, "category", [
      "home1unmissed",
      "home1handpicked",
      "home2bestdeal",
      "home2featured",
      "home1purchased",
      "home3BestDeal",
      "home3Featured",
      "home3BestSelling",
      "home2tranding",
    ]),
    size = findFilterValue(products, "size"),
    colors = findFilterValue(products, "colors");

  const changeString = (value) => {
    return value.split(" ").join("-").toLowerCase();
  };

  return (
    <div className="col-xl-3  col-lg-4  col-md-12  col-sm-12 col-12">
      <div className="shop-sidebar-area pt-80">
        <div className="row">
          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="row">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="sidebar-widget mb-20">
                  <h6 className="mb-15 title font600 sidebar-title d-inline-block position-relative pb-1">
                    Phân loại
                  </h6>
                  <ul>
                    {category &&
                      category.map((cat, i) => (
                        <li className="pb-15 d-block" key={i}>
                          <Link href={`/shop/category/${changeString(cat)}`}>
                            <a className="text-capitalize">
                              {cat}
                              <span className="ms-1">
                                ({arrLengthByKey(products, "category", cat)})
                              </span>
                            </a>
                          </Link>
                          <span className="accordion" />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <PriceFilter
                filterByPrice={filterByPrice}
                setActive_={setActive_}
              />
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget">
              <h6 className="mb-25 title font600 sidebar-title d-inline-block position-relative pb-1">
                Màu sắc
              </h6>
              <ul className="shop-color">
                {colors &&
                  colors.map((color, i) => (
                    <li className="pb-10 font13" key={i}>
                      <Link href={`/shop/color/${changeString(color)}`}>
                        <a className="text-capitalize">
                          {color} ({arrLengthByKey(products, "colors", color)})
                        </a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="mb-15 title font600 sidebar-title d-inline-block position-relative pb-1">
                Kích thước
              </h6>
              <ul className="shop-color">
                {size &&
                  size.map((s, i) => (
                    <li className="pb-10 font13" key={i}>
                      <Link href={`/shop/size/${changeString(s)}`}>
                        <a className="text-capitalize">
                          {s} ({arrLengthByKey(products, "size", s)})
                        </a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="mb-20 title font600 sidebar-title d-inline-block position-relative pb-1">
                Thẻ tag phổ biến
              </h6>
              <ul className="shop-tag">
                {tags &&
                  tags.map((tag, i) => (
                    <li className="pb-10 font13 d-inline-block" key={i}>
                      <Link href={`/shop/tag/${changeString(tag)}`}>
                        <a className="text-capitalize">{tag}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
            <div className="sidebar-widget mt-25">
              <h6 className="title font600 sidebar-title d-inline-block position-relative mb-20 pb-1">
                Có thể bạn thích
              </h6>
              <div className="side-product mb-50">
                {products &&
                  products.map(
                    (product, i) =>
                      i < 3 && (
                        <div
                          className="side-pro-wrapper d-flex align-items-start mb-15"
                          key={i}
                        >
                          <div className="side-pro-img border-gray1 mr-10">
                            <Link href={`/shop/${product.id}`}>
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
                            <h6 className="pb-10">
                              <Link href={`/shop/${product.id}`}>
                                <a href="#">{product.name}</a>
                              </Link>
                            </h6>
                            <span className="price font500">
                              ${Number(product.mainPrice).toFixed(2)}{" "}
                              {product.price && (
                                <del>${Number(product.price).toFixed(2)}</del>
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
});

export default connect(mapStateToProps, { filterByPrice, getProducts })(Filter);
