import Link from "next/dist/client/link";
import { useState } from "react";
import toast from "react-hot-toast";
import ShowMoreText from "react-show-more-text";
import { connect, useSelector } from "react-redux";
import {
  addToCart,
  addWishlist,
  compare,
  getWishlist,
  removeCompare,
} from "../../redux/action/utilis";
import Reating from "../Reating";
import ProductModal from "./ProductModal";

const ProductListView = ({
  product,
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
      toast.error("Xóa sản phẩm yêu thích thành công");
    } else {
      toast.success("Thêm sản phẩm yêu thích thành công");
    }
  };
  return (
    <div className="row">
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      <div className="single-pro-list d-sm-flex p-0 px-0">
        <div className="col-xl-5 col-lg-5  col-md-5  col-sm-5 col-12 plr-14">
          <div className="single-product mb-40">
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
              <Link href="/product-details">
                <a className="position-relative d-block">
                  <img className=" w-100" src={product.img} alt="product" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-7 col-lg-7  col-md-7  col-sm-7 col-12 plr-14">
          <div className="single-product-info  mb-40">
            <h5 className="light-black-color2 font500">
              <Link href={`/shop/${product.slug}`}>
                <a>{product.name}</a>
              </Link>
            </h5>
            <ul className="single-product-price d-flex mt-2 mb-15">
              <li>
                {product.price && (
                  <span className="pr-2 d-inline-block">
                    <del>{Number(product.price).toFixed(2)}VND</del>
                  </span>
                )}
                <span className="theme-color d-inline-block font600">
                  {Number(product.mainPrice).toFixed(2)} VND
                </span>
              </li>
            </ul>

            <div className="rating rating-shop d-flex mb-20">
              <Reating rating={product.reating} />
              <span className="gray-color2 ms-1 rate-product-home">
                ({product && product.reviews ? product.reviews : 0}{""})
              </span>
            </div>

            <p className="light-black-color5 font300 mb-40">
              <ShowMoreText
                /* Default options */
                lines={5}
                more={<><br /> {"Xem thêm"}</>}
                less={<><br /> {"Thu gọn"}</>}
                className="content-css"
                anchorClass="my-anchor-css-class show-text-more"
                // onClick={this.executeOnClick}
                expanded={false}

                truncatedEndingComponent={"... "}
              >
                <span style={{ whiteSpace: 'pre-line' }}>{product && product.description_detail}</span>

              </ShowMoreText>
            </p>
            <div className=" d-flex align-items-center mb-25">
              <div className="pro-list-btn d-inline-block">
                <a
                  href="#"
                  className="web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden pl-25 pr-25 ptb-17"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickView(true);
                  }}
                >
                  Thêm vào giỏ hàng
                </a>
              </div>
              {/* <div className="pro-wishlist d-inline-block ml-10">
                <a
                  href="#"

                  className="web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 product-list-view"
                >
                  <span className="fas fa-eye" />
                </a>
              </div> */}
              <div className="pro-wishlist d-inline-block ml-10">
                <a
                  href="#"
                  className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 product-list-view ${compares.find((compare) => compare.id === product.id)
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => onClickCompare(e)}
                >
                  <span className="fal fa-random" />
                </a>
              </div>
              <div className="pro-wishlist d-inline-block ml-10">
                <a
                  href="#"
                  onClick={(e) => onClickWishlist(e)}
                  className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 product-list-view ${wishlist && wishlist.find((pro) => pro.id === product.id)
                    ? "active"
                    : ""
                    } `}
                >
                  <span className="icon-heart" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, {
  addToCart,
  addWishlist,
  getWishlist,
  compare,
  removeCompare,
})(ProductListView);
