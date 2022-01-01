import Link from "next/dist/client/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import {
  addToCart,
  addWishlist,
  compare,
  getWishlist,
  removeCompare,
} from "../../redux/action/utilis";
import time from "../../utils/time";
import Reating from "../Reating";
import ProductModal from "./ProductModal";

const Product5 = ({
  product,
  productActionOff,
  addToCart,
  addWishlist,
  getWishlist,
  compare,
  removeCompare,
}) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);
  const compares = useSelector((state) => state.utilis.compares);

  const [quickView, setQuickView] = useState(false);
  const [addCompare, setAddCompare] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [addWishlist_, setAddWishlist_] = useState(false);

  const onClickCompare = (e) => {
    e.preventDefault();
    setAddCompare(true);
    const exitsItem = compares.find((compare) => compare.id === product.id);
    if (compares.length < 3) {
      if (exitsItem) {
        toast.error("Xóa sản phẩm so sánh thành công");
        compare(product);
      } else {
        toast.success("Thêm sản phẩm so sánh thành công");
        compare(product);
      }
    } else {
      if (exitsItem) {
        toast.error("Xóa sản phẩm so sánh thành công");
        removeCompare(product);
      } else {
        toast.error("Danh mục so sánh đã đầy. Xóa sản phẩm ra khỏi danh sách so sánh.");
      }
    }
  };

  const onClickCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setaddCart(true);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    setAddWishlist_(true);
    const wishlist_ = wishlist.find((wishlist) => wishlist.id === product.id);
    if (wishlist_) {
      toast.error("Remove item in wishlist.");
    } else {
      toast.success("Add item in wishlist.");
    }
  };
  return (
    <div className="single-product mb-3">
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      <div className="single-product-img position-relative over-hidden">
        {product.off && (
          <div className="single-product-label position-absolute theme-bg text-center  transition-3 z-index1">
            <span className="white text-uppercase d-block font500">
              -{product.off}%
            </span>
          </div>
        )}
        {product.new && (
          <div className="single-product-label text-label position-absolute theme-bg text-center  transition-3 z-index1">
            <span className="white d-block font500">New</span>
          </div>
        )}
        <div className="position-relative">
          <Link href={`/shop/${product.id}`}>
            <a className="d-block">
              <img src={product.img} alt="product" className="d-block m-auto fs-card-img" />
            </a>
          </Link>
          {productActionOff && (
            <div className="product-action">
              <div className="pro-action-inner">
                <a href="#" className="gray-bg"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickView(true);
                  }}>
                  <i className="icon-shopping-bag" />
                </a>
                <a
                  href="#"
                  onClick={(e) => onClickWishlist(e)}
                  className={`gray-bg ${wishlist && wishlist.find((pro) => pro.id === product.id)
                    ? "active"
                    : ""
                    } `}
                >
                  <i className="fal fa-heart" />
                </a>
                <a
                  href="#"
                  className={`gray-bg ${compares.find((compare) => compare.id === product.id)
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => onClickCompare(e)}
                >
                  <i className="fal fa-random" />
                </a>
                <a
                  href="#"
                  className="gray-bg"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickView(true);
                  }}
                >
                  <i className="fas fa-eye" />
                </a>
              </div>
            </div>
          )}
        </div>
        {product.upcoming && (
          <div className="countdown-time d-flex  justify-content-center product3-count">
            <div className="timer">
              <div className="d-flex">
                <span className="cdown days">
                  <span className="time-count">
                    {time(product.upcoming).days}
                  </span>
                  <p>Days</p>
                </span>
                <span className="cdown hour">
                  <span className="time-count">
                    {time(product.upcoming).hours}
                  </span>
                  <p>HRS</p>
                </span>
                <span className="cdown minutes">
                  <span className="time-count">
                    {time(product.upcoming).minutes}
                  </span>
                  <p>Min</p>
                </span>
                <span className="cdown second mr-0">
                  <span>
                    <span className="time-count">
                      {time(product.upcoming).seconds}
                    </span>
                    <p>Sec</p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="single-product-info text-center transition-3">
          <div className="rating rating-shop d-flex justify-content-center">
            {product.reating && <Reating rating={product.reating} />}
            <span className="gray-color2 ms-1 rate-product-home">
              ({product && product.reviews ? product.reviews : 0}{""})
            </span>
          </div>
          {/* /rating */}
          <h6 className="light-black-color2 fs-card-title">
            <Link href={`/shop/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </h6>
          <ul className="single-product-price d-flex mt-2 transition-3 justify-content-center">
            <li>
              {product.price && (
                <span className="pr-2 d-inline-block">
                  <del>{Number(product.price)} VND</del>
                </span>
              )}
              <span className="theme-color d-inline-block ms-1 font600">
                {Number(product.mainPrice)} VND
              </span>
            </li>
          </ul>
        </div>
      </div>
      {!productActionOff && (
        <ul className="product-action d-flex justify-content-center mt-2 mb-3">
          <li>
            <a
              href="#"
              onClick={(e) => onClickCart(e)}
              className="d-inline-block gray-bg bor-radius5 light-black-color9 plr-32 font14 font600 mr-6"
            >
              Add to Cart
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => onClickWishlist(e)}
              className={`d-inline-block gray-bg bor-radius5 light-black-color9 mr-6 font14 pr-15 pl-15 ${wishlist && wishlist.find((pro) => pro.id === product.id)
                ? "active"
                : ""
                } `}
            >
              <span>
                <i className="fas fa-heart"></i>
              </span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};
export default connect(null, {
  addToCart,
  addWishlist,
  getWishlist,
  compare,
  removeCompare,
})(Product5);
