import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";

const TimeLine = (props) => {
    const {
        items
    } = props;
    return (
        <div className="cart-area">
            <div className="container border-b-light-gray pb-100">
                <div className="cart-table text-center table-responsive">
                    <div style={{ width: "100%", height: "100%" }}>
                        <div style={{width: "100%", height:  "100%" }}>
                            <Chrono items={items} mode="VERTICAL" hideControls  disableNavOnKey scrollable useReadMore={false} cardHeight="100px"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* /container */}
        </div>
    );
};

export default TimeLine;
