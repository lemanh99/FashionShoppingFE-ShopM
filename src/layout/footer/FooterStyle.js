import moment from "moment";
import Subscribe from "../../components/Subscribe";

export const DefaultFooter = ({ footerWhite }) => {
  return (
    <footer>
      <div
        className={`footer-area footer-bg pt-80 ${!footerWhite ? "dark" : ""}`}
      >
        <div className="footer-top">
          <div className="container">
            <div className="row d-flex border-b-gray1 border-t-gray1 pt-25 pb-40">
              <div className="col-xxl-5 col-xl-5  col-lg-6  col-md-12  col-sm-12 col-12 border-l-gray1">
                <div className="row">
                  <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12 ">
                    <div className="footer-widget pb-30">
                      <ul className="footer-account">
                        <li>
                          <a
                            href="#"
                            className="position-relative d-inline-block"
                          >
                            Tài khoản của tôi
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="position-relative d-inline-block"
                          >
                            Đơn hàng của tôi
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="position-relative d-inline-block"
                          >
                            Theo dõi đơn hàng
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /col */}
                  <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12 pl-xl-0">
                    <div className="footer-widget pb-30">
                      <ul className="footer-account">
                        <li>
                          <a
                            href="#"
                            className="position-relative d-inline-block"
                          >
                            Dịch vụ chăm sóc khách hàng
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="position-relative d-inline-block"
                          >
                            Bạn cần trợ giúp?
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /col */}
                </div>
                {/* /row */}
              </div>
              {/* /col */}
              <div className="col-xxl-4 col-xl-4  col-lg-6  col-md-12  col-sm-12 col-12 border-l-gray1">
                <div className="row">
                  <div className="footer-widget f-adress pb-30 pr-60">
                    <ul className="footer-address">
                      <Subscribe
                        bg="theme-bg theme-border1"
                        inputBg="theme-color light-theme-bg"
                      />
                    </ul>
                  </div>
                </div>
                {/* /row */}
              </div>
              {/* /col */}
              {/* /col */}
              <div className="col-xxl-3 col-xl-3  col-lg-6  col-md-12  col-sm-12 col-12 border-l-gray1">
                <div className="row">
                  {/* /col */}
                  <div className="footer-widget pb-30 f-link ml--3">
                    <p className="font500">
                      Liên chiểu, Hòa Khánh Bắc, Đà Nẵng
                    </p>
                    <div className="f-social mt-20">
                      <a href="https://www.facebook.com/lemanh.10.11.99/" target="_blank" >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="https://twitter.com/LeXuanManh_" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="https://www.linkedin.com/in/l%C3%AA-xu%C3%A2n-m%E1%BA%A1nh-babb371b9/" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a href="https://github.com/lemanh99" target="_blank">
                        <i className="fab fa-github" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  {/* /col */}
                </div>
                {/* /row */}
              </div>
              {/* /col */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        <div className="footer-bottom pt-25">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {/* ====== service-area-start ========================================= */}
              <div className="col-xl-8  col-lg-8  col-md-12  col-sm-12 col-12">
                <div className="service-area">
                  <ul>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-shipping-fast" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">30 ngày miễn phí giao hàng</p>
                        </div>
                      </div>
                    </li>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-tram" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">30 ngày hoàn trả sản phẩm</p>
                        </div>
                      </div>
                    </li>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-gift" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">Giao hàng nhanh</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /col */}
              <div className="col-xl-4  col-lg-4  col-md-12  col-sm-12 pr-0 col-12 d-flex justify-content-lg-end">

                <div className="footer-widget f-payment pb-25">
                  <div className="footer-payment">
                    <img src="/images/footer/payment.png" alt="" />
                  </div>
                </div>
                <div style={{ marginLeft: '18px', marginTop: '10px' }}>
                  <p className="mb-0">
                    © {moment().year()}{" "}
                    <a href="#" className="c-theme">
                      Lê Xuân Mạnh
                    </a>{" "}
                    DUT
                  </p>
                </div>
              </div>
              {/* /col */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
      </div>
    </footer>
  );
};

