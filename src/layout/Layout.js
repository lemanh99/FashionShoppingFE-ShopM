import Head from "next/head";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCarts, getCompare, getWishlist } from "../redux/action/utilis";
import { dataImage } from "../utils/utils";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout = ({
  homePage,
  children,
  footerWhite,
  footerWithPettren,
  withoutContainer,
  hadeText,
  getCarts,
  getWishlist,
  getCompare,
}) => {
  useEffect(() => {
    setTimeout(() => {
      dataImage();
    }, 2000);
    getCarts();
    getWishlist();
    getCompare();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>
          {hadeText
            ? hadeText
            : "ShopM - Thời trang Việt Nam"}
        </title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/images/logo/favicon.png"
        />
      </Head>
      <Header homePage={homePage} withoutContainer={withoutContainer} />
      <main>{children}</main>
      <Footer footerWhite={footerWhite} footerWithPettren={footerWithPettren} />
    </Fragment>
  );
};

export default connect(null, { getWishlist, getCompare, getCarts })(Layout);
