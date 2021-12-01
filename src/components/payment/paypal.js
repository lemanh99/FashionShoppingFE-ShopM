import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Fragment } from "react";
import toast from "react-hot-toast";

const PaymentPaypal = ({ total, token, paymentUser
}) => {

    const initialOptionsPaypal = {
        "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
        "currency": "USD",
        "intent": "capture",
        "data-client-token": token,
    };
    return (
        <Fragment>
            <div className="accordion-body">
                Thanh toán bằng paypal. Nếu bạn không có tài khoản paypal, bạn có thể thanh toán bằng credict card
                <div className="mt-3">
                    <PayPalScriptProvider
                        options={initialOptionsPaypal}
                    >
                        <PayPalButtons
                            style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: total
                                            },
                                            custom_id: "e-book-1234"  // the name or slug of the thing you're selling
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then(function (details) {
                                    toast.success('Thanh toán thành công ' + details.payer.name.given_name)
                                    paymentUser({
                                        order_status_id: 1,
                                        payment_status_id: 2,
                                        payment_id: 1,
                                    })
                                    
                                });
                            }}
                            onCancel={() => toast.error(
                                "Bạn đã hủy thanh toán bằng paypal. Vui lòng thử lại", {
                                duration: 3000,
                            })}
                            onError={(err) => {
                                toast.error(
                                    "Quá trình thanh toán paypal lỗi, vui lòng thử lại", {
                                    duration: 3000,
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentPaypal;