export const FooterWithPettren = () => {
  return (
    <footer>
      <div className="footer-area footer3 footer-bg h3-primary-bg position-relative">
        <div className="footer-top">
          <div className="container">
            <div className="row d-flex">
              <div className="col-xxl-3 col-xl-3  col-lg-3  col-md-4  col-sm-6 col-12 footer-r-border">
                <div className="footer-widget f-adress pb-90 pt-80 pr-100">
                  <img src="/images/logo/logo-white.png" alt="" />
                  <p className="pt-18 font13 text-uppercase mt-25">
                    PO Box 16122 Collins Street Victoria 8007 Australia
                  </p>
                  <div className="f-adress-text mt-25">
                    <ul className="footer-address">
                      <li>
                        <a
                          className="footer-phone text-white mb-0"
                          href="tell:(+800)123456780900"
                        >
                          (+800) 1234 56780 900
                        </a>
                      </li>
                      <li className="footer-mail pt-10">
                        <a href="#" className="text-white font14">
                          services@COMPANY.COM
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /col */}
              <div className="col-xxl-6 col-xl-6  col-lg-6  col-md-8  col-sm-12 col-12 d-sm-flex justify-content-lg-center footer-r-border">
                <ul className="footer-account pt-80 ">
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      My Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Order Status
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Billing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Returns &amp; Exchanges
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      International Shipments
                    </a>
                  </li>
                </ul>
                <ul className="footer-account pt-80 ">
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Customer Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="position-relative d-inline-block">
                      Accessibility
                    </a>
                  </li>
                </ul>
              </div>
              {/* /col */}
              <div className="col-xxl-3 col-xl-3  col-lg-3  col-md-12  col-sm-6 col-12 d-flex justify-lg-content-center">
                <div className="footer-widget f-social pb-30 pt-80 footer-padding-left">
                  <ul className="footer-social-link">
                    <li>
                      <a
                        className="d-inline-block font13 text-uppercase transition-3 mb-20"
                        href="#"
                      >
                        <span className="d-inline-block h3-theme-bg text-center">
                          <i className="fab fa-facebook-f" />
                        </span>
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        className="d-inline-block font13 text-uppercase transition-3 mb-20"
                        href="#"
                      >
                        <span className="d-inline-block h3-theme-bg text-center">
                          <i className="fab fa-twitter" />
                        </span>
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        className="d-inline-block font13 text-uppercase transition-3 mb-20"
                        href="#"
                      >
                        <span className="d-inline-block h3-theme-bg text-center">
                          <i className="fab fa-instagram" />
                        </span>
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        className="d-inline-block font13 text-uppercase transition-3 mb-20"
                        href="#"
                      >
                        <span className="d-inline-block h3-theme-bg text-center">
                          <i className="fab fa-pinterest-p" />
                        </span>
                        pinterest
                      </a>
                    </li>
                    <li>
                      <a
                        className="d-inline-block font13 text-uppercase transition-3 mb-20"
                        href="#"
                      >
                        <span className="d-inline-block h3-theme-bg text-center">
                          <i className="fab fa-google-plus-g" />
                        </span>
                        Google+
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /col */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center justify-content-center footer-t-border pt-25">
              {/* ====== service-area-start ========================================= */}
              <div className="col-xl-8  col-lg-8  col-md-12  col-sm-12 col-12">
                <div className="service-area">
                  <ul>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-shipping-fast" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">30 Days To Money Back</p>
                        </div>
                      </div>
                    </li>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-tram" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">30 Days To Money Back</p>
                        </div>
                      </div>
                    </li>
                    <li className="d-inline-block mr-50">
                      <div className="single-service d-flex align-items-center mb-25">
                        <div className="s-ser-icon mr-15">
                          <span className="theme-color">
                            <i className="fal fa-gift" />
                          </span>
                        </div>
                        <div className="s-ser-content">
                          <p className="mb-0">Shipping in 24 Hours</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /col */}
              <div className="col-xl-4  col-lg-4  col-md-12  col-sm-12 pr-0 col-12 d-flex justify-content-lg-end">
                <div className="footer-widget f-payment pb-25">
                  <div className="footer-payment">
                    <img src="/images/footer/payment.png" alt="" />
                  </div>
                </div>
              </div>
              {/* /col */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        <div className="pattern position-absolute left0 bottom0 d-none d-xl-block">
          <img src="/images/bg/footer-ptrn.png" alt="" />
        </div>
        <div className="f-pattern position-absolute d-none d-xl-block">
          <img src="/images/bg/Pattern1.png" alt="" />
        </div>
      </div>
    </footer>
  );
};
