import Link from "next/dist/client/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { addToCart } from "../../redux/action/utilis";
import Reating from "../Reating";
import ProductModal from "./ProductModal";

const Product2 = ({ product, addToCart }) => {
  const [quickView, setQuickView] = useState(false);
  const onClickCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Thêm vào giỏ hàng thành công");
  };

  return product ? (
    <div className="single-handpick-item d-flex align-items-center mb35">
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      <div className="single-handpick-item-img position-relative">
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
        {/* /product-label */}
        <Link href={`/shop/${product.id}`}>
          <a className="d-block">
            <img src={product.img} className="w-100" alt="Product" />
          </a>
        </Link>
      </div>
      <div className="single-handpick-item-content">
        <div className="single-product-info mt-25 transition-3">
          <div className="rating rating-shop d-flex mt-25">
            {product.reating && <Reating rating={product.reating} />}
          </div>
          {/* /rating */}
          <h6 className="light-black-color2">
            <Link href={`/shop/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </h6>
          <ul className="single-product-price d-flex pt-6 transition-3 mb-15">
            <li>
              <span className="pr-2 d-inline-block">
                {product.price && (
                  <del>${Number(product.price).toFixed(2)}</del>
                )}
              </span>
              <span className="theme-color d-inline-block font600">
                ${Number(product.mainPrice).toFixed(2)}
              </span>
            </li>
          </ul>
          {/* /single-product-price */}
          <a
            href="#"
            className="web-btn web-btn2 border-white01 d-inline-block font700 text-capitalize light-black-color9 position-relative over-hidden pl-35 pr-35 ptb-12"
            onClick={(e) => onClickCart(e)}
          >
            Add To Cart
          </a>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default connect(null, { addToCart })(Product2);
