import Link from "next/link";
import { useState } from "react";
import { AuthorIcon, CartIcon, CompareIcon, WishListIcon } from "./Icons";
import { DasktopMenu } from "./Menu";
import Search from "./Search";

export const HomePageOne = () => {
  const [newest, setNewest] = useState(false);
  return (
    <header className="d-none d-lg-block">
      <div className="header-area header-area1">
        <div className="header extra-padding-55">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xxl-1 col-xl-1 col-xl-1  col-lg-2  col-md-2  col-sm-12 col-12 pr-md-0">
                <div className="logo-area">
                  <div className="logo white-bg z-index1 position-relative">
                    <Link href="/">
                      <a
                        className="d-block"
                        data-toggle="tooltip"
                        data-selector="true"
                        data-placement="bottom"
                        title="stepmeds"
                      >
                        <img src="/images/logo/logo.png" alt="stepmeds" />
                      </a>
                    </Link>
                  </div>
                  {/* <DasktopMenu /> */}
                </div>
              </div>
              {/* /col */}
              <div className="col-xxl-11 col-xl-11  col-lg-10  col-md-10 col-sm-12 col-12 pl-md-0">
                <div className="header-right-area pl-90">
                  <div className="header-top position-relative ptb-17 over-y-hidden">
                    <div className="row">
                      <Search home={1} />
                      {/* /col */}
                      <div className="col-xxl-4 col-xl-5  col-lg-5  col-md-9  col-sm-0 col-0  pl-0 d-flex  align-items-center justify-content-end">
                        <div className="header-right d-flex align-items-center">
                          <ul className="header-account d-none d-md-block mr-26">
                            <li className="d-none d-md-inline-block">
                              <AuthorIcon />
                            </li>
                          </ul>
                          <ul className="header-compare header-wishlist d-none d-md-block position-relative mr-26 pl-30">
                            <li className="d-none d-md-inline-block">
                              <CompareIcon color="theme-bg" />
                            </li>
                          </ul>
                          <ul className="header-wishlist d-none d-md-block mr-26 pl-30 position-relative">
                            <li className="position-relative">
                              <WishListIcon color="theme-bg" />
                            </li>
                          </ul>

                          <ul className="header-wishlist d-none d-md-block mr-26 pl-30 position-relative">
                            <li className="position-relative">
                              <CartIcon color="theme-bg" />
                            </li>
                          </ul>

                          {/* /h-shop */}
                        </div>
                        {/* /header-right */}
                      </div>
                      {/* /col */}
                    </div>
                    {/* /row */}
                  </div>
                  {/* header-top */}
                  <div
                    className="header-bottom home1-header-bottom"
                    id="header-sticky"
                  >
                    <div className="row align-items-center justify-content-lg-between position-relative">
                      <div className="col-xxl-8 col-xl-8 col-lg-9 col-md-1 col-sm-1 col-1 pr-0 d-flex align-items-center position-static">
                        <div className="main-menu main-menu-1">
                          <DasktopMenu />
                        </div>
                        {/* /main-menu */}
                      </div>
                      {/* /col */}
                      <div className="col-xxl-4 col-xl-4  col-lg-3 col-md-11 col-sm-12 col-12 pl-0">
                        <div className="header-bottom-right d-flex align-items-center justify-content-end">
                          <ul className="free-order d-xl-block pr-20">
                            <li>
                              <Link href="/shop">
                                <a>Miễn phí giao hàng</a>
                              </Link>
                            </li>
                          </ul>
                          {/* /free-order */}
                          <ul className="track-order pl-20 pr-20 position-relative">
                            <li>
                              <a href="#">Theo dõi đơn hàng</a>
                            </li>
                          </ul>
                          {/* /news-letter */}
                          <div className="d-block d-lg-none">
                            <a
                              className="mobile-menubar pt-0 ml-20 hvr"
                              href="#"
                            >
                              <span className="icon-menu" />
                            </a>
                          </div>
                          {/* /mobile-menubar */}
                        </div>
                        {/* /header-bottom-right */}
                      </div>
                      {/* /col */}
                    </div>
                    {/* /row */}
                  </div>
                  {/* /header-bottom */}
                </div>
                {/* /header-right-area */}
              </div>
              {/* /col */}
            </div>
            {/* /row */}
          </div>
          {/* /container-f */}
        </div>
        {/* /header */}
      </div>
      {/* /header-area */}
    </header>
  );
};

