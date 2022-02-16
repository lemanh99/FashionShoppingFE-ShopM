import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";

const PaymentVnpay = ({ url, show, handleClose, data, setData }) => {
    
    const myOnloadFunction = (e) => {
        e.preventDefault();
        if(data && data!=document.getElementById('frame').contentWindow.location){
            if(document.getElementById('frame').contentWindow.location.pathname=="/payment/momo/failed"){
                handleClose(1);
            }else{
                handleClose(0);
            }
        }else{
            setData(document.getElementById('frame').contentWindow.location)
        }
        
    }
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thanh toán vnpay</Modal.Title>
                </Modal.Header>
                <iframe src={url} frameborder="0" className="my-modal" id="frame" onLoad={myOnloadFunction} />
            </Modal>
        </Fragment>
    );
};

export default PaymentVnpay;
