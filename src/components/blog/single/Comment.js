const Comment = () => {
  return (
    <div className="row">
      <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
        <div className="review-comments-area mt-40">
          <h5 className="blog-details-heading light-black-color2 font600">
            2 Comments
          </h5>
          <div className="review-comments-area mt-35">
            <div className="row align-items-center align-items-sm-start align-items-md-center">
              <div className="col-xl-1  col-lg-2  col-md-2  col-sm-2 col-4 mt-15 pr-3 pr-sm-0 pr-md-3">
                <div className="client-avatar">
                  <img
                    className="avatar-img width100 height100"
                    src="/images/bg/avater2.png"
                    alt=""
                  />
                </div>
              </div>
              {/* /col */}
              <div className="col-xl-9  col-lg-9  col-md-10  col-sm-10 col-12 pl-0 mt-10">
                <div className="review-text pl-60">
                  <div className="review-head d-sm-flex justify-content-between align-items-center">
                    <div className="d-sm-flex">
                      <h5 className="font600 pr-10">Maxxoile D. Silva</h5>
                      <div className="rating rating-shop d-flex">
                        <ul className="d-flex mr-2">
                          <li>
                            <span>
                              <i className="fas fa-star" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <i className="fas fa-star" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <i className="fas fa-star" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <i className="far fa-star" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <i className="far fa-star" />
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* /rating */}
                    </div>
                    <span className="primary-color font600">20 sep 2020</span>
                  </div>
                  {/* /review-head */}
                  <p className="dc-text1 gray-color2 mb-2 mt-10">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni doloreos qui
                    ratione voluptatem sequi nesciunt
                  </p>
                  <a
                    href="#"
                    className="d-inline-block text-uppercase primary-color font600"
                  >
                    Reply
                    <span className="gray-color2 pl-2">
                      <i className="fas fa-long-arrow-alt-right" />
                    </span>
                  </a>
                </div>
              </div>
              {/* /col */}
            </div>
            {/* /row */}
            <div className="row mt-60">
              <div className="col-xl-11  col-lg-11  col-md-12  col-sm-12 col-12 offset-xl-1 offset-lg-1">
                <div className="row align-items-center align-items-sm-start align-items-md-center">
                  <div className="col-xl-1  col-lg-2  col-md-2  col-sm-2 col-4 mt-15 pr-3 pr-lg-0 pr-sm-0 pr-md-3">
                    <div className="client-avatar client-avatar2">
                      <img
                        className="avatar-img width100 height100"
                        src="/images/bg/client-avater.png"
                        alt=""
                      />
                    </div>
                  </div>
                  {/* /col */}
                  <div className="col-xl-9  col-lg-10  col-md-10  col-sm-10 col-12 pl-xl-15 mt-15">
                    <div className="review-text review-text2 pl-55">
                      <div className="review-head d-sm-flex justify-content-between align-items-center">
                        <div className="d-sm-flex">
                          <h5 className="font600 pr-10">Dennis McCandless</h5>
                          <div className="rating rating-shop d-flex">
                            <ul className="d-flex mr-2">
                              <li>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i className="far fa-star" />
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i className="far fa-star" />
                                </span>
                              </li>
                            </ul>
                          </div>
                          {/* /rating */}
                        </div>
                        <span className="primary-color font600">
                          20 sep 2020
                        </span>
                      </div>
                      {/* /review-head */}
                      <p className="dc-text1 gray-color2 mb-2 mt-10">
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse quam nihil molestiae consequatur,
                        vel illum qui dolorem eum fugiat quo voluptas nulla
                        pariatu
                      </p>
                      <a
                        href="#"
                        className="d-inline-block text-uppercase primary-color font600"
                      >
                        Reply
                        <span className="gray-color2 pl-2">
                          <i className="fas fa-long-arrow-alt-right" />
                        </span>
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
          <div className="reply-form contact-form-right mt-60">
            <h5 className="blog-details-heading light-black-color2 font600 mb-25">
              Post Comments
            </h5>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="comment mb-10">
                <label>Your Review</label>
                <textarea
                  name="message"
                  className="form-control  primary-bg2 mt-10"
                  id="message"
                  defaultValue={""}
                />
              </div>
              <div className="name-and-email d-sm-flex  mb-10">
                <div className="name width50 mr-10">
                  <label className="mt-15 mb-10 d-block">Name *</label>
                  <input
                    type="text"
                    name="r-name"
                    id="r-name"
                    className="width100  primary-bg2"
                  />
                </div>
                <div className="email width50 ml-10">
                  <label className="mt-15 mb-10 d-block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    id="r-email"
                    className=" width100  primary-bg2"
                  />
                </div>
              </div>
              {/* /name-and-email */}
              <div className="save-info d-sm-flex align-items-center mb-15">
                <input
                  className="mr-10"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
                <p className="mb-0">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </p>
              </div>
              <a
                href="#"
                className="web-btn h2-theme-border1 d-inline-block rounded-0 text-capitalize white h2-theme-bg position-relative over-hidden pl-40 pr-40 ptb-17"
              >
                Submit
              </a>
            </form>
          </div>
        </div>
      </div>
      {/* /col */}
    </div>
  );
};

export default Comment;