export const HomePageTwo = () => {
  const [newest, setNewest] = useState(false);
  return (
    <header className="d-none d-lg-block">
      {/* top-banner start */}
      <div
        className="top-banner  pt-2 pb-12"
        data-background="images/banner/home2/top-banner.jpg"
      >
        <div className="container-fluid d-flex align-items-center justify-content-center align-items-center">
          <p className="font300 light-black-color1 mb-0">
            All face masks on sale{" "}
            <span className="font-500 h2-theme-color">Upto -50%</span> Only in
            this week. Don’t wait!
          </p>
          <Link href="/shop">
            <a className="position-relative font500 d-none d-sm-inline-block text-uppercase bg-transparent h2-theme-color h2-b-theme-border1 font12 line-height-1 hvr2 ml-15">
              Shop Now
            </a>
          </Link>
        </div>
      </div>
      {/* /top-banner */}
      {/* top-banner end */}
      <div className="header-area header-area2">
        <div className="header header2 pt-30">
          <div className="container">
            <div className="header-top">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-3  col-sm-8 col-8 pl-0 pr-md-0">
                  <div className="logo-area">
                    <div className="logo2 white-bg z-index1 position-relative">
                      <Link href="/">
                        <a
                          className="d-block"
                          data-toggle="tooltip"
                          data-selector="true"
                          data-placement="bottom"
                          title="stepmeds"
                        >
                          <img
                            src="/images/logo/logo-theme.png"
                            alt="stepmeds"
                          />
                        </a>
                      </Link>
                    </div>
                    {/* /logo */}
                  </div>
                </div>
                {/* /col */}
                <div className="col-xxl-6 col-xl-6  col-lg-6  col-md-6  col-sm-1 col-1 pl-0 pr-0 justify-content-center">
                  <Search home={2} />
                  {/* /header-search */}
                </div>
                {/* /col */}
                <div className="col-xxl-3 col-xl-3  col-lg-3  col-md-3  col-sm-3 col-3  pl-0 d-flex  align-items-center justify-content-end">
                  <div className="header-right d-flex align-items-center">
                    <ul className="header-account d-none d-md-block">
                      <li className="d-none d-md-inline-block">
                        <Link href="/login">
                          <a
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="My Account"
                            className="dark-black-color"
                          >
                            <span>
                              <i className="fal fa-user-circle" />
                            </span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <ul className="header-compare header-wishlist d-none d-md-block position-relative pl-25">
                      <li className="d-none d-md-inline-block">
                        <CompareIcon color="h2-theme-bg" />
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <WishListIcon color="h2-theme-bg" />
                      </li>
                    </ul>

                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <CartIcon color="h2-theme-bg" />
                      </li>
                    </ul>

                    {/* /h-shop */}
                  </div>
                  {/* /header-right */}
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            {/* header-top */}
            <div
              className="header-bottom home2-header-bottom"
              id="header-sticky"
            >
              <div className="row align-items-center justify-content-lg-between position-relative">
                <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-1 col-sm-1 col-1 d-flex align-items-center position-static">
                  <div className="logo2 pr-20 white-bg z-index1 position-relative">
                    <Link href="/index">
                      <a
                        className="d-block"
                        data-toggle="tooltip"
                        data-selector="true"
                        data-placement="bottom"
                        title="stepmeds"
                      >
                        <img src="/images/logo/logo-theme.png" alt="stepmeds" />
                      </a>
                    </Link>
                  </div>
                  {/* /logo */}
                  <div className="main-menu main-menu-2">
                    <DasktopMenu />
                  </div>
                  {/* /main-menu */}
                </div>
                {/* /col */}
                <div className="col-xxl-3 col-xl-3  col-lg-3 col-md-11 col-sm-12 col-12">
                  <div className="header-bottom-right d-flex align-items-center justify-content-end">
                    <ul className="track-order pr-20 position-relative d-none d-xl-inline-block">
                      <li>
                        <a href="#">Order</a>
                      </li>
                    </ul>
                    {/* /track-order */}
                    <ul className="free-order d-block pl-20 pr-20 position-relative">
                      <li>
                        <a href="#">FAQs</a>
                      </li>
                    </ul>
                    {/* /FAQs */}
                    <ul className="news-letter pl-20 position-relative">
                      <li className="position-relative">
                        <a
                          className="newsletter-tootle"
                          href="#"
                          onClick={() => setNewest(!newest)}
                        >
                          Newsletter
                        </a>
                      </li>
                      <li
                        className="subscribe-form-area white-bg border-t-gray1 position-absolute subscribe-form-area1 pt-30 pl-25 pr-25 pb-30 me-3"
                        style={{ display: newest ? "list-item" : "none" }}
                      >
                        <h5 className="title position-relative d-inline-block font500 light-black-color2 mb-20 hvr">
                          Join Our Newsletter
                        </h5>
                        <form action="#" onSubmit={(e) => e.preventDefault()}>
                          <div>
                            <div className="subscribe-info position-relative mb-15 w-100">
                              <input
                                className="sub-name form-control border-0 pl-35 h2-theme-color light-theme-bg w-100"
                                type="email"
                                name="name"
                                id="sub-name"
                                placeholder="Enter Your Email Address"
                              />
                            </div>
                            <div className="subscribe-btn">
                              <div className="d-inline-block">
                                <a
                                  href="#"
                                  className="web-btn h2-web-btn h2-theme-border1 d-inline-block text-capitalize white h2-theme-bg position-relative over-hidden pl-35 pr-35 ptb-12"
                                >
                                  Subscribe
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="save-info d-flex align-items-start mb-15 mt-18">
                            <input
                              className="p-0 mr-10"
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                            />
                            <p
                              className="mb-0 cursor-pinter light-black-color7"
                              style={{ marginTop: "-6px" }}
                            >
                              Accept
                              <Link href="/terms-and-condition">
                                <a className="light-black-color7 line-height-1 mx-1">
                                  Terms &amp; Conditions
                                </a>
                              </Link>
                              and
                              <Link href="/privacy-page">
                                <a className="light-black-color7 mx-1 line-height-1">
                                  Privacy Policy
                                </a>
                              </Link>
                            </p>
                          </div>
                          {/* /save-info */}
                        </form>
                      </li>
                    </ul>
                    {/* /news-letter */}
                    <div className="d-block d-lg-none">
                      <a className="mobile-menubar pt-0 ml-20 hvr2" href="#">
                        <span className="icon-menu" />
                      </a>
                    </div>
                    {/* /mobile-menubar */}
                  </div>
                  {/* /header-bottom-right */}
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            {/* /header-bottom */}
          </div>
          {/* /container-f */}
        </div>
        {/* /header */}
      </div>
      {/* /header-area */}
    </header>
  );
};

