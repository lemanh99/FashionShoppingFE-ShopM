import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { filterByName } from "../../redux/action/filter";

const Search = ({ home, filterByName, setSearch }) => {
  const [text, setText] = useState(false);
  const [content, setContent] = useState("")
  if (text) {
    Router.push(
      {
        pathname: "/shop",
      },
      undefined,
      { shallow: true }
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText(true);
  };
  const handerSearch = (e) => {
    // e.preventDefault();
    Router.push(
      {
        pathname: `/shop/search/${content}`,
      },
      undefined,
      { shallow: true }
    );
  }

  const funtion_ = () => {
    switch (home) {
      case 1:
        return (
          <div className="col-xxl-8 col-xl-7  col-lg-7  col-md-3  col-sm-12 col-12 pr-0">
            <div
              className="header-search position-relative mr-1 d-lg-inline-block"
              data-toggle="tooltip"
              data-selector="true"
              data-placement="bottom"
              title="Search"
            >
              <div>
                <div className="search-form">
                  <div className="d-none  d-lg-inline-block width100">
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      className="border-0 pl-45 width100 gray-bg4"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <span className="position-absolute">
                      <span className="icon-search" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /header-search */}
            <div className="float-right d-none d-lg-inline-block ms-1">
              <button
                onClick={(e) => handerSearch(e)}
                className="web-btn header-btn theme-border1 d-inline-block text-capitalize white theme-bg position-relative over-hidden pl-35 pr-35 ptb-12"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            className="header-search w-100 position-relative mr-1 d-lg-inline-block"
            data-toggle="tooltip"
            data-selector="true"
            data-placement="bottom"
            title="Search"
          >
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="search-form">
                <div className="d-none d-md-inline-block width100">
                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    className="pl-25 width100 rounded-0 h2-gray-border1"
                    onChange={(e) => filterByName(e.target.value)}
                  />
                  <span className="position-absolute">
                    <span className="icon-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="header-search-details text-center white-bg pt-55 pl-60 pr-60 open-search-info">
            <div className="close-icon d-flex justify-content-end mt-20">
              <a
                className="close-menu d-block home3-close"
                href="#"
                onClick={() => setSearch()}
              >
                <span className="icon-clear" />
              </a>
            </div>
            <div className="header-search-content mt-100 ml-130 mr-130">
              <h3 className>Search in:</h3>

              <form
                className="position-relative mt-50"
                onSubmit={(e) => onSubmit(e)}
              >
                <input
                  className="form-control rounded-0 h5-theme-color"
                  type="text"
                  placeholder="Enter Keyword..."
                  onChange={(e) => filterByName(e.target.value)}
                />
                <a className="position-absolute  d-block" href="#">
                  <span className="icon-search" />
                </a>
              </form>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="header-search-content position-relative d-block d-xl-none mt-20">
            <form onSubmit={(e) => onSubmit(e)} className="position-relative">
              <input
                className="form-control rounded-0 h5-theme-color px-0"
                type="text"
                placeholder="Enter Keyword..."
                onChange={(e) => filterByName(e.target.value)}
              />
              <a
                className="position-absolute primary-color d-block"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="icon-search" />
              </a>
            </form>
          </div>
        );
      default:
        return "";
    }
  };

  return funtion_();
};
export default connect(null, { filterByName })(Search);
