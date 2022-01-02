import Link from "next/dist/client/link";
import { SliderWithBannerAutoPlay } from "../components/sliders/HomePageProductSlider";

const imageBanner = () => {
  let data = [
    "https://cf.shopee.vn/file/654453b842132058f19773778cdaa052",
    "https://cf.shopee.vn/file/b983bb36b0759032af84ca0c0d0c6d2d",
    "https://cf.shopee.vn/file/b00d583982aa2cf4ab05eb08559c4ddd"
  ]
  return data
}
const PageBanner = ({ title, pageName, thankupage, id }) => {
  return (
    <div className="row">
      <div className="col-xl-1  col-lg-1  col-md-1  col-sm-10 col-1 d-flex align-items-center">

      </div>
      <div className="col-xl-10  col-lg-10  col-md-10  col-sm-10 col-10">
        <SliderWithBannerAutoPlay extraClass="row handpick-items-active pt-30 mlr-1">
          {imageBanner() && imageBanner().map((image) => (
            <div className="slider-area over-hidden">
              <div
                className="single-slider page-height4 d-flex align-items-center"
                data-background={image}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 d-flex align-items-center justify-content-center">
                      <div className="page-title mt-10 text-center">
                        {thankupage && (
                          <i
                            className="fa fa-check-circle text-success fs-100 mb-3"
                            aria-hidden="true"
                          />
                        )}
                        {/* <h2 className="text-capitalize font600 mb-10">{title}</h2> */}
                        {/* {thankupage && (
                    <p className="fs-20">
                      Payment is successfully processsed and your order is on the
                      way <br /> Transaction ID:
                      {id}
                    </p>
                  )} */}
                        {/* <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center bg-transparent">
                      <li className="breadcrumb-item">
                        <Link href="/">
                          <a className="primary-color">Home</a>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active text-capitalize"
                        aria-current="page"
                      >
                        {pageName ? pageName : title}
                      </li>
                    </ol>
                  </nav> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </SliderWithBannerAutoPlay>

      </div>

      <div className="col-xl-1  col-lg-1  col-md-1  col-sm-10 col-1 d-flex align-items-center">

      </div>
    </div>

  );
};

export default PageBanner;