export const HomePageThree = () => {
  const [search, setSearch] = useState(false);
  return (
    <header className="d-none d-lg-block">
      <div className="header-area header-area3">
        <div className="header header3 position-absolute pt-30 pb-22 extra-padding-55">
          <div className="container-fluid">
            <div
              id="header-sticky"
              className="header-bottom home3-header-bottom"
            >
              <div className="row align-items-center justify-content-lg-between position-relative">
                <div className="col-xxl-3 col-xl-2 col-lg-3  col-md-4  col-sm-8 col-8 pr-md-0">
                  <div className="logo-area">
                    <div className="logo3 z-index1 position-relative">
                      <Link href="/">
                        <a
                          className="d-block"
                          data-toggle="tooltip"
                          data-selector="true"
                          data-placement="bottom"
                          title="stepmeds"
                        >
                          <img
                            src="/images/logo/logo-white.png"
                            alt="stepmeds"
                          />
                        </a>
                      </Link>
                    </div>
                    {/* /logo */}
                  </div>
                </div>
                {/* /col */}
                <div className="col-xxl-6 col-xl-7 col-lg-7 col-md-1 col-sm-1 col-1 pr-0 pl-0 d-flex align-items-center justify-content-center position-static d-none d-lg-block">
                  <div className="main-menu main-menu-3">
                    <DasktopMenu />
                  </div>
                  {/* /main-menu */}
                </div>
                {/* /col */}
                <div className="col-xxl-3 col-xl-3  col-lg-2 col-md-8  col-sm-3 col-4  pl-0 d-flex  align-items-center justify-content-end">
                  <div className="header-right d-flex align-items-center">
                    <ul>
                      <li
                        className="header-search position-relative d-none d-lg-inline-block"
                        data-toggle="tooltip"
                        data-selector="true"
                        data-placement="bottom"
                        title="Search"
                      >
                        <span
                          className="black-color d-inline-block"
                          onClick={() => setSearch(true)}
                        >
                          <span className="icon-search" />
                        </span>
                      </li>
                      {search && (
                        <Search home={3} setSearch={() => setSearch(false)} />
                      )}
                    </ul>
                    <ul className="header-account d-none d-md-block pl-25">
                      <li className="d-none d-md-inline-block">
                        <AuthorIcon />
                      </li>
                    </ul>
                    <ul className="header-compare header-wishlist d-none d-md-block position-relative pl-25">
                      <li className="d-none d-md-inline-block">
                        <CompareIcon color="h3-theme-bg" />
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <WishListIcon color="h3-theme-bg" />
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <CartIcon color="h3-theme-bg" />
                      </li>
                    </ul>
                    {/* /h-shop */}
                    <div className="d-block d-lg-none">
                      <a className="mobile-menubar pt-0 ml-20" href="#">
                        <span className="icon-menu" />
                      </a>
                    </div>
                    {/* /mobile-menubar */}
                  </div>
                  {/* /header-right */}
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            {/* /header-bottom */}
          </div>
          {/* /container-f */}
        </div>
        {/* /header */}
      </div>
      {/* /header-area */}
    </header>
  );
};

