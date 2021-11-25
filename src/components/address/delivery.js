import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const DeliveryGroup = ({
    handleBlur,
    handleChange,
    values,
    errors,
    provinces,
}) => {
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const getDistrictByProvinces = (value) => {
        const province_info = provinces.filter((province) => province.codename == value)[0]
        if (province_info) {
            setDistricts(province_info["districts"])
            return province_info["districts"]
        }
        return []
    }
    const getWardsByDistrict = (value) => {
        const district_info = districts.filter((district) => district.codename == value)[0]
        if (district_info) {
            setWards(district_info["wards"])
            return district_info["wards"]
        }
        return []
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                    <div className="country-select mb-30">
                        <label>
                            Tỉnh/Thành phố <span className="required">*</span>
                        </label>
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.province}
                            name="province"
                            className="nice-select w-100 primary-bg2 mb-20 mb-0"
                        >
                            <option value="">Chọn 1 tỉnh</option>
                            {provinces.map((province, i) => (
                                <option value={province.codename} key={i}>
                                    {province.name}
                                </option>
                            ))}
                            <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp mb-3"
                                style={{ display: "block" }}
                            >
                                {errors.province && errors.province}
                            </div>
                        </select>
                    </div>
                </div>
                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                    <div className="country-select mb-30">
                        <label>
                            Quận/Huyện <span className="required">*</span>
                        </label>
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.district}
                            name="district"
                            className="nice-select w-100 primary-bg2 mb-20 mb-0"
                        >
                            <option value="">Chọn 1 quận huyện</option>
                            {getDistrictByProvinces(values.province).map((district, i) => (
                                <option value={district.codename} key={i}>
                                    {district.name}
                                </option>
                            ))}
                            <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp mb-3"
                                style={{ display: "block" }}
                            >
                                {errors.district}
                            </div>
                        </select>
                    </div>
                </div>
                <div className="col-xl-4  col-lg-4  col-md-4  col-sm-4 col-12">
                    <div className="country-select mb-30">
                        <label>
                            Phường/xã <span className="required">*</span>
                        </label>
                        <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.wards}
                            name="wards"
                            className="nice-select w-100 primary-bg2 mb-20 mb-0"
                        >
                            <option value="">Chọn 1 phường xã</option>
                            {getWardsByDistrict(values.district).map((ward, i) => (
                                <option value={ward.codename} key={i}>
                                    {ward.name}
                                </option>
                            ))}
                            <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp mb-3"
                                style={{ display: "block" }}
                            >
                                {errors.wards && errors.wards}
                            </div>
                        </select>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DeliveryGroup;
