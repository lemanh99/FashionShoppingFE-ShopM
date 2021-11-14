import Link from "next/dist/client/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/product";
import { arrLengthByKey, findFilterValue } from "../../../utils/utils";

const Right = ({ blogs, getProducts, products }) => {
  let category = findFilterValue(blogs, "category"),
    tags = findFilterValue(blogs, "tags");
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="shop-sidebar-area blog-sidebar-area">
      <div className="row">
        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
          <div className="sidebar-widget mb-20">
            <h5 className="mb-15 title font600 sidebar-title d-inline-block position-relative pb-1">
              Blog Categories
            </h5>
            <ul>
              {category &&
                category.map((cat, i) => (
                  <li className="pb-15 d-block" key={i}>
                    <Link href="/blog">
                      <a className="text-capitalize">
                        {cat}
                        <span> ({arrLengthByKey(blogs, "category", cat)})</span>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
          <div className="sidebar-widget ">
            <h5 className="title font600 sidebar-title d-inline-block position-relative mb-25 pb-1">
              Recent Product
            </h5>
            <div className="side-product mb-15">
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
                                alt="Product"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="side-pro-text">
                          <h6 className="pb-10">
                            <Link href={`/shop/${product.id}`}>
                              <a>{product.name} </a>
                            </Link>
                          </h6>
                          <span className="price font500">
                            ${product.mainPrice}{" "}
                            {product.paice && <del>${product.price}</del>}
                          </span>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>

        <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
          <div className="sidebar-widget mt-25">
            <h5 className="mb-10 title font600 sidebar-title d-inline-block position-relative pb-1">
              Archives
            </h5>
            <ul className="shop-archive">
              <li className="pb-10 font14">
                <a href="#">May 2018</a>
              </li>
              <li className="pb-10 font14">
                <a href="#">November 2017</a>
              </li>
              <li className="pb-10 font14">
                <a href="#">August 2016</a>
              </li>
              <li className="pb-10 font14">
                <a href="#">November 2019</a>
              </li>
              <li className="pb-10 font14">
                <a href="#">July 2016</a>
              </li>
              <li className="pb-10 font14">
                <a href="#">August 2010</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-xl-12  col-lg-12  col-md-6  col-sm-12 col-12">
          <div className="sidebar-widget mt-25">
            <h5 className="mb-20 title font600 sidebar-title d-inline-block position-relative pb-1">
              Popular tags
            </h5>
            <ul className="shop-tag">
              {tags &&
                tags.map((t, i) => (
                  <li className="pb-10 font13 d-inline-block" key={i}>
                    <a href="#">{t}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, { getProducts })(Right);