export const DefaultMenu = () => {
  return (
    <header className="d-none d-lg-block">
      <div className="header-area header-area1 header-deafult">
        <div className="header page-header header2 header-inner  pt-30 pb-22 extra-padding-55">
          <div className="container-fluid">
            <div className="header-bottom" id="header-sticky">
              <div className="row align-items-center justify-content-lg-between position-relative">
                <div className="col-xxl-3 col-xl-2 col-lg-3  col-md-5  col-sm-8 col-8 pr-md-0">
                  <div className="logo-area">
                    <div className="logo2 d-block z-index1 position-relative">
                      <Link href="/">
                        <a
                          className="d-block"
                          data-toggle="tooltip"
                          data-selector="true"
                          data-placement="bottom"
                          title="stepmeds"
                        >
                          <img
                            src="/images/logo/logo-theme.png"
                            alt="stepmeds"
                          />
                        </a>
                      </Link>
                    </div>
                    {/* /logo */}
                  </div>
                </div>
                {/* /col */}
                <div className="col-xxl-6 col-xl-7 col-lg-7 col-md-1 col-sm-1 col-1 pr-0 pl-0 d-flex align-items-center justify-content-center position-static">
                  <div className="main-menu">
                    <DasktopMenu />
                  </div>
                  {/* /main-menu */}
                </div>
                {/* /col */}
                <div className="col-xxl-3 col-xl-3  col-lg-2  col-md-6  col-sm-3 col-3  pl-0 d-flex  align-items-center justify-content-end">
                  <div className="header-right d-flex align-items-center">
                    <ul className="header-account d-none d-md-block">
                      <li className="d-none d-md-inline-block">
                        <Link href="/login">
                          <a
                            data-toggle="tooltip"
                            data-selector="true"
                            data-placement="bottom"
                            title="My Account"
                            className="dark-black-color"
                          >
                            <span>
                              <i className="fal fa-user-circle" />
                            </span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <CompareIcon />
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <WishListIcon />
                      </li>
                    </ul>
                    <ul className="header-wishlist d-none d-md-block pl-25 position-relative">
                      <li className="position-relative">
                        <CartIcon />
                      </li>
                    </ul>

                    <div className="d-block d-lg-none">
                      <a className="mobile-menubar pt-0 ml-20" href="#">
                        <span className="icon-menu" />
                      </a>
                    </div>
                    {/* /mobile-menubar */}
                  </div>
                  {/* /header-right */}
                </div>
                {/* /col */}
              </div>
              {/* /row */}
            </div>
            {/* /header-bottom */}
          </div>
          {/* /container-f */}
        </div>
        {/* /header */}
      </div>
      {/* /header-area */}
    </header>
  );
};
