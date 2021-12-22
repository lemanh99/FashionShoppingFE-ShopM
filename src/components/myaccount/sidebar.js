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
                    <Link href={`/my-account`}>
                      <a className="text-capitalize">
                        <strong className="product-quantity">
                          Thông tin giao hàng
                        </strong>
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr className="cart_item">
                  <td className="product-name">
                    <Link href='/my-account/history-order'>
                      <a className="text-capitalize">
                        <strong className="product-quantity">
                          Lịch sử đơn hàng
                        </strong>
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr className="cart_item">
                  <td className="product-name">
                    <Link href='/my-account/password'>
                      <a className="text-capitalize">
                        <strong className="product-quantity">
                          Thay đổi mật khẩu
                        </strong>
                      </a>
                    </Link>
                  </td>
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
