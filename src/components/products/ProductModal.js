import { useEffect, useState } from "react";
import { ButtonGroup, ButtonToolbar, Modal, Nav, Tab, ToggleButton } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import {
  addToCart,
  addWishlist,
  compare,
  decreaseCart,
  getCarts,
  getCompare,
  getWishlist,
} from "../../redux/action/utilis";
import { productCart } from "../../utils/addCartProduct";
import time from "../../utils/time";
import Reating from "../Reating";
import Router from "next/router";
const ProductModal = ({
  show,
  handleClose,
  product,
  carts,
  wishlists,
  addToCart,
  addWishlist,
  decreaseCart,
  getCarts,
  getWishlist,
  getCompare,
  compares,
  compare,
  mainPrice,
  price,
}) => {
  const [sizeSelected, setSizeSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    getCarts();
    getWishlist();
    getCompare();
    setSizeSelected(null);
    setQuantity(1);
  }, []);
  const cart = product && carts && carts.find((cart) => cart.id === product.id);
  const wishlist =
    product &&
    wishlists &&
    wishlists.find((wishlist) => wishlist.id === product.id);
  const compare_ =
    product &&
    compares &&
    compares.find((compare) => compare.id === product.id);

  const onClickCart = (e) => {
    e.preventDefault();
    // const products = { ...product, sizeSelected: sizeSelected }
    const products = productCart(product, sizeSelected)
    addToCart(products);
  };
  const onClickRemoveCart = (e) => {
    e.preventDefault();
    decreaseCart(cart);
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    if (wishlist) {
      toast.error("Xóa sản phẩm yêu thích thành công");
    } else {
      toast.success("Thêm sản phẩm yêu thích thành công");
    }
  };
  const onClickCompares = (e) => {
    e.preventDefault();
    compare(product);
    if (compare_) {
      toast.error("Bạn đã xóa 1 sản phẩm so sánh");
    } else {
      toast.success("Thêm sản phẩm so sánh thành công");
    }
  };
  const handleBuyNow = (product)=>{
    addToCart({ ...productCart(product, sizeSelected), qty: quantity });
    toast.success("Thêm vào giỏ hàng thành công");
    
    Router.push(
      {
        pathname: "/cart",
      },
      undefined,
      { shallow: true }
    );
    handleClose();
  }
  let removeformCat = [
    "home1unmissed",
    "home1handpicked",
    "home2bestdeal",
    "home2featured",
    "home1purchased",
    "home3BestDeal",
    "home3Featured",
    "home3BestSelling",
    "home2tranding",
  ];
  let totalTime = time(product && product.upcoming);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="product-details-area product-modal">
          <div>
            <i
              className="fa fa-times modal-icon "
              onClick={() => handleClose()}
            />
          </div>
          <div className="product-details-area pro-top-thamb pro-bottom-thamb">
            <div className="container">
              {/* product-details-tab-area start */}
              <div className="product-details-content">
                <div
                  className="single-product-tab-content tab-content"
                  id="myTabContent2"
                >
                  <div className="row">
                    <div className="col-xxl-7 col-xl-7  col-lg-6  col-md-11  col-sm-12 col-12">
                      <div className="product-left-img-tab mt-20">
                        <div className="d-flex align-items-start">
                          <Tab.Container defaultActiveKey="tab-0">
                            <Nav
                              as="div"
                              className="nav flex-column nav-pills me-4"
                            >
                              {product && product.images &&
                                product.images.map((img, i) => (
                                  <Nav.Link
                                    as="button"
                                    eventKey={`tab-${i}`}
                                    key={i}
                                  >
                                    <img
                                      className="product-thumbnail w-100 border-gray2"
                                      src={img.src}
                                      alt=""
                                    />
                                  </Nav.Link>
                                ))}
                            </Nav>
                            <Tab.Content className="w-100">
                              {product && product.images &&
                                product.images.map((img, i) => (
                                  <Tab.Pane
                                    eventKey={`tab-${i}`}
                                    className="position-relative"
                                    key={i}
                                  >
                                    <div className="product-img border-gray2 w-100">
                                      <img
                                        src={img.src}
                                        alt="product"
                                        className="w-100"
                                      />
                                    </div>
                                  </Tab.Pane>
                                ))}
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                      </div>
                      {/* /product-left-img-tab */}
                    </div>
                    {/* /col */}
                    <div className="col-xxl-5 col-xl-5  col-lg-6  col-md-11  col-sm-12 col-12">
                      <div className="product-view-info mt-30">
                        <div className="product-left-img-info">
                          <h3 className="mb-20">{product && product.name}</h3>
                          <div className="rating rating-shop d-flex align-items-center">
                            {product && (
                              <Reating
                                rating={product.reating ? product.reating : 0}
                              />
                            )}
                            <span className="gray-color2 ms-1">
                              (
                              {product && product.reviews ? product.reviews : 0}{" "}
                              Đánh giá)
                            </span>
                          </div>
                          {/* /rating */}
                          <div className="price pb-18 pt-3">
                            <span className="rc-price font700">
                              {Number(product && product.mainPrice).toFixed(2)} VND
                            </span>
                            {product && product.price && (
                              <span className="ms-1 text-muted font600">
                                <del>${Number(product.price).toFixed(2)}</del>
                              </span>
                            )}
                          </div>
                          <div className="p-info-text pr-55">
                            <p className="gray-color2">
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
                              {/* {product && product.description_detail} */}
                            </p>
                          </div>
                          {product && product.upcoming && (
                            <div className="countdown-time d-flex mt-4  justify-content-start details-page-count">
                              <div className="timer">
                                <div className="d-flex">
                                  <span className="cdown days">
                                    <span className="time-count">
                                      {totalTime.days}
                                    </span>
                                    <p>Ngày</p>
                                  </span>
                                  <span className="cdown hour">
                                    <span className="time-count">
                                      {totalTime.hours}
                                    </span>
                                    <p>Giờ</p>
                                  </span>
                                  <span className="cdown minutes">
                                    <span className="time-count">
                                      {totalTime.minutes}
                                    </span>
                                    <p>Phút</p>
                                  </span>
                                  <span className="cdown second mr-0">
                                    <span className="time-count">
                                      {totalTime.seconds}
                                    </span>
                                    <p>Giây</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="all-info d-sm-flex align-items-center mt-35">
                            <div className="sidebar-widget">
                              <h6 className="mb-25 title font600 sidebar-title d-inline-block position-relative pb-1">
                                Loại
                              </h6>
                              <ButtonToolbar>
                                <ButtonGroup className="me-2 radio-toolbar">
                                  {product && product.size &&
                                    product.size.map((size, i) => (
                                      <ToggleButton
                                        key={i}
                                        id={`radio-${i}`}
                                        type="radio"
                                        variant="outline-secondary"
                                        name="radio"
                                        value={size}
                                        checked={sizeSelected === size}
                                        onChange={(e) => { setSizeSelected(e.currentTarget.value); setQuantity(1) }}
                                      >
                                        {size}
                                      </ToggleButton>
                                    ))}
                                </ButtonGroup>
                              </ButtonToolbar>
                            </div>

                          </div>
                          <div className="all-info d-sm-flex align-items-center mt-35">
                            <div className="quick-add-to-cart d-sm-flex align-items-center mb-15 mr-10">
                              <div className="quantity-field position-relative d-inline-block mr-3">
                                <button
                                  className="custom-prev"
                                  onClick={(e) => { setQuantity(quantity + 1) }}
                                  disabled={quantity <= 100 ? false : true}
                                >
                                  <i className="icon-plus" />
                                </button>
                                <input
                                  type="text"
                                  name="select1"
                                  value={quantity ? quantity : 1}
                                  disabled
                                  className="quantity-input-arrow quantity-input text-center border-gray"
                                />
                                <button
                                  className="custom-next enable"
                                  onClick={(e) => { setQuantity(quantity - 1) }
                                  }
                                  disabled={quantity > 1 ? false : true}
                                >
                                  <i className="icon-minus" />
                                </button>
                              </div>
                            </div>
                            <div className="pro-wishlist d-inline-block mb-15">
                              <a
                                href="#"
                                className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 `}
                                alt="Mua ngay"
                                title="Mua ngay"
                                onClick={(e) => {
                                  e.preventDefault();
                                  sizeSelected ? handleBuyNow(product) : toast.error("Vui lòng chọn size");
                                }}
                              >
                                <span className="fas fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="pro-wishlist d-inline-block mb-15 ms-2">

                              <a
                                href="#"
                                className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 `}
                                alt="Thêm vào giỏ hàng"
                                title="Thêm vào giỏ hàng"
                                onClick={(e) => {
                                  e.preventDefault();
                                  sizeSelected ? addToCart({ ...productCart(product, sizeSelected), qty: quantity }) : null;
                                  sizeSelected ? toast.success("Thêm vào giỏ hàng thành công") : toast.error("Vui lòng chọn size");
                                  sizeSelected ? handleClose() : null;
                                }}
                              >
                                <span className="icon-shopping-bag" />
                              </a>
                            </div>
                            <div className="pro-wishlist d-inline-block mb-15 ms-2">
                              <a
                                href="#"
                                className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15  ${wishlist ? "active_wishList" : ""
                                  } `}
                                onClick={(e) => onClickWishlist(e)}
                              >
                                <span className="icon-heart" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
                {/*  */}
              </div>
              {/* /product-content */}
            </div>
            {/* /container */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  carts: state.utilis.carts,
  wishlists: state.utilis.wishlist,
  compares: state.utilis.compares,
});

export default connect(mapStateToProps, {
  addToCart,
  decreaseCart,
  getCarts,
  addWishlist,
  getWishlist,
  getCompare,
  compare,
})(ProductModal);
