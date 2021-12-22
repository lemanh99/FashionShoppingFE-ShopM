import React, { useEffect, useState } from "react";

const StepLine = (props) => {
    const {
        items
    } = props;
    return (
        <div className="card-body">
            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                <div className="step completed">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-display2" /></div>
                    </div>
                    <h4 className="step-title">Đang xử lý</h4>
                </div>
                <div className="step completed">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-home" /></div>
                    </div>
                    <h4 className="step-title">Đã đóng gói</h4>
                </div>
                <div className="step completed">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="fas fa-truck" /></div>
                    </div>
                    <h4 className="step-title">Đang vận chuyển</h4>
                </div>
                <div className="step">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-check" /></div>
                    </div>
                    <h4 className="step-title">Đã giao hàng</h4>
                </div>
            </div>
        </div>

    );
};

export default StepLine;
