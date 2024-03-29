import Link from "next/dist/client/link";
import withoutAuthNotPath from "../src/HOC/withoutAuthNotPath";
import Layout from "../src/layout/Layout";

const NotFound = () => {
  return (
    <Layout hadeText="Không tìm thấy trang - Shopm">
      <div className="slider-area over-hidden">
        <div
          className="single-page not-found-page-height d-flex align-items-center justify-content-center"
        // data-background="images/bg/slider-404.jpg"
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                <div className="page-content text-center mt--100">
                  <img src="/images/product/notfound.png" alt="notfound" className="d-block m-auto fs-card-img" />
                  <h3 className=" font-pt">404 </h3>
                  <h3 className="text-dark dark-black-color pb-15 font-pt">
                    Không tìm thấy trang.
                  </h3>
                  <h6 className="text-dark">
                    Đừng đi lạc vào đây
                  </h6>
                  <Link href="/">
                    <a className="web-btn h2-theme-border1 d-inline-block text-uppercase white rounded-0 font13 h2-theme-bg position-relative over-hidden pt-25 pb-25 pl-80 pr-80 mt-60">
                      Trở lại trang chủ
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withoutAuthNotPath(NotFound);