import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";

const ContactUs = () => {
  return (
    <Layout>
      <PageBanner title="Contact Us" pageName="Contact Us" />
      <div>
        <div className="map-area mt-100">
          <div className="container">
            <div className="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.739437128524!2d-112.03815768505712!3d40.6576737793378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528d869d1ee20d%3A0x335b2f731059605a!2sUSANA%20Amphitheatre!5e0!3m2!1sen!2sbd!4v1608483260130!5m2!1sen!2sbd" />
            </div>
          </div>
        </div>

        <div className="contact-area">
          <div className="container">
            <div className="row pb-100">
              <div className="col-xl-6  col-lg-6  col-md-12  col-sm- col-">
                <div className="contact-form-left mt-60">
                  <div className="section-title text-left">
                    <h4 className="c-title mb-35 font600 title d-inline-block position-relative">
                      Our Main Office
                    </h4>
                    <p>
                      Homess is a premium Templates theme with advanced admin
                      module. It’s extremely customizable, easy to use and fully
                      responsive and retina ready. Vel illum dolore eu feugiat
                      nulla facilisis at vero eros et accumsan et iusto odio
                      dignissim qui blandit praesent luptatum zzril delenit
                      augue duis dolore te feugait nulla facilisi.
                    </p>
                    <ul className="hot-line d-flex align-items-center mt-25 pb-25">
                      <li>
                        <span className="h2-theme-color d-block mr-15">
                          <i className="fal fa-headset" />
                        </span>
                      </li>
                      <li>
                        <p className="mb-1">Hotline Free 24/24:</p>
                        <a
                          href="tell:+01500123994"
                          className="light-black-color2 font600"
                        >
                          +01 500 123 994
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /section-title */}
                  <div className="c-contact d-sm-flex">
                    <span className="primary-color pr-1">Address: </span>
                    <p>1234 Heaven Stress, Beverly Hill, Melbourne, USA.</p>
                  </div>
                  <div className="c-email d-sm-flex">
                    <span className="primary-color pr-1">Email: </span>
                    <p>Contact@homesstheme.com</p>
                  </div>
                  <div className="c-number d-sm-flex">
                    <span className="primary-color pr-1">Number Phone: </span>
                    <p>(800) 123 456 789, (800) 987 654 321</p>
                  </div>
                  <div className="c-fax d-sm-flex">
                    <span className="primary-color pr-1">Fax: </span>
                    <p>(+100) 123 456 7890 – (+100) 123 456 7891</p>
                  </div>
                  <div className="c-social-link d-sm-flex align-items-center mt-15">
                    <span className="primary-color d-inline-block pr-10">
                      Social Share:
                    </span>
                    <ul className="social-link d-flex  align-items-center">
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-google-plus-g" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                <div className="contact-form-right mt-60">
                  <h4 className="c-title mb-35 font600 title d-inline-block position-relative">
                    Drop Us A Message
                  </h4>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="contact-form">
                      <label>Name</label>
                      <div className="name">
                        <input
                          type="text"
                          className="form-control primary-bg2 border-0 mt-2 py-2"
                          name="r-name"
                          id="r-name"
                        />
                      </div>
                      <label className="mt-25">Email</label>
                      <div className="email">
                        <input
                          type="email"
                          className="form-control primary-bg2 border-0 mt-2  py-2"
                          name="email"
                          id="r-email"
                        />
                      </div>
                      <label className="mt-25">Your Message</label>
                      <textarea
                        name="message"
                        className="form-control primary-bg2 border-0 mt-2 pt-30 pb-30"
                        id="message"
                        defaultValue={""}
                      />
                    </div>

                    <a
                      href="#"
                      className="web-btn h2-theme-border1 d-inline-block text-capitalize white mt-40 rounded-0 h2-theme-color h2-theme-bg position-relative over-hidden pl-60 pr-60 ptb-17"
                    >
                      send message
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
