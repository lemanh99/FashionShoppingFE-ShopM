import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import toast from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import Reating from "../../src/components/Reating";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import { getProducts, getSingleProduct } from "../../src/redux/action/product";
import { getRateByProduct, rateProduct } from "../../src/redux/action/rate";
import {
  addToCart,
  addWishlist,
  compare,
  decreaseCart,
  getCarts,
  getCompare,
  getWishlist,
} from "../../src/redux/action/utilis";
import time, { convert_datetime_from_timestamp } from "../../src/utils/time";
const ProductDetails = ({
  getSingleProduct,
  getCarts,
  getCompare,
  getWishlist,
  getRateByProduct,
  rates,
  product,
  products,
  carts,
  wishlists,
  compares,
  addToCart,
  decreaseCart,
  compare,
  addWishlist,
  rateProduct,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const authenticate = useSelector((state) => state.auth.authenticate)
  const [rateItem, setRateItem] = useState([])
  const [comment, setComment] = useState("")
  const [rateUser, setRateUser] = useState(0)

  const changeRating = (newRating, name) => {
    setRateUser(newRating)
  }
  useEffect(() => {
    if (id) {
      getSingleProduct(id);
      getRateByProduct(id);
    }

    getCarts();
    getWishlist();
    getProducts();
    getCompare();
  }, [id]);

  useEffect(() => {
    if (rates.item && rates.item.length > 0) { setRateItem(rates.item); }

  }, [rates])

  const cart = product && carts && carts.find((cart) => cart.id === product.id);
  const wishlist =
    product &&
    wishlists &&
    wishlists.find((wishlist) => wishlist.id === product.id);
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
    product.category.filter(
      (cat) => !removeformCat.join("").includes(cat) && cat
    );
  const onClickCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  const onClickRemoveCart = (e) => {
    e.preventDefault();
    decreaseCart(cart);
    toast.error("Xóa sản phẩm từ giỏ hàng thành công");
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
  let totalTime = time(product && product.upcoming);

  const onClickComment = (e) => {
    if (!authenticate) {
      router.push(
        {
          pathname: "/login",
        },
        undefined,
        { shallow: true }
      );

    } else {
      e.preventDefault();
      const data = {
        "product_id": product.id,
        "product_sku_id": null,
        "description": comment,
        "star": rateUser
      }
      rateProduct(product.id, data);
      setComment("");
      setRateUser(0);
      toast.success("Thêm bình luận thành công");
    }

  };
  const handleDetailList = (content) => {
    let data = []
    let str_split = String(content).split('\n');
    for (const text of str_split) {
      var text_split = text.split(":")
      if (text_split && text_split[0] && text_split[1]) {
        var detail = {
          "name": text_split[0],
          "content": text_split[1],
        }
        data.push(detail)
      }
    }
    return data;
  }

  return (
    <Layout>
      {/* <PageBanner title="Product Details" /> */}
      {product && product ? (
        <div className="product-details-area pro-top-thamb pro-bottom-thamb pt-80">
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
                          {rates && (
                            <Reating
                              rating={rates && rates.avg_rate ? rates.avg_rate : 0}
                            />
                          )}
                          <span className="gray-color2 ms-1">
                            ({rates && rates.total_item ? rates.total_item : 0}{" "}
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
                            {/* <span style={{whiteSpace: 'pre-line'}}>{product && product.description_list}</span> */}
                            {/* {replaceDescription(product && product.description_list)} */}
                          </p>
                          <p className="gray-color2">
                            {/* {product && product.description_detail} */}
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
                                  cart && cart.qty !== 1 && onClickRemoveCart(e)
                                }
                                disabled={cart ? false : true}
                              >
                                <i className="icon-minus" />
                              </button>
                            </div>
                          </div>
                          <div className="pro-list-btn d-inline-block mr-10 mb-15">
                            <a
                              href="#"
                              className="web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden pl-35 pr-35 ptb-17"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast.success("Thêm vào giỏ hàng thành công");
                              }}
                            >
                              Thêm vào giỏ hàng
                            </a>
                          </div>
                          <div className="pro-wishlist d-inline-block mb-15">
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
                        <ul className="review-cat d-sm-flex align-items-center pt-20 pb-15">
                          <li className="mb-1 mb-2 mr-6 d-inline-block">
                            <span className="cat-title dark-black-color font600">
                              Phân loại  :
                            </span>
                          </li>
                          {product &&
                            cat_.map(
                              (cat, i) =>
                                !"home1purchasedhome2tranding".includes(
                                  cat
                                ) && (
                                  <li
                                    className="mr-6 mb-2 d-inline-block position-relative"
                                    key={i}
                                  >
                                    <Link
                                      href={`/shop/category/${cat
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                    >
                                      <a className="gray-color2 font600 text-capitalize me-1">
                                        {cat}{" "}
                                        {cat_.length === i + 1 ? "" : ", "}
                                      </a>
                                    </Link>
                                  </li>
                                )
                            )}
                        </ul>
                        {/* /review-cat */}
                        <ul className="social-link mt-10">
                          <li className="d-block d-sm-inline-block mr-12">
                            <span className="cat-title dark-black-color font600">
                              Chia sẻ:
                            </span>
                          </li>
                          <li
                            className="d-inline-block"
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="Facebook"
                          >
                            <a
                              className="d-inline-block font13 text-uppercase transition-3 mb-20"
                              href="#"
                            >
                              <span className="d-inline-block text-center">
                                <i className="fab fa-facebook-f" />
                              </span>
                            </a>
                          </li>
                          <li
                            className="d-inline-block"
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="Twitter"
                          >
                            <a
                              className="d-inline-block font13 text-uppercase transition-3 mb-20"
                              href="#"
                            >
                              <span className="d-inline-block text-center">
                                <i className="fab fa-twitter" />
                              </span>
                            </a>
                          </li>
                          <li
                            className="d-inline-block"
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="Instagram"
                          >
                            <a
                              className="d-inline-block font13 text-uppercase transition-3 mb-20"
                              href="#"
                            >
                              <span className="d-inline-block text-center">
                                <i className="fab fa-instagram" />
                              </span>
                            </a>
                          </li>
                          <li
                            className="d-inline-block"
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="Pinterest"
                          >
                            <a
                              className="d-inline-block font13 text-uppercase transition-3 mb-20"
                              href="#"
                            >
                              <span className="d-inline-block text-center">
                                <i className="fab fa-pinterest-p" />
                              </span>
                            </a>
                          </li>
                          <li
                            className="d-inline-block"
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="Google plus"
                          >
                            <a
                              className="d-inline-block font13 text-uppercase transition-3 mb-20"
                              href="#"
                            >
                              <span className="d-inline-block text-center">
                                <i className="fab fa-google-plus-g" />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /col */}
                </div>
                {/* /row */}
              </div>
              {/*  */}
              <div className="row">
                <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                  <div className="product-review-tab-area mt-60">
                    <Tab.Container defaultActiveKey="des">
                      <Nav className="nav-pills mb-3">
                        <Nav.Item>
                          <Nav.Link
                            eventKey="des"
                            className=" bg-transparent pl-0 title position-relative hvr2 font600"
                          >
                            Mô tả
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="info"
                            className="bg-transparentt pl-0 title position-relative hvr2 font600"
                          >
                            Thông tin chi tiết
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="review"
                            className="nav-link bg-transparentt pl-0 title position-relative hvr2 font600"
                          >
                            Bình luận (
                            {rates && rates.total_item ? rates.total_item : 0})
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className="mt-30">
                        <Tab.Pane eventKey="des">
                          <div className="describe-area">
                            <div className="product-details-text pr-10 mb-50">
                              <p className="gray-color2 dc-text1 pb-6">
                                <span style={{ whiteSpace: 'pre-line' }}>{product && product.description_detail}</span>
                              </p>
                              {/* <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                Can Data Visualization Improve The Mobile Web
                                Experience?
                              </p>
                              <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                Smashing Podcast Episode 16 With Ben Frain: How
                                Can Optimize Workspace
                              </p>
                              <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                How To Make Performance Visible With GitLab CI
                                And Hoodoo Of GitLab
                              </p>
                              <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                Learning Resources In Challenging Times: Online
                                Work And Events
                              </p>
                              <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                Can Data Visualization Improve The Mobile Web
                                Experience?
                              </p> */}
                              {/* <p className="gray-color2">
                                <span className="h2-theme-color pr-10">
                                  <i className="far fa-check-circle" />
                                </span>
                                How To Make Performance Visible With GitLab CI
                                And Hoodoo Of GitLab
                              </p> */}
                            </div>{" "}
                            {/* /product-details-text */}
                            <div className="p-review-area pb-90">
                              <div className="row">
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12 mb-20">
                                  <img
                                    src="/images/banner/banner-img.jpg"
                                    alt=""
                                  />
                                </div>
                                {/* /col */}
                                <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12 mb-20">
                                  <img
                                    src="/images/banner/banner-img2.jpg"
                                    alt=""
                                  />
                                </div>
                                {/* /col */}
                              </div>
                              {/* /row */}
                            </div>
                            {/* /review-area */}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="info">
                          <div className="additional-information mt-50 h2-gray-background pt-40 pl-50 pr-50 pb-50 mb-100">
                            <div className="row">
                              <div className="col-xl-12">
                                <h5 className="title mb-20 font600">
                                  Thêm thông tin sản phẩm
                                </h5>
                                <table className="table border mt-25 table-responsive">
                                  <tbody>
                                    {handleDetailList(product.description_list) && handleDetailList(product.description_list).map((data) => (

                                      <tr className="add-color-area aditional-info border-bottom border-top ">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">{data.name}</h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            <li>{data.content}</li>
                                          </ul>
                                        </td>
                                      </tr>
                                    ))}
                                    {product && product.colors && (
                                      <tr className="add-color-area aditional-info border-bottom border-top ">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">Màu</h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            {product.colors.map((color, i) => (
                                              <li key={i} className="me-1">
                                                {color}
                                                {product.colors.length === i + 1
                                                  ? ""
                                                  : ", "}{" "}
                                              </li>
                                            ))}
                                          </ul>
                                        </td>
                                      </tr>
                                    )}
                                    {product && product.weight && (
                                      <tr className="add-brand-area aditional-info border-bottom h2-gray-background">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">Weight</h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            <li>{product.weight}</li>
                                          </ul>
                                        </td>
                                      </tr>
                                    )}
                                    {product && product.dimensions && (
                                      <tr className="add-color-area aditional-info border-bottom border-top">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">
                                            Dimensions
                                          </h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            <li>{product.dimensions}</li>
                                          </ul>
                                        </td>
                                      </tr>
                                    )}
                                    {product && product.size && (
                                      <tr className="add-brand-area aditional-info border-bottom h2-gray-background">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">Size</h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            {product.size.map((s, i) => (
                                              <li
                                                key={i}
                                                className="me-1 text-capitalize"
                                              >
                                                {s}
                                                {product.size.length === i + 1
                                                  ? ""
                                                  : ","}{" "}
                                              </li>
                                            ))}
                                          </ul>
                                        </td>
                                      </tr>
                                    )}
                                    {product && product.warranty && (
                                      <tr className="add-brand-area aditional-info border-bottom h2-gray-background">
                                        <td className="tbl-title pl-5">
                                          <h6 className="add-title">
                                            Warranty
                                          </h6>
                                        </td>
                                        <td className="tbl-content">
                                          <ul className="add-color d-flex">
                                            <li>{product.warranty}</li>
                                          </ul>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              {/* /col */}
                            </div>
                            {/* /row */}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="review">
                          <div className="col-xl-11 col-lg-11  col-md-12  col-sm-12 col-12">
                            <div className="review-comments-area pb-60 mt-20">
                              <h5 className="primary-color font600">
                                {rates && rates.total_item
                                  ? rates.total_item
                                  : "Chưa có "}{" "}
                                đánh giá cho sản phẩm
                              </h5>

                              <div className="review-comments-area mt-35">
                                {rateItem.map((item) => (
                                  <div className="row align-items-center align-items-sm-start align-items-md-center">
                                    <div className="col-xl-1  col-lg-2  col-md-2  col-sm-2 col-4 mt-15 pr-3 pr-sm-0 pr-md-3">
                                      <div className="client-avatar">
                                        <img
                                          className="avatar-img width100 height100"
                                          src="/images/bg/avater3.png"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    {/* /col */}
                                    <div className="col-xl-9  col-lg-9  col-md-10  col-sm-10 col-12 pl-0 mt-10">
                                      <div className="review-text pl-60">
                                        <div className="review-head d-sm-flex justify-content-between align-items-center">
                                          <div className="d-sm-flex">
                                            <h5 className="font600 pr-10">
                                              {item.full_name}
                                            </h5>
                                            <div className="rating rating-shop d-flex">
                                              <Reating
                                                rating={item && item.star ? item.star : 0}
                                              />
                                            </div>
                                            {/* /rating */}
                                          </div>
                                          <span className="primary-color font600">
                                            {convert_datetime_from_timestamp(item.created_at)}
                                          </span>
                                        </div>
                                        {/* /review-head */}
                                        <p className="dc-text1 gray-color2 mb-2 mt-10">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                    {/* /col */}
                                  </div>
                                ))}

                              </div>
                              {rates && rates.is_rated == true ? (
                                <div className="product-review mt-80 pb-10">
                                  <h5 className="mb-30 font600">Thêm bình luận </h5>
                                  <div className="d-flex">
                                    <span className="pr-15 mb-15">
                                      Cám ơn bạn đã đánh giá
                                    </span>
                                    {/* /rating */}
                                  </div>
                                </div>

                              ) : <>
                                <div className="product-review mt-80 pb-10">
                                  <h5 className="mb-30 font600">Thêm bình luận </h5>
                                  <div className="d-flex">
                                    <span className="pr-15 mb-15">
                                      Bạn đánh giá:
                                    </span>
                                    <div className="rating rating-shop d-flex mb-15">
                                      <div className="rating rating-shop d-flex">
                                        <StarRatings
                                          rating={rateUser}
                                          starRatedColor="#febd00"
                                          starHoverColor="#febd00"
                                          changeRating={changeRating}
                                          numberOfStars={5}
                                          starDimension="28px"
                                          name='rating'
                                        />
                                      </div>
                                    </div>
                                    {/* /rating */}
                                  </div>
                                </div>
                                <div className="reply-form contact-form-right mb-60">
                                  <div >
                                    <div className="comment mb-10">

                                      <label>Nhập đánh giá của bạn</label>
                                      <textarea
                                        name="message"
                                        className="form-control  primary-bg2 mt-10"
                                        id="message"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                      />
                                    </div>
                                    <button type="button"
                                      className="web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17"
                                      onClick={(e) => onClickComment(e)}
                                    >
                                      Đánh giá
                                    </button>
                                  </div>
                                </div>
                              </>}

                            </div>
                          </div>
                          {/* /col */}
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                  {/* product-review-area end */}
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            {/* /product-content */}
          </div>
          {/* /container */}
        </div>
      ) : (
        <h2 className="text-center mt-100 mb-100">Không tìm thấy sản phẩm</h2>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  rates: state.rate.rates,
  products: state.product.products,
  product: state.product.singleProduct,
  carts: state.utilis.carts,
  wishlists: state.utilis.wishlist,
  compares: state.utilis.compares,
});

export default connect(mapStateToProps, {
  addToCart,
  decreaseCart,
  getCarts,
  getSingleProduct,
  addWishlist,
  getWishlist,
  getProducts,
  getCompare,
  compare,
  getRateByProduct,
  rateProduct,
})(ProductDetails);


