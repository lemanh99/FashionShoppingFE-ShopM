import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory_3 } from "../../redux/action/home";
import { CartIcon, CompareIcon, WishListIcon } from "./Icons";

export const DasktopMenu = () => {

  const categoies = useSelector((state) => state.home.category_3)
  const [listCategory, setListCategory] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory_3());
  }, []);

  useEffect(() => {
    setListCategory(categoies);
  }, [categoies])

  return (
    <nav id="mobile-menu">
      <ul className="d-block">
        {listCategory ? (listCategory.map((category) => (
          // <Product2 product={product} key={product.id} />
          category.child_category.length > 0 ? (
            <li>
              <Link href="/">
                <a className="active dp-menu">{category.category_name}</a>
              </Link>
              <ul className="mega-menu box-shadow-gray pt-25 pb-20 pl-30 pr-30">
                {category.child_category.map((child) => (
                  <li>
                    <Link href={`/shop/category/${child.id}`}>
                      <a>{child.category_name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : null
        ))) : null}
      </ul>
    </nav>
  );
};

export const MobileMenu = () => {
  const [subMenu, setSubMenu] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const openAndCloseMenu = (name) => setSubMenu(subMenu !== name ? name : "");

  return (
    <Fragment>
      <div className="mobile-menu-area pt-30 pb-30 d-lg-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <Link href="/">
                <a>
                  <div className="logo">
                    <img src="/images/logo/logo-theme.png" alt="" />
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-6 ">
              <div className="d-flex justify-content-end">
                <ul className="header-account d-none d-sm-block">
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
                          <i className="fal fa-user-circle"></i>
                        </span>
                      </a>
                    </Link>
                  </li>
                </ul>
                <ul className="header-compare header-wishlist d-none d-sm-block position-relative pl-25">
                  <li className="d-none d-md-inline-block">
                    <CompareIcon />
                  </li>
                </ul>
                <ul className="header-wishlist d-none d-sm-block pl-25 position-relative">
                  <li className="position-relative">
                    <WishListIcon />
                  </li>
                </ul>
                <ul className="header-wishlist d-none d-sm-block pl-25 position-relative">
                  <li className="position-relative">
                    <CartIcon />
                  </li>
                </ul>

                <button
                  className="mobile-menubar bar-style"
                  onClick={() => setOpenMenu(true)}
                >
                  <i className="fal fa-bars" />
                </button>
              </div>
              {/* /h-shop */}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`side-mobile-menu bg-white pt-20 pb-30 pl-40 pr-40 pb-100 d-lg-none ${openMenu ? "open-menubar" : ""
          }`}
      >
        <div className="close-icon d-flex justify-content-end mt-0">
          <a
            className="close-menu d-block"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(false);
              setSubMenu("");
            }}
          >
            <span className="icon-clear" />
          </a>
        </div>
        <div className="header-search-content position-relative d-block d-xl-none mt-20">
          <form action="#" className="position-relative">
            <input
              className="form-control rounded-0 h5-theme-color px-0"
              type="text"
              placeholder="Enter Keyword..."
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
        <div className="mobile-menu mt-10 mean-container">
          <div className="mean-bar">
            <nav className="mean-nav">
              <ul className="d-block" id="metismenu">
                <li>
                  <Link href="/">
                    <a className="dp-menu" aria-expanded="true">
                      Thời trang nam
                    </a>
                  </Link>
                  <ul
                    className="mega-menu box-shadow-gray pt-25 pb-20 pl-30 pr-30"
                    style={{ display: subMenu === "home" ? "block" : "none" }}
                  >
                    <li>
                      <Link href="/">
                        <a>Jacket</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/index-2">
                        <a>Coat</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/index-3">
                        <a>Home page 03</a>
                      </Link>
                    </li>
                  </ul>
                  <a
                    className="mean-expand"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openAndCloseMenu("home");
                    }}
                  >
                    {subMenu === "home" ? "-" : "+"}
                  </a>
                </li>
                <li>
                  <Link href="/shop">
                    <a className="dp-menu" aria-expanded="true">
                      Thời trang nữ
                    </a>
                  </Link>
                  <ul
                    className="mega-menu box-shadow-gray pt-25 pb-20 pl-30 pr-30"
                    style={{ display: subMenu === "page" ? "block" : "none" }}
                  >
                    <li>
                      <Link href="/shop">
                        <a>Shop</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/7">
                        <a>Product Details</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart">
                        <a>Shopping cart</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/checkout">
                        <a>Checkout</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/order-success">
                        <a>Order Success</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist">
                        <a>Wishlist </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/compare">
                        <a>Compare </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        <a>Register</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <a>Login</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us">
                        <a>Liên hệ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms-and-condition">
                        <a>Terms &amp; Condition</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-page">
                        <a>Privacy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/404">
                        <a>404 Page</a>
                      </Link>
                    </li>
                  </ul>
                  <a
                    className="mean-expand"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openAndCloseMenu("page");
                    }}
                  >
                    {subMenu === "page" ? "-" : "+"}
                  </a>
                </li>
                <li>
                  <Link href="/shop">
                    <a>Medicines</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a className="dp-menu">Blog</a>
                  </Link>
                  <ul
                    style={{ display: subMenu === "blog" ? "block" : "none" }}
                    className="mega-menu mega-dropdown-menu  box-shadow-gray pt-25 pb-20 pl-30 pr-30"
                  >
                    <li>
                      <Link href="/blog">
                        <a>Blog page</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/1">
                        <a>Blog details</a>
                      </Link>
                    </li>
                  </ul>
                  <a
                    className="mean-expand"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openAndCloseMenu("blog");
                    }}
                  >
                    {subMenu === "blog" ? "-" : "+"}
                  </a>
                </li>
                <li className="mean-last">
                  <Link href="/contact-us">
                    <a className="mr-0">Contact</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="menu-login pt-10 d-block d-md-none">
          <ul className="header-login d-flex justify-content-between mobile-border-b ">
            <li>
              <Link href="/login">
                <a>My Account</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>
                  <i className="fal fa-user-circle" />
                </a>
              </Link>
            </li>
          </ul>
          <ul className="header-heart d-flex justify-content-between mobile-border-b">
            <li>
              <Link href="/wishlist">
                <a>Wishlist</a>
              </Link>
            </li>
            <li>
              <Link href="/wishlist">
                <a>
                  <span className="icon-heart" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {/* /header-right */}
        <h6 className="light-black-color2 font600 mt-30 pb-1 border-primary-b d-inline-block">
          Contact us
        </h6>
        <ul className="contact-add mt-20">
          <li className="mb-15 primary-color">
            <span className="pe-1">
              <i className="fas fa-map-marker-alt" />
            </span>
            PO Box 16122 Collins Street Victoria 8007 Australia
          </li>
          <li className="mb-20 primary-color">
            <span className="pe-1">
              <i className="far fa-envelope" />
            </span>
            contact@example.com
          </li>
          <li className="mb-15">
            <a className=" primary-color" href="tell:+01500123994">
              <span className="pe-1">
                <i className="fas fa-phone" />
              </span>
              +01 500 123 994
            </a>
          </li>
        </ul>
        <ul className="social-link pt-2 mb-150">
          <li className="d-inline-block">
            <a
              className="active  primary-color-center pr-0 d-inline-block transition-3"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-facebook-f" />
            </a>
          </li>
          <li className="d-inline-block">
            <a
              className=" primary-color text-center pr-0 d-inline-block transition-3"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li className="d-inline-block">
            <a
              className=" primary-color text-center pr-0 d-inline-block transition-3"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-instagram" />
            </a>
          </li>
          <li className="d-inline-block">
            <a
              className=" primary-color text-center pr-0 d-inline-block transition-3"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-behance" />
            </a>
          </li>
          <li className="d-inline-block">
            <a
              className=" primary-color text-center pr-0 d-inline-block transition-3"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fab fa-youtube" />
            </a>
          </li>
        </ul>
        {/* social-link */}
      </div>

      <div
        className={`body-overlay ${openMenu ? "opened" : ""}`}
        onClick={() => {
          setOpenMenu(false);
          setSubMenu("");
        }}
      />
    </Fragment>
  );
};
