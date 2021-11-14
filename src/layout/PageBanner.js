import Link from "next/dist/client/link";
const PageBanner = ({ title, pageName, thankupage, id }) => {
  return (
    <div className="slider-area over-hidden">
      <div
        className="single-slider page-height3 d-flex align-items-center"
        data-background="/images/bg/purchased-item-bg.jpg"
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
                <h2 className="text-capitalize font600 mb-10">{title}</h2>
                {thankupage && (
                  <p className="fs-20">
                    Payment is successfully processsed and your order is on the
                    way <br /> Transaction ID:
                    {id}
                  </p>
                )}
                <nav aria-label="breadcrumb">
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
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
