import { Fragment, useState } from "react";
import InputRange from "react-input-range";

const PriceFilter = ({ filterByPrice, setActive_ }) => {
  const [price, setPrice] = useState({ value: { min: 0, max: 5000000 } });

  return (
    <Fragment>
      <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
        <div className="sidebar-widget mb-35">
          <h6 className="mb-25 title font600 sidebar-title d-inline-block position-relative pb-1">
            Lọc theo giá
          </h6>
          <InputRange
            formatLabel={(value) => ``}
            maxValue={5000000}
            minValue={0}
            value={price.value}
            onChange={(value) => {
              setPrice({ value });
              filterByPrice(value);
              setActive_();
            }}
          />
          <div className="price-slider mt-20">
            <div>
              <form action="#">
                <div className="prc-slider-content mb-15">
                  <div className="d-sm-flex">
                    <label htmlFor="amount" className="mb-0 mr-1">
                      <b>Price :</b>
                    </label>
                    <input
                      type="text"
                      id="amount"
                      readOnly
                      value={`${price.value.min}(vnd) - ${price.value.max}(vnd)`}
                      className="border-0 shop-theme-color bg-transparent"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PriceFilter;
