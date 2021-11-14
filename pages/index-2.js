import moment from "moment";
import Link from "next/dist/client/link";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import HomePageBlog from "../src/components/blog/HomePageBlog";
import { Category2 } from "../src/components/home/Category";
import Product3 from "../src/components/products/Product3";
import BrandSlider from "../src/components/sliders/BrandSlider";
import { HomePageSliderWithOutArrow } from "../src/components/sliders/HomePageBannerSliders";
import {
  SliderWithAutoPlay,
  SliderWithAutoPlayHome2,
} from "../src/components/sliders/HomePageProductSlider";
import Subscribe from "../src/components/Subscribe";
import Layout from "../src/layout/Layout";
import { getCategory_2, getHome2 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import time from "../src/utils/time";
import { createMap } from "../src/utils/utils";

const Index2 = ({
  getHome2,
  sliders,
  getCategory_2,
  banner_1,
  getProducts,
  bestDealProduct,
  trandingProduct,
  featuredProduct,
}) => {
  useEffect(() => {
    getHome2();
    getCategory_2();
    getProducts();
  }, []);
  let date = new Date();
  date.setDate(date.getDate() + 7);
  date = moment(date).format("M-D-YYYY, 00:00:00");

  return (
    <Layout withoutContainer homePage={2}>
      <div className="slider-area over-hidden slider2">
        <div className="container">
          <HomePageSliderWithOutArrow className="slider-active">
            {sliders &&
              sliders.map((slide, i) => (
                <div
                  key={i}
                  className="single-slider slider-height2 d-flex align-items-center"
                  data-overlay={7}
                  data-background={slide.bg}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12  col-lg-12  col-md-12  col-sm-10 col-12 d-flex align-items-center">
                        <div className="slider-content position-absolute mt--12 z-index1">
                          <h2
                            data-animation="fadeInLeft"
                            data-delay="1s"
                            className="light-black-color2 mb-1 text-capitalize pb-15 font500 font-pt-demi"
                          >
                            {createMap(slide.title).map((title, i) => (
                              <Fragment key={i}>
                                {title} <br />
                              </Fragment>
                            ))}
                          </h2>
                          <ul className="single-product-price d-flex mt-2 transition-3 pb-20">
                            <li>
                              <span className="h2-theme-color d-inline-block font500">
                                ${slide.mainPrice}
                              </span>
                              <span className="ps-2 prod-remove d-inline-block h2-theme-color font500">
                                <del>${slide.price}</del>
                              </span>
                            </li>
                          </ul>
                          {/* /single-product-price */}
                          <p
                            className="light-black-color2 font300 pb-10"
                            data-animation="fadeInLeft"
                            data-delay="1.5s"
                          >
                            {createMap(slide.text)[0]}
                            <br />
                            <span className="font300">
                              {createMap(slide.text)[1]}
                            </span>
                          </p>
                          <Link href="/shop">
                            <a
                              data-delay="1.7s"
                              className="web-btn h2-web-btn wow fadeInUp  d-inline-block text-capitalize light-black-color2 white-bg position-relative rounded-0 over-hidden pl-30 pr-30 ptb-17"
                            >
                              Shop Collection
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </HomePageSliderWithOutArrow>
        </div>
      </div>
      {/*  product-items-area-start  */}
      <Category2 />
      {/*  product-off-banner-area-start  */}
      <div className="handpick-items-area best-deal-product hm2">
        <div className="container">
          <div className="h2-theme-border2">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4  col-lg-4  col-md-7  col-sm-12 col-12 pb-15">
                <div className="section-title weekly-deal pl-30 pt-50">
                  <h3 className="font-pt light-black-color2 pb-6">
                    Best Deal Of Week
                  </h3>
                  <p className="light-black-color7 font300">
                    Sed perspiciatis undeous omniiste natusing
                  </p>
                  <div className="countdown-time countdown-time2 pt-15 d-flex">
                    <div className="timer">
                      <div className="d-flex">
                        <span className="cdown days">
                          <span className="time-count">{time(date).days}</span>{" "}
                          <p>Days</p>
                        </span>
                        <span className="cdown hour">
                          <span className="time-count">{time(date).hours}</span>{" "}
                          <p>HRS</p>
                        </span>
                        <span className="cdown minutes">
                          <span className="time-count">
                            {time(date).minutes}
                          </span>{" "}
                          <p>Min</p>
                        </span>
                        <span className="cdown second">
                          <span>
                            <span className="time-count">
                              {time(date).seconds}
                            </span>{" "}
                            <p>Sec</p>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-8 col-xl-8  col-lg-8  col-md-5  col-sm-12 col-12 pl-0">
                {bestDealProduct && (
                  <SliderWithAutoPlay extraClass="row best-deal-product-active  pt-40 mlr-1 ml--20">
                    {bestDealProduct.map((product) => (
                      <Product3
                        key={product.id}
                        product={product}
                        productActionOff
                      />
                    ))}
                    {bestDealProduct.map((product) => (
                      <Product3
                        key={product.id}
                        product={product}
                        productActionOff
                      />
                    ))}
                  </SliderWithAutoPlay>
                )}
              </div>
            </div>
          </div>
          <div className="row free-shopping-area h2-light-black-bg3  mlr-1">
            <div className="col-xl-12 col-lg-12  col-md-  col-sm- col-">
              <div className="free-shopping pt-15 pb-15 text-center">
                <p className="h2-theme-color mb-0 font600">
                  ONLY IN THIS WEEK. FREE SHIPPING FOR ALL ORDERS OVER $400
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner-area-start */}
      <div className="banner-area mt-80 hm2">
        <div className="container">
          <div className="row">
            {banner_1 &&
              banner_1.map((banner, i) => (
                <div
                  className={`col-xl-6 col-lg-6  col-md-12  col-sm-12 col-12 wow ${
                    i === 1 ? "fadeInRight" : "fadeInLeft"
                  }`}
                  data-delay="1.5s"
                  key={i}
                >
                  <div className="banner mb-30 transition-3 position-relative over-hidden ">
                    <Link href="/shop">
                      <a className="d-block">
                        <img
                          className="img-zoom transition-3 width100 h-100"
                          src={banner.bg}
                          alt="Banner"
                        />
                      </a>
                    </Link>
                    <div className="banner-content mt--3 position-absolute transfY transfY50 pl-50">
                      <span
                        className={`banner-sub-tittle mt--4 d-block ${
                          i === 0 ? "banner-sub-tittle2" : "text-white"
                        } font500`}
                      >
                        {banner.subTitle}
                      </span>
                      <h3
                        className={`font500 pb-45 ${
                          i === 0 ? "light-black-color2" : "text-white"
                        }`}
                      >
                        <Link href="/shop">
                          <a>{banner.title}</a>
                        </Link>
                      </h3>
                      <p
                        className={`${
                          i === 0 ? "light-black-color2" : "text-white"
                        } font300 pb-1`}
                      >
                        {banner.text}
                      </p>
                      <Link href="/shop">
                        <a
                          className={`${
                            i === 0
                              ? "web-btn h2-theme-border1 d-inline-block text-capitalize white rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-35 pr-35 ptb-12"
                              : "web-btn h2-web-btn border-white01 d-inline-block text-capitalize white-bg light-black-color position-relative over-hidden pl-35 pr-35 ptb-12 rounded-0"
                          }`}
                        >
                          Shop Now
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* Tranding product */}
      <div className="Trending-product-area hm2">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-3  col-lg-4  col-md-12  col-sm-12 col-12 pb-15">
              <div className="section-title pt-60">
                <h3 className="font-pt light-black-color2 pb-1 pr-120">
                  Trending Our Product
                </h3>
                <p className="light-black-color7 font300">
                  Perspiciatis undeous omniists
                </p>
                <Link href="/shop">
                  <a className="web-btn h2-web-btn d-inline-block text-capitalize light-black-color2 rounded-0 gray-bg5 position-relative over-hidden pl-35 pr-35 mt-20 ptb-12">
                    View More
                  </a>
                </Link>
              </div>
              {/* /section-title */}
            </div>
            {/* /col */}
            <div className="col-xxl-9 col-xl-9  col-lg-8  col-md-12  col-sm-12 col-12 pl-0">
              {trandingProduct && (
                <SliderWithAutoPlay extraClass="row home2-handpick-items-active  pt-20 mlr-1 ml--30">
                  {trandingProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
                  {trandingProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
                </SliderWithAutoPlay>
              )}
              {/* /row */}
            </div>
            {/* /col */}
          </div>
          {/* /row */}
          <div className="row free-shopping-area h2-light-black-bg3  mlr-1 mt-30">
            <div className="col-xxl-8 col-xl-10 col-lg-12  col-md-12  col-sm-12 col-12 offset-xxl-2 offset-xl-1">
              <div className="service-area pt-10">
                <div className="row">
                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12 d-md-flex justify-content-center align-items-center">
                    <div className="d-inline-block">
                      <div className="single-service d-flex justify-content-center  align-items-center mb-10">
                        <div className="s-ser-icon mr-10">
                          <span className="h2-theme-color">
                            <i className="fal fa-shipping-fast" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0 font600 text-uppercase">
                            30 Days To Money Back
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /col */}
                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12 d-md-flex justify-content-center align-items-center">
                    <div className="d-inline-block">
                      <div className="single-service d-flex justify-content-center  align-items-center mb-10">
                        <div className="s-ser-icon mr-10">
                          <span className="h2-theme-color">
                            <i className="fal fa-tram" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0 font600 text-uppercase">
                            Against 99% of bacteria
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /col */}
                  <div className="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12 d-md-flex justify-content-center align-items-center">
                    <div className="d-inline-block">
                      <div className="single-service d-flex justify-content-center  align-items-center mb-10">
                        <div className="s-ser-icon mr-10">
                          <span className="h2-theme-color">
                            <i className="fal fa-gift" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0 font600 text-uppercase">
                            Shipping in 24 Hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /col */}
                </div>
                {/* /row */}
              </div>
            </div>
            {/* /col */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* Featured-product */}
      <div className="Featured-product-area mb-30 hm2">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-3  col-lg-4  col-md-12  col-sm-12 col-12 pb-15">
              <div className="section-title pt-80">
                <h3 className="font-pt light-black-color2 pb-1 pr-120">
                  Featured Top Product
                </h3>
                <p className="light-black-color7 font300">
                  Perspiciatis undeous omniists.
                </p>
                <Link href="/shop">
                  <a className="web-btn h2-web-btn d-inline-block text-capitalize light-black-color2 rounded-0 gray-bg5 position-relative over-hidden pl-35 pr-35 mt-20 ptb-12">
                    View More
                  </a>
                </Link>
              </div>
              {/* /section-title */}
            </div>
            {/* /col */}
            <div className="col-xxl-9 col-xl-9  col-lg-8  col-md-12  col-sm-12 col-12 pl-0">
              {featuredProduct && (
                <SliderWithAutoPlayHome2 extraClass="row home2-handpick-items-active ml--45 pt-40 mlr-1">
                  {featuredProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
                  {featuredProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
                </SliderWithAutoPlayHome2>
              )}
              {/* /row */}
            </div>
            {/* /col */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* Banner */}
      <div className="promo-banner hm2">
        <div className="container">
          <div className="row">
            <div className="col-xl-12  col-lg-  col-md-12  col-sm-12 col-12">
              <div className="promo-banner-wrapper position-relative">
                <Link href="/shop">
                  <a className="d-block">
                    <img src="/images/banner/home2/promo-banner.jpg" alt="" />
                  </a>
                </Link>
                <div className="promo-banner-content position-absolute d-none d-lg-block">
                  <h2
                    data-delay="1s"
                    className="light-black-color2 fadeInLeft wow mb-1 text-capitalize pb-30 font500 font-pt-demi"
                  >
                    All Equipment On{" "}
                    <span className="h2-theme-color">50% Discount</span>
                  </h2>
                  <p
                    className="light-black-color2 fadeInLeft wow pb-25 mb-0 font300"
                    data-delay="1.5s"
                  >
                    Tell Your Brand’s Story Through Images
                  </p>
                  <Link href="/shop">
                    <a
                      data-delay="1.7s"
                      className="web-btn h2-web-btn fadeInUp wow  d-inline-block text-capitalize light-black-color2 white-bg position-relative rounded-0 over-hidden pl-30 pr-30 ptb-17 mt-1"
                    >
                      Shop Collection
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {/* /col */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      <BrandSlider />
      <HomePageBlog leftHeading />
      <Subscribe />
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  sliders: state.home.home2 && state.home.home2.sliders,
  banner_1: state.home.home2 && state.home.home2.banner_1,
  bestDealProduct: simpleProductFilter("home2bestdeal", state.product.products),
  trandingProduct: simpleProductFilter("home2tranding", state.product.products),
  featuredProduct: simpleProductFilter("home2featured", state.product.products),
});

export default connect(mapStateToProps, {
  getHome2,
  getCategory_2,
  getProducts,
})(Index2);
