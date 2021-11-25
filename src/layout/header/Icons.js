import Link from "next/dist/client/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export const AuthorIcon = () => (
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
          className={`s-count position-absolute ${
            color ? color : "h2-theme-bg"
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
          className={`s-count position-absolute ${
            color ? color : "h2-theme-bg"
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
            className={`s-count position-absolute ${
              color ? color : "h2-theme-bg"
            } text-white text-center`}
          >
            {carts && carts.length}
          </span>
        </a>
      </Link>
    </Fragment>
  );
};
