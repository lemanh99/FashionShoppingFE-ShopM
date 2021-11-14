import { useEffect } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
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
import time from "../../utils/time";
import Reating from "../Reating";
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
  useEffect(() => {
    getCarts();
    getWishlist();
    getCompare();
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
    addToCart(product);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  const onClickRemoveCart = (e) => {
    e.preventDefault();
    decreaseCart(cart);
    toast.error("Remove item from Cart.");
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    if (wishlist) {
      toast.error("Remove item in wishlist.");
    } else {
      toast.success("Add item in wishlist.");
    }
  };
  const onClickCompares = (e) => {
    e.preventDefault();
    compare(product);
    if (compare_) {
      toast.error("Remove item in compare.");
    } else {
      toast.success("Add item in compare.");
    }
  };
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
  let cat_ =
    product &&
    product.catagory.filter(
      (cat) => !removeformCat.join("").includes(cat) && cat
    );
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
                              {product &&
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
                              {product &&
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
                              Reviews)
                            </span>
                          </div>
                          {/* /rating */}
                          <div className="price pb-18 pt-3">
                            <span className="rc-price font700">
                              ${Number(product && product.mainPrice).toFixed(2)}
                            </span>
                            {product && product.price && (
                              <span className="ms-1 text-muted font600">
                                <del>${Number(product.price).toFixed(2)}</del>
                              </span>
                            )}
                          </div>
                          <div className="p-info-text pr-55">
                            <p className="gray-color2">
                              On the other hand, we denounce with righteous
                              indignation and dislike men who are so beguiled
                              and demoralized by the charms we denounce with
                              righteous indignation and dislike men who are so
                              beguiled with righteous
                            </p>
                          </div>
                          {product.upcoming && (
                            <div className="countdown-time d-flex mt-4  justify-content-start details-page-count">
                              <div className="timer">
                                <div className="d-flex">
                                  <span className="cdown days">
                                    <span className="time-count">
                                      {totalTime.days}
                                    </span>
                                    <p>Days</p>
                                  </span>
                                  <span className="cdown hour">
                                    <span className="time-count">
                                      {totalTime.hours}
                                    </span>
                                    <p>HRS</p>
                                  </span>
                                  <span className="cdown minutes">
                                    <span className="time-count">
                                      {totalTime.minutes}
                                    </span>
                                    <p>Min</p>
                                  </span>
                                  <span className="cdown second mr-0">
                                    <span className="time-count">
                                      {totalTime.seconds}
                                    </span>
                                    <p>Sec</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="all-info d-sm-flex align-items-center mt-35">
                            <div className="quick-add-to-cart d-sm-flex align-items-center mb-15 mr-10">
                              <div className="quantity-field position-relative d-inline-block mr-3">
                                <button
                                  className="custom-prev"
                                  onClick={(e) => onClickCart(e)}
                                  disabled={cart ? false : true}
                                >
                                  <i className="icon-plus" />
                                </button>
                                <input
                                  type="text"
                                  name="select1"
                                  value={cart ? cart.qty : 1}
                                  disabled
                                  className="quantity-input-arrow quantity-input text-center border-gray"
                                />
                                <button
                                  className="custom-next enable"
                                  onClick={(e) =>
                                    cart &&
                                    cart.qty !== 1 &&
                                    onClickRemoveCart(e)
                                  }
                                  disabled={cart ? false : true}
                                >
                                  <i className="icon-minus" />
                                </button>
                              </div>
                            </div>

                            <div className="pro-wishlist d-inline-block mb-15">
                              <a
                                href="#"
                                className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15 `}
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(product);
                                  toast.success("Thêm vào giỏ hàng thành công");
                                }}
                              >
                                <span className="icon-shopping-bag" />
                              </a>
                            </div>
                            <div className="pro-wishlist d-inline-block mb-15 ms-2">
                              <a
                                href="#"
                                className={`web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden plr-16 ptb-15  ${
                                  wishlist ? "active_wishList" : ""
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
