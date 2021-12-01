import Link from "next/dist/client/link";
import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    data-toggle="tooltip"
    data-selector="true"
    data-placement="bottom"
    title="My Account"
    className="dark-black-color"
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span>
      <i className="fal fa-user-circle" />
    </span>
  </a>
));

export const AuthorIcon = () => (

  <Dropdown autoClose={true} >
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">

    </Dropdown.Toggle>

    <Dropdown.Menu renderMenuOnMount={true}>
      <Dropdown.Item><Link href="/my-account">Tài khoản của tôi</Link></Dropdown.Item>
      <Dropdown.Item href="/logout">Đăng xuất</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  // <nav id="mobile-menu">
  //   <ul className="d-block">
  //     <li>
  //       <Link href="/">
  //         <a className="active dp-menu"><i className="fal fa-user-circle" /></a>
  //       </Link>
  //       <ul className="mega-menu box-shadow-gray pt-25 pb-20 pl-30 pr-30">
  //           <li>
  //             <Link href="/">
  //               <a>z</a>
  //             </Link>
  //           </li>
  //       </ul>
  //     </li>
  //   </ul>
  // </nav>
);

export const LoginIcon = () => (
  <Link href="/login">
    <a
      data-toggle="tooltip"
      data-selector="true"
      data-placement="bottom"
      title="Đăng nhập"
      className="dark-black-color"
    >
      Đăng nhập
    </a>
  </Link>
);

export const CompareIcon = ({ color }) => {
  const compare = useSelector((state) => state.utilis.compares);
  return (
    <Link href="/compare">
      <a
        data-toggle="tooltip"
        data-selector="true"
        data-placement="bottom"
        title="So sánh sản phẩm"
        className="dark-black-color"
      >
        <span>
          <i className="fal fa-random" />
        </span>
        <span
          className={`s-count position-absolute ${color ? color : "h2-theme-bg"
            } text-white text-center`}
        >
          {compare && compare.length}
        </span>
      </a>
    </Link>
  );
};
export const WishListIcon = ({ color }) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);
  return (
    <Link href="/wishlist">
      <a
        data-toggle="tooltip"
        data-selector="true"
        data-placement="bottom"
        title="View wishlist"
        className="dark-black-color"
      >
        <span>
          <i className="fal fa-heart" />
        </span>
        <span
          className={`s-count position-absolute ${color ? color : "h2-theme-bg"
            } text-white text-center`}
        >
          {wishlist && wishlist.length}
        </span>
      </a>
    </Link>
  );
};

export const CartIcon = ({ color }) => {
  const carts = useSelector((state) => state.utilis.carts);
  return (
    <Fragment>
      <Link href="/cart">
        <a
          data-toggle="tooltip"
          data-selector="true"
          data-placement="bottom"
          title="View cart"
          className="dark-black-color"
        >
          <span>
            <i className="fal fa-shopping-bag" />
          </span>
          <span
            className={`s-count position-absolute ${color ? color : "h2-theme-bg"
              } text-white text-center`}
          >
            {carts && carts.length}
          </span>
        </a>
      </Link>
    </Fragment>
  );
};
