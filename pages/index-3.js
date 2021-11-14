import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { Category1, Category2 } from "../src/components/home/Category";
import Product3 from "../src/components/products/Product3";
import Reating from "../src/components/Reating";
import BrandSlider from "../src/components/sliders/BrandSlider";
import { HomePageSliderWithOutArrow } from "../src/components/sliders/HomePageBannerSliders";
import {
  SliderWithAutoPlay,
  SliderWithAutoPlayHome2,
} from "../src/components/sliders/HomePageProductSlider";
import VideoPopUp from "../src/components/VideoPopUp";
import Layout from "../src/layout/Layout";
import {
  getCategory_1,
  getCategory_2,
  getHome3,
  getTestimonial,
} from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import time from "../src/utils/time";

const Index3 = ({
  getHome3,
  sliders,
  getCategory_1,
  getCategory_2,
  getTestimonial,
  testimonial,
  getProducts,
  bestDealProduct,
  bestSellingProduct,
  featuredProduct,
}) => {
  const [videoPopup, setVideoPopup] = useState(false);
  useEffect(() => {
    getHome3();
    getCategory_1();
    getCategory_2();
    getTestimonial();
    getProducts();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Layout homePage={3} footerWithPettren>
      {videoPopup && <VideoPopUp closePopup={() => setVideoPopup(false)} />}
      <div className="position-relative slider3">
        <div className="slider-area over-hidden slider-dots2">
          <HomePageSliderWithOutArrow className="slider-active">
            {sliders &&
              sliders.map((slide, i) => (
                <div
                  key={i}
                  className="single-slider slider-height3 d-flex align-items-center"
                  data-background={slide.bg}
                >
                  {slide.videoBg && (
                    <div
                      className="slider-img slider-3-img fadeInUp wow"
                      data-delay="1s"
                    >
                      <img src={slide.videoBg} alt="" />
                    </div>
                  )}
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 d-flex align-items-center">
                        <div className="slider-content position-absolutes mt--12">
                          <h2
                            data-delay="1s"
                            className="text-white mb-1 fadeInLeft wow text-capitalize pb-15 font500 font-pt"
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="text-white font300 fadeInLeft wow pb-12"
                            data-delay="1.5s"
                          >
                            {slide.text}
                          </p>
                          <Link href="/shop">
                            <a
                              data-delay="1.7s"
                              className="web-btn h3-web-btn  fadeInUp wow d-inline-block text-uppercase white h3-theme-bg position-relative over-hidden pl-30 pr-30 ptb-17"
                            >
                              Shop Collection
                            </a>
                          </Link>
                        </div>
                      </div>
                      {/* /col */}
                      {slide.off && (
                        <div className="slider-off-tags position-absolute d-inline-block light-black-color">
                          <Link href="/shop">
                            <a className="off-tag-bounce text-uppercase d-block light-black-color2 secondary-bg font12 text-center">
                              <span className="d-block">10%</span>
                              <span className="d-block">off</span>
                            </a>
                          </Link>
                        </div>
                      )}
                      {/* /slider-off-tags */}
                    </div>

                    {slide.video && (
                      <div
                        className="video-button2 position-absolute"
                        data-animation="fadeInDown"
                        data-delay="1.1s"
                      >
                        <div className="play-btn">
                          <a
                            className="popup-video circle-animation"
                            data-fancybox
                            href="#"
                            onClick={() => setVideoPopup(true)}
                          >
                            <i className="fas fa-play" />
                          </a>
                        </div>
                      </div>
                    )}
                    {/* /row */}
                  </div>
                  {/* /container */}
                </div>
              ))}
          </HomePageSliderWithOutArrow>
          {/* /slider-active */}
        </div>
        <div className="slider-pattern position-absolute bottom0 right0">
          <img src="/images/bg/Pattern1.png" alt="" />
        </div>
      </div>
      <Category2 color="h3-theme-color" position="position-relative" />
      <div className="Featured-product-area mb-30 hm3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pb-15">
              <div className="section-title pt-10 text-center">
                <h3 className="font-pt light-black-color2 pb-1">
                  Featured Top Product
                </h3>
                <p className="light-black-color7 font300">
                  Sed ut perspiciatis undeous omniiste natusing errorings
                </p>
              </div>
            </div>
            {featuredProduct && (
              <SliderWithAutoPlayHome2 extraClass="row h3-purchased-product-active white-bg ">
                {featuredProduct.map((poduct) => (
                  <Product3 key={poduct} product={poduct} productActionOff />
                ))}
              </SliderWithAutoPlayHome2>
            )}
          </div>
        </div>
      </div>
      <div className="off-banner-area pt-60 mb-30 hm3">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xxl-4 col-xl-4  col-lg-4  col-md-12  col-sm-12 col-12 pb-15">
              <div className="section-title mb-50">
                <h3 className="font-pt light-black-color2 pb-1 pr-50 mb-40">
                  Effective &amp; Reliable Protective Equipment 30% Flate
                </h3>
                <p className="light-black-color7 font300 pb-10">
                  Only this week 30% to 50% cheaper! Choose a color that really
                  matches your personality
                </p>
                <Link href="/shop">
                  <a
                    data-delay="1.7s"
                    className="web-btn h3-web-btn fadeInUp wow  d-inline-block text-uppercase white h3-theme-bg position-relative over-hidden pl-30 pr-30 ptb-17 shop-collection-btn"
                  >
                    Shop Collection
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8  col-lg-8  col-md-12  col-sm-12 col-12 position-relative">
              <div
                className="off-banner-area mb-50 pl-40 wow fadeInRight  pr-60 animated"
                data-wow-duration="1.5s"
              >
                <img
                  className="width100"
                  src="/images/banner/home3/off-banner1.jpg"
                  alt=""
                />
              </div>
              <div className="b-pattern2 position-absolute">
                <img src="/images/bg/Pattern-banner.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="weekly-deal-area hm3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pb-10">
              <div className="section-title weekly-deal d-sm-flex align-items-center justify-content-center">
                <h3 className="font-pt light-black-color2 pt-15 pr-10">
                  Best Deal Of Week
                </h3>
                <div className="countdown-time countdown-time2 pt-15 d-flex">
                  <div className="timer">
                    <div className="d-flex" data-countdown="2021/5/17">
                      <span className="cdown days">
                        <span className="time-count">{time().days}</span>{" "}
                        <p>Days</p>
                      </span>{" "}
                      <span className="cdown hour">
                        <span className="time-count">{time().hours}</span>{" "}
                        <p>HRS</p>
                      </span>{" "}
                      <span className="cdown minutes">
                        <span className="time-count">{time().minutes}</span>{" "}
                        <p>Min</p>
                      </span>{" "}
                      <span className="cdown second">
                        {" "}
                        <span>
                          <span className="time-count">{time().seconds}</span>{" "}
                          <p>Sec</p>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h3-theme-border2 mt-25 pb-15">
            {bestDealProduct && (
              <SliderWithAutoPlayHome2 extraClass="row h3-weekly-deal-active pt-20 mlr-1 pl-10 ">
                {bestDealProduct.map((poduct) => (
                  <Product3 key={poduct} product={poduct} />
                ))}
              </SliderWithAutoPlayHome2>
            )}
          </div>
        </div>
      </div>
      <BrandSlider />
      <div
        className="most-purchased-item-area most-purchased-item-bg2 hm3 over-hidden pt-100 pb-130"
        data-background="/images/bg/purchased-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-xl-9 col-lg-10  col-md-12  col-sm-12 col-12 offset-xxl-3 offset-xl-3 offset-lg-2">
              <div
                className="most-purchased-item-wrapper wow fadeInRight  animated"
                data-wow-duration="1.5s"
              >
                <h3 className="font-pt text-white pb-1">Most Purchased Item</h3>
                <div className="pl-15 pr-15">
                  {bestSellingProduct && (
                    <SliderWithAutoPlay extraClass="row most-purchased-item-active white-bg mt-25 ">
                      {bestSellingProduct.map((poduct) => (
                        <Product3
                          key={poduct}
                          product={poduct}
                          productActionOff
                        />
                      ))}
                    </SliderWithAutoPlay>
                  )}

                  {/* /row */}
                </div>
              </div>
              {/* /most-purchased-item-wrapper */}
            </div>
            {/* /col */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      <div className="off-banner-area pt-55 mb-45 hm3">
        <div className="container position-relative">
          <div className="row d-flex align-items-center">
            <div className="col-xxl-8 col-xl-8  col-lg-8  col-md-12  col-sm-12 col-12 pl-0 ">
              <div
                className="off-banner-area mb-50 wow fadeInLeft  banner-space animated"
                data-wow-duration="1.5s"
              >
                <img
                  className="width100"
                  src="/images/banner/home3/off-banner2.jpg"
                  alt=""
                />
              </div>
            </div>
            {/* /col */}
            <div className="col-xxl-4 col-xl-4  col-lg-4  col-md-12  col-sm-12 col-12 pb-15 pl-0 d-flex align-items-center justify-content-center">
              <div
                className="subscribe-wrapper subscribe-wrapper3 wow fadeInRight  animated"
                data-wow-duration="1.5s"
              >
                <div className="section-title mb-25">
                  <h3 className="font-pt light-black-color2 mb-20">
                    Join Our Newsletter &amp; Save 30% On Purchase
                  </h3>
                  <p className="light-black-color7 font300">
                    Leave your email to get all hot deals which benefit most!
                  </p>
                </div>
                {/* /section-title */}
                <div className="subscribe-form-area subscribe-form-area1 d-flex align-items-center justify-content-center pt-25">
                  <form
                    action="#"
                    className="width100"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="subscribe-h-3">
                      <div className="subscribe-info position-relative mr-6 mb-15 w-100">
                        <input
                          className="sub-name form-control border-0 rounded-0 pl-35 theme-color gray-bg4 pt-10 pb-10"
                          type="email"
                          name="name"
                          id="n-sub-name"
                          placeholder="Enter Your Email"
                        />
                      </div>
                      <div className="subscribe-btn">
                        <div className="d-inline-block">
                          <a
                            href="#"
                            className="sub-btn font14 d-inline-block text-capitalize white h3-theme-bg position-relative rounded-0"
                          >
                            <i className="fal fa-rocket" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="save-info d-flex align-items-center mb-15">
                      <input
                        className="p-0 mr-10"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      <p className="mb-0 cursor-pinter light-black-color7 ">
                        Accept
                        <Link href="/terms-and-condition">
                          <a className="light-black-color7 line-height-1 mx-1">
                            Terms &amp; Conditions
                          </a>
                        </Link>
                        and
                        <Link href="/privacy-page">
                          <a className="light-black-color7 line-height-1 ms-1">
                            Privacy Policy
                          </a>
                        </Link>
                      </p>
                    </div>
                    {/* /save-info */}
                  </form>
                </div>
              </div>
            </div>
            {/* /col */}
          </div>
          {/* /row */}
          <div className="b-pattern position-absolute top0">
            <img src="/images/bg/Pattern-banner.png" alt="" />
          </div>
        </div>
        {/* /container */}
      </div>
      <div className="testimonial-area testimonial-area3 hm3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
              <div className="section-title text-center">
                <h3 className="font-pt light-black-color2 pb-1">
                  What Clients Says
                </h3>
              </div>
              {/* /section-title */}
            </div>
            {/* /col */}
          </div>
          <Slider
            {...settings}
            className="testimonial-area home3-testimonial-active pb-110 pt-25"
          >
            {testimonial &&
              testimonial.map((testimonial, i) => (
                <div className="row d-flex align-items-center" key={i}>
                  <div className="col-xl-4 col-lg-4  col-md-4  col-sm-3 col-12 pr-0 pt-6 d-flex justify-sm-content-end justify-content-center">
                    <div className="testimonial-avater position-relative">
                      <img src={testimonial.img} alt="Img" />
                      <div className="quote position-absolute">
                        <span className="h3-theme-bg white d-block text-center">
                          <i className="fas fa-quote-left" />
                        </span>
                      </div>
                      <div className="rating testi-review d-flex align-items-center justify-content-center mt-15">
                        <Reating rating={Math.round(testimonial.review)} />
                        <span className="light-black-color5 d-inline-block ps-1">
                          {" "}
                          ({testimonial.review})
                        </span>
                      </div>
                      {/* /rating */}
                    </div>
                    {/* /testimonial-abater */}
                  </div>
                  {/* /col */}
                  <div className="col-xl-8  col-lg-8  col-md-8  col-sm-9 col-12 pl-0  pt-6">
                    <div className="testimonial-comment pt-20 pr-50">
                      <p className="light-black-color7">{testimonial.text}</p>
                      <div className="testimonial-info d-sm-flex align-items-center pt-20">
                        <h5 className="font600 light-black-color2 pr-10">
                          {testimonial.name}
                        </h5>
                        <span className="h3-theme-color">
                          {testimonial.deg}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* /col */}
                </div>
              ))}
          </Slider>
        </div>
        {/* /container */}
      </div>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  sliders: state.home.home3 && state.home.home3.sliders,
  testimonial: state.home.testimonial,
  bestDealProduct: simpleProductFilter("home3BestDeal", state.product.products),
  featuredProduct: simpleProductFilter("home3Featured", state.product.products),
  bestSellingProduct: simpleProductFilter(
    "home3BestSelling",
    state.product.products
  ),
});

export default connect(mapStateToProps, {
  getHome3,
  getCategory_1,
  getCategory_2,
  getTestimonial,
  getProducts,
})(Index3);
