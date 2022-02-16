import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";

const PaymentMomo = ({ url, show, handleClose, data, setData, setPaymentMomoSuccess }) => {
    
    const myOnloadFunction = (e) => {
        e.preventDefault();
        if(data && data!=document.getElementById('frame').contentWindow.location){
            // success
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
                    <Modal.Title>Thanh toán momo</Modal.Title>
                </Modal.Header>
                <iframe src={url} frameborder="0" className="my-modal" id="frame" onLoad={myOnloadFunction} />
            </Modal>
        </Fragment>
    );
};

export default PaymentMomo;
