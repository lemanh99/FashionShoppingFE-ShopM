// import swal from "@sweetalert/with-react";
import Link from "next/dist/client/link";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import SelectGroup from "../src/components/form/SelectGroup";
import withAuth from "../src/HOC/withAuth";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { removeCartAll, setCheckoutData } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";
import toast from "react-hot-toast";
import {
    checkoutSchema,
    couponSchema,
    loginSchema,
} from "../src/utils/yupModal";
import PaymentPaypal from "../src/components/payment/paypal";
import PaymentMomo from "../src/components/payment/momo";;
import { addOrder } from "../src/redux/action/order";
import axiosIntance from "../src/helpers/axios";
import { getLocalStorageNull, setLocalStorage } from "../src/utils/localstorage";



// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentVnpay = ({ addOrder, removeCartAll }) => {

    const order = useSelector((state) => state.order);
    const router = useRouter();
    const [deliveryFee, setDeliveryFee] = useState(0);

    const [payment, setPayment] = useState([])

    useEffect(() => {
        const checkout_data = getLocalStorageNull('checkoutData');
        if (!checkout_data) {
            Router.push(
                {
                    pathname: "/checkout",
                },
                undefined,
                { shallow: true }
            );
        }
    }, [])
    useEffect(() => {
        const { vnp_ResponseCode } = router.query;
        if (vnp_ResponseCode == "00") {
            paymentUser({
                order_status_id: 2,
                payment_status_id: 2,
                // payment_id: getPayment("vnpay") ? getPayment("vnpay").id : null,
                payment_id: 4,
            })
            toast.success("Thanh toán bằng ví diện tử vnpay thành công", { duration: 1000 });
        } else {
            Router.push(
                {
                    pathname: "/checkout",
                },
                undefined,
                { shallow: true }
            );
            toast.error("Thanh toán bằng ví diện tử vnpay không thành công", { duration: 1000 });
        }
    }, [router.query])


    useEffect(() => {
        if (order.addOrder) {
            Router.push(
                {
                    pathname: `/order-success/${order.order_code}`,
                },
                undefined,
                { shallow: true }
            );
            removeCartAll();
        }
    }, [order])

    const paymentUser = (value) => {
        const carts = getLocalStorageNull('carts')
        const checkoutData = getLocalStorageNull('checkoutData');
        const orderCode = getLocalStorageNull('orderCode');
        const price = totalPrice(carts);
        let order_item = []
        for (const cart of carts) {
            var item = {
                product_id: cart.id,
                product_sku_id: cart.product_sku_id,
                quantity: cart.qty
            }
            order_item.push(item);
        }
        const orders = {
            order_status_id: value.order_status_id,
            payment_status_id: value.payment_status_id,
            payment_id: value.payment_id,
            total: price,
            subtotal: Number(price) + Number(deliveryFee),
            discount: checkoutData && checkoutData.discount ? Number(checkoutData.discount) : 0,
            delivery_fee_total: deliveryFee,
            payment_total: Number(price) + Number(deliveryFee) - Number(checkoutData && checkoutData.discount ? checkoutData.discount : 0),
            shipping: checkoutData ? checkoutData.shipping : {},
            order_item: order_item,
            order_code: orderCode,
        }
        addOrder(orders);
        localStorage.removeItem("carts");
        localStorage.removeItem("checkoutData");
        localStorage.removeItem("orderCode");
    }


    const getPayment = (name) => {
        const pay = payment.find((p) => String(p.payment_method).toLowerCase() === name.toLowerCase() && p.visible == true)
        return pay
    }

    const handleClick = () => {
        axiosIntance.post('setting/payment/momo/create', {
            order_code: "Payment",
            amount: String(Number(price) + Number(deliveryFee))

        }).then((res) => {
            if (res.status == 200) {
                const { data } = res.data;
                if (data) {
                    setUrlMomo(data)
                    setShowMomo(true)
                } else {
                    toast.error("Thanh toán bằng momo đang lỗi, vui lòng thử lại sau", { duration: 500 });
                }
            } else {
                toast.error("Thanh toán bằng momo đang lỗi, vui lòng thử lại sau", { duration: 500 });
            }
        })
    }
    return (
        <Layout sticky textCenter container footerBg>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 d-flex align-items-center justify-content-center">
                        <div className="page-title-not-found mt-50 text-center">
                            <div className="position-relative" style={{marginBottom: '15px'}}>
                                <Spinner animation="border" role="status" size="100px">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                            <h2 className="text-capitalize font600 mb-10" style={{ fontSize: '23px', marginBottom: '80px' }}>Hệ thống đang xử lý vui lòng chờ giây lát ...</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default connect(null, { addOrder, removeCartAll })(withAuth(PaymentVnpay));

