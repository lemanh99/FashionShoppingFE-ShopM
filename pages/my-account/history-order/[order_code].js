// import swal from "@sweetalert/with-react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import SideBarMyAccount from "../../../src/components/myaccount/sidebar";
import axiosIntance from "../../../src/helpers/axios";
import withAuth from "../../../src/HOC/withAuth";
import Layout from "../../../src/layout/Layout";
import { convert_datetime_from_timestamp } from "../../../src/utils/time";
import TimeLine from "../../../src/components/timeline/timeline"
import StepLine from "../../../src/components/timeline/stepline"
import axios from "axios";
import { getAddressVietNam } from "../../../src/utils/address";
import Link from "next/dist/client/link";




const OrderHistoryDetail = ({ }) => {

    const router = useRouter();
    const { order_code } = router.query;
    const orders = useSelector((state) => state.order.orders);
    const [listOrder, setListOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState({})
    const [tracking, setTracking] = useState({})
    const [addressApi, setAddressApi] = useState([]);
    const [items, setItems] = useState([])


    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/?depth=3').then((res) => {
            if (res.status == 200) {
                setAddressApi(res.data)
            }
        })
        axiosIntance.get(`order/detail/ORD1638288187672752`).then((res) => {
            if (res.status == 200) {
                const { data } = res.data;
                setOrderDetail(data)
                setTracking(data.tracking)
            }
        })
    }, [])

    useEffect(() => {
        if (tracking) {
            if (tracking.data) {
                if (tracking.data[0].origin_info) {
                    const trackinfo = tracking.data[0].origin_info.trackinfo
                    if (trackinfo) {
                        let itemTracking = []
                        for (let [index, dataTracking] of trackinfo.entries()) {
                            var data = {
                                title: dataTracking.checkpoint_date,
                                cardTitle: dataTracking.checkpoint_delivery_status,
                                cardSubtitle: `Nguời nhận: ${dataTracking.tracking_detail}`,
                                cardDetailedText: `Vị trí: ${dataTracking.location}`,
                            }
                            itemTracking.push(data)
                        }
                        itemTracking.push({
                            title: "                  ",
                            // cardTitle: dataTracking.checkpoint_delivery_status,
                            // cardSubtitle: `Received: ${dataTracking.tracking_detail}`,
                            cardDetailedText: `Vị trí: ShopM`,
                        })
                        setItems(itemTracking)
                    }

                }
            };
        }
    }, [tracking])

    const getAddressDetails = (city, district, ward) => {
        if (orderDetail && orderDetail.shipping && addressApi) {
            return getAddressVietNam(addressApi, city, district, ward)
        }
        return null
    }

    if (items.length > 0) {
        return <Layout sticky textCenter container footerBg>
            <main>
                {/* <PageBanner title="Checkout" /> */}
                <div className="coupon-area mt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            </div>
                            {/* /col */}
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">

                            </div>
                            {/* /col */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>

                <div className="checkout-area mb-60">
                    <div className="container">
                        <div action="#">
                            <div className="row">
                                {/* /col */}
                                <SideBarMyAccount />
                                <div className="col-xl-9  col-lg-9  col-md-12  col-sm-12 col-12">
                                    
                                    <div className="checkbox-form">
                                        <h4 className="pb-10 mb-20 border-b-light-gray2">

                                        </h4>
                                        {/* /row */}
                                    </div>
                                    <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                                        <h4 className="pb-10 mb-20 border-b-light-gray3">
                                            Chi tiết đơn hàng
                                        </h4>
                                        <div className="your-order-table table-responsive">
                                            <table className="width100">
                                                <thead>
                                                    {/* order-success/ORD1638288187672752 */}
                                                    <tr>
                                                        <th className="product-name">Mã đơn hàng : {orderDetail ? (
                                                            <Link href={`/order-success/${orderDetail.order_code}`}>
                                                                <a className="p-name sky-color">{orderDetail.order_code}</a>
                                                            </Link>
                                                        ) : null}</th>
                                                        <th className="product-name">Mã vận đơn : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.tracking_number) : null}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="cart_item">
                                                        <td className="product-name">
                                                            <strong className="product-quantity">
                                                                Tên người nhận: {orderDetail && orderDetail.shipping ? (orderDetail.shipping.first_name + " " + orderDetail.shipping.last_name) : null}
                                                            </strong>
                                                        </td>
                                                        <td className="product-name" >
                                                            <strong className="product-quantity">
                                                                Số điện thoại: {orderDetail && orderDetail.shipping ? (orderDetail.shipping.phone_number) : null}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr className="cart_item">
                                                        <td className="product-name" colSpan={2}>
                                                            <strong className="product-quantity">
                                                                Địa chỉ giao hàng : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.street + ", " + getAddressDetails(orderDetail.shipping.city, orderDetail.shipping.district, orderDetail.shipping.village)) : null}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr className="cart_item">
                                                        <td className="product-name" colSpan={2}>
                                                            <strong className="product-quantity">
                                                                Đơn vị vận chuyển : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.delivery_name) : null}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr className="cart_item">
                                                        <td className="product-name" colSpan={2}>
                                                            <strong className="product-quantity">
                                                                Tình trạng đơn hàng : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.shipping_status_name) : null}
                                                            </strong>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                                <tfoot>
                                                    <tr className="cart-subtotal">
                                                        <th>Thông tin vận chuyển: </th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    <StepLine />
                                    <TimeLine items={items} />
                                </div>
                                {/* /col */}
                            </div>
                            {/* /row */}
                        </div>
                    </div>
                    {/* /container */}
                </div>

            </main>
        </Layout>
    }

    return (
        <Layout sticky textCenter container footerBg>
            <main>
                {/* <PageBanner title="Checkout" /> */}
                <div className="coupon-area mt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            </div>
                            {/* /col */}
                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">

                            </div>
                            {/* /col */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>

                <div className="checkout-area mb-60">
                    <div className="container">
                        <div action="#">
                            <div className="row">
                                {/* /col */}
                                <SideBarMyAccount />
                                <div className="col-xl-9  col-lg-9  col-md-12  col-sm-12 col-12">
                                    <div className="checkbox-form">
                                        <h4 className="pb-10 mb-20 border-b-light-gray2">

                                        </h4>
                                        {/* /row */}
                                        <div className="your-order mb-30 pt-30 pr-40 pb-60 pl-40 mt-15">
                                            <h4 className="pb-10 mb-20 border-b-light-gray3">
                                                Chi tiết đơn hàng
                                            </h4>
                                            <div className="your-order-table table-responsive">
                                                <table className="width100">
                                                    <thead>
                                                        <tr>
                                                            <th className="product-name">Mã đơn hàng : {orderDetail ? (orderDetail.order_code) : null}</th>
                                                            <th className="product-name">Mã vận đơn : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.tracking_number) : null}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="cart_item">
                                                            <td className="product-name">
                                                                <strong className="product-quantity">
                                                                    Tên người nhận: {orderDetail && orderDetail.shipping ? (orderDetail.shipping.first_name + " " + orderDetail.shipping.last_name) : null}
                                                                </strong>
                                                            </td>
                                                            <td className="product-name" >
                                                                <strong className="product-quantity">
                                                                    Số điện thoại: {orderDetail && orderDetail.shipping ? (orderDetail.shipping.phone_number) : null}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr className="cart_item">
                                                            <td className="product-name" colSpan={2}>
                                                                <strong className="product-quantity">
                                                                    Địa chỉ giao hàng : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.street + ", " + getAddressDetails(orderDetail.shipping.city, orderDetail.shipping.district, orderDetail.shipping.village)) : null}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr className="cart_item">
                                                            <td className="product-name" colSpan={2}>
                                                                <strong className="product-quantity">
                                                                    Đơn vị vận chuyển : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.delivery_name) : null}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr className="cart_item">
                                                            <td className="product-name" colSpan={2}>
                                                                <strong className="product-quantity">
                                                                    Tình trạng đơn hàng : {orderDetail && orderDetail.shipping ? (orderDetail.shipping.shipping_status_name) : null}
                                                                </strong>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                {/* /col */}
                            </div>
                            {/* /row */}
                        </div>
                    </div>
                    {/* /container */}
                </div>

            </main>
        </Layout>
    );
};

export default connect(null, {})(withAuth(OrderHistoryDetail));

