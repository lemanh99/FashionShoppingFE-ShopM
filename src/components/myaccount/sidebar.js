import { Fragment } from "react";
import Link from "next/dist/client/link";

const SideBarMyAccount = ({
}) => {
  return (
    <Fragment>
      <div className="col-xl-3  col-lg-3  col-md-12  col-sm-12 col-12">
        <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
          <h4 className="pb-10 mb-20 border-b-light-gray3">
            Tài khoản của tôi
          </h4>
          <div className="your-order-table table-responsive">
            <table className="width100">
              <tbody>
                <tr className="cart_item">
                  <td className="product-name">
                    <Link href='/my-account'>
                      <strong className="product-quantity">
                        Thông tin giao hàng
                      </strong>
                    </Link>
                  </td>
                </tr>
                <tr className="cart_item">
                  <Link href='/my-account/history-order'>
                    <td className="product-name">
                      <strong className="product-quantity">
                        Lịch sử đơn hàng
                      </strong>
                    </td>
                  </Link>
                </tr>
                <tr className="cart_item">
                  <Link href='/my-account/password'>
                    <td className="product-name">
                      <strong className="product-quantity">
                        Thay đổi mật khẩu
                      </strong>
                    </td>
                  </Link>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBarMyAccount;
