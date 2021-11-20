import Link from "next/link";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import HomePageBlog from "../src/components/blog/HomePageBlog";
import Product from "../src/components/products/Product";
import Product2 from "../src/components/products/Product2";
import Product3 from "../src/components/products/Product3";
import BrandSlider from "../src/components/sliders/BrandSlider";
import { HomePageSliderWithOutArrow } from "../src/components/sliders/HomePageBannerSliders";
import {
  DoubleSlider,
  SliderWithAutoPlay,
  SliderWithAutoPlayNumberShow,
} from "../src/components/sliders/HomePageProductSlider";
import Subscribe from "../src/components/Subscribe";
import Layout from "../src/layout/Layout";
import { getCategory_1, getHome1 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import { createMap } from "../src/utils/utils";
import time from "../src/utils/time";

const Index = () => {
  const sliders = useSelector((state) => state.home.home1 && state.home.home1.sliders);
  const banner_1 = useSelector((state) =>state.home.home1 && state.home.home1.banner_1);
  const category_2 = useSelector((state) => state.home.home1 && state.home.home1.category_2);
  const products = useSelector((state) => state.product.products)
  const [bestDealProduct, setBestDealProductuseState] = useState([])
  const [unmissedProducts, setUnmissedProducts] = useState([])
  const [handpickedProduct, setHandpickedProduct] = useState([])
  const [purchasedProduct, setPurchasedProduct] = useState([])
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getHome1());
    dispatch(getCategory_1());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setBestDealProductuseState(products);
    setUnmissedProducts(products);
    setHandpickedProduct(products);
    setPurchasedProduct(products);
  }, [products])

  let date = new Date();
  date.setDate(date.getDate() + 7);
  date = moment(date).format("M-D-YYYY, 00:00:00");

  return (
    <Layout footerWhite homePage={1}>
      {/*  Slider Start */}
      <div className="slider-area over-hidden slider1">
        <HomePageSliderWithOutArrow>
          {sliders &&
            sliders.map((slide, i) => (
              <div
                className="single-slider slider-height d-flex align-items-center"
                data-background={slide.bg}
                key={i}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12  col-lg-12  col-md-12  col-sm-10 col-12 d-flex align-items-center">
                      <div className="slider-content z-index1 position-absolute mt--12">
                        <h2
                          data-delay="1s"
                          className="light-black-color2 wow fadeInLeft mb-1 text-capitalize pb-25 font500 font-pt"
                        >
                          {createMap(slide.title).map((v, i) => (
                            <Fragment key={i}>
                              {v} <br />
                            </Fragment>
                          ))}
                        </h2>
                        <p
                          className="light-black-color2 wow fadeInLeft font300 pb-25"
                          data-delay="1.5s"
                        >
                          {createMap(slide.text)[0]}
                          <br />
                          <span className="font500">
                            {createMap(slide.text)[1]}
                          </span>
                        </p>
                        <Link href="/shop">
                          <a
                            data-delay="1.7s"
                            className="web-btn wow fadeInUp  d-inline-block text-uppercase white theme-bg position-relative over-hidden pl-30 pr-30 ptb-17"
                          >
                            Mua ngay
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
      {/*  slider end */}

      <br />
      {/* Recommend Start */}
      <div
        className="handpick-items-area pt-60 wow fadeInUp animated"
        data-wow-duration="1s"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pb-15">
              <div className="section-title text-center">
                <h3 className="font-pt light-black-color2 pb-1">
                  Gợi ý dành cho bạn
                </h3>
              </div>
              {/* /section-title */}
            </div>
          </div>

          {handpickedProduct && (
            <SliderWithAutoPlay extraClass="row handpick-items-active theme-border2 pt-30 pb-30 pl-20 mlr-1">
              {handpickedProduct.map((product) => (
                <Product2 product={product} key={product.id} />
              ))}
              {handpickedProduct.map((product) => (
                <Product2 product={product} key={product.id} />
              ))}
            </SliderWithAutoPlay>
          )}
          <div className="row free-shopping-area light-theme-bg  mlr-1">
            <div className="col-xl-12 col-lg-12  col-md-  col-sm- col-">
              <div className="free-shopping pt-15 pb-15 text-center">
                <p className="theme-color mb-0 font600">
                  Mua ngay bây giờ. Miễn phí giao hàng đơn từ 299.000 VND
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommend End */}
      <br />
      <br />
      {/* Banner 1 Start */}

      <div className="banner-area mb-60">
        <div className="container">
          <div className="row">
            {banner_1 &&
              banner_1.map((banner, i) => (
                <div
                  className={`col-xl-6 col-lg-6  col-md-12  col-sm-12 col-12 wow ${i === 1 ? "fadeInRight" : "fadeInLeft"
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
                        className={`banner-sub-tittle mt--4 d-block ${i === 1 ? "banner-sub-tittle2" : "text-white"
                          } font500`}
                      >
                        {banner.subTitle}
                      </span>
                      <h3
                        className={`font500 pb-45 ${i === 1 ? "light-black-color2" : "text-white"
                          }`}
                      >
                        <Link href="/shop">
                          <a>{banner.title}</a>
                        </Link>
                      </h3>
                      <p
                        className={`${i === 1 ? "light-black-color2" : "text-white"
                          } font300 pb-1`}
                      >
                        {banner.text}
                      </p>
                      {/* <Link href="/shop">
                        <a
                          className={`${
                            i === 1
                              ? "web-btn theme-border1 d-inline-block text-capitalize white theme-bg position-relative over-hidden pl-35 pr-35 ptb-12"
                              : "web-btn border-white01 d-inline-block text-capitalize white-bg light-black-color position-relative over-hidden pl-35 pr-35 ptb-12"
                          }`}
                        >
                          
                        </a>
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Banner 1 End */}
      {/*Deadsell start */}
      <div className="handpick-items-area best-deal-product hm2">
        <div className="container">
          <div className="h2-theme-border2">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4  col-lg-4  col-md-7  col-sm-12 col-12 pb-15">
                <div className="section-title weekly-deal pl-30 pt-50">
                  <h3 className="font-pt light-black-color2 pb-6">
                    Deal Chớp Nhoáng
                  </h3>
                  <p className="light-black-color7 font300">
                    Kết thúc trong
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
                {purchasedProduct && (
                  <SliderWithAutoPlay extraClass="row best-deal-product-active  pt-40 mlr-1 ml--20">
                    {purchasedProduct.map((product) => (
                      <Product3
                        key={product.id}
                        product={product}
                        productActionOff
                      />
                    ))}
                    {purchasedProduct.map((product) => (
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
        </div>
      </div>
      <br />
      {/*Deadsell end */}

      {/* most-purchased-item Start */}
      <div
        className="handpick-items-area pt-60 wow fadeInUp animated"
        data-wow-duration="1s"
      >
        <div className="container">
          <div className="row free-shopping-area light-theme-bg  mlr-1">
            <div className="col-xl-12 col-lg-12  col-md-  col-sm- col-">
              <div className="free-shopping pt-15 pb-15 text-center">
                <h4 className="theme-color mb-0 font600">
                  Sản phẩm được mua nhiều nhất
                </h4>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-xl-12  col-lg-12  col-md-5  col-sm-12 col-12 pl-0">
            {purchasedProduct && (
              <SliderWithAutoPlayNumberShow extraClass="row best-deal-product-active  pt-40 mlr-1 ml--20" slidesToShow={5}>
                {purchasedProduct &&
                  purchasedProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
                {purchasedProduct &&
                  purchasedProduct.map((product) => (
                    <Product3
                      key={product.id}
                      product={product}
                      productActionOff
                    />
                  ))}
              </SliderWithAutoPlayNumberShow>
            )}
          </div>

        </div>
      </div>
      {/* most-purchased-item End */}

    </Layout>
  );
};


// const mapStateToProps = (state) => ({
//   sliders: state.home.home1 && state.home.home1.sliders,
//   banner_1: state.home.home1 && state.home.home1.banner_1,
//   category_2: state.home.home1 && state.home.home1.category_2,
//   unmissedProducts: simpleProductFilter(
//     "home1unmissed",
//     state.product.products
//   ),
//   handpickedProduct: simpleProductFilter(
//     "home1handpicked",
//     state.product.products
//   ),
//   purchasedProduct: simpleProductFilter(
//     "home1purchased",
//     state.product.products
//   ),
// });

export default Index;
