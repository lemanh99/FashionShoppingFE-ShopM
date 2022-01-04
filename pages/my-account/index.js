// import swal from "@sweetalert/with-react";
import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import InputGroup from "../../src/components/form/InputGroup";
import { connect, useSelector } from "react-redux";
import SideBarMyAccount from "../../src/components/myaccount/sidebar";
import withAuth from "../../src/HOC/withAuth";
import Layout from "../../src/layout/Layout";
import { convert_datetime_from_timestamp } from "../../src/utils/time";
import { addressSchema } from "../../src/utils/yupModal";
import { getCustomerAddress, createCustomerAddress, updateCustomerAddress } from "../../src/redux/action/user";
import toast from "react-hot-toast";


const MyAccount = ({ getCustomerAddress, createCustomerAddress, updateCustomerAddress }) => {
  const addressCustomer = useSelector((state) => state.user.address)
  const auth = useSelector((state) => state.auth)
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [edit, setEdit] = useState(true);

  const formikRef = useRef();
  async function getCountry() {
    const res = await axios.get('https://provinces.open-api.vn/api/?depth=3')
    setProvinces(res.data);
  }

  useEffect(() => {
    getCountry()
    getCustomerAddress()
  }, [])

  useEffect(() => {
    if (addressCustomer && addressCustomer.length > 0) {
      if (formikRef.current) {
        formikRef.current.setFieldValue(
          "province",
          addressCustomer[0].city
        );
        formikRef.current.setFieldValue(
          "district",
          addressCustomer[0].district
        );
        formikRef.current.setFieldValue(
          "wards",
          addressCustomer[0].village
        );
        formikRef.current.setFieldValue(
          "street",
          addressCustomer[0].street
        );
        formikRef.current.setFieldValue(
          "firstName",
          addressCustomer[0].first_name
        );
        formikRef.current.setFieldValue(
          "lastName",
          addressCustomer[0].last_name
        );
        formikRef.current.setFieldValue(
          "email",
          addressCustomer[0].email
        );
        formikRef.current.setFieldValue(
          "phoneNumber",
          addressCustomer[0].phone_number
        );
      }

    }
  }, [addressCustomer])

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

  const handleAddress = (values) => {
    const data = {
      "first_name": values.firstName,
      "last_name": values.lastName,
      "country": "viet_nam",
      "city": values.province,
      "district": values.district,
      "village": values.wards,
      "street": values.street,
      "postal_code": "000000",
      "email": values.email,
      "phone_number": values.phoneNumber
    }
    if(addressCustomer && addressCustomer.length>0){
      updateCustomerAddress(addressCustomer[0].id, data)
    }else{
      createCustomerAddress(data)
    }
    toast.success("Cập nhật thông tin thành công");
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
                    <div className="cart-area">
                      <div className="container border-b-light-gray pb-100">
                        <Formik
                          innerRef={formikRef}
                          initialValues={addressSchema.initialValue}
                          // validationSchema={addressSchema.schema}
                          onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                              handleAddress(values)
                              setSubmitting(false);
                            }, 400);
                          }}
                        >
                          {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <div className="checkout-area mb-60">
                              <div className="container">
                                <form action="#" onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                      <div className="checkbox-form">
                                        <h4 className="pb-10 mb-20 border-b-light-gray2">
                                          Thông tin giao hàng
                                        </h4>
                                        {/* /row */}
                                        <div className="different-address">
                                          <div className="row">
                                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                              <div className="checkout-form-list mb-30">
                                                <InputGroup
                                                  name="firstName"
                                                  id="firstName"
                                                  label="Họ"
                                                  errors={errors.firstName}
                                                  values={values.firstName}
                                                  handleBlur={handleBlur}
                                                  handleChange={handleChange}
                                                  disabled={edit}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-xl-6  col-lg-6  col-md-6  col-sm-6 col-12">
                                              <div className="checkout-form-list mb-30">
                                                <InputGroup
                                                  name="lastName"
                                                  id="lastName"
                                                  label="Tên"
                                                  errors={errors.lastName}
                                                  values={values.lastName}
                                                  handleBlur={handleBlur}
                                                  handleChange={handleChange}
                                                  disabled={edit}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                              <div className="checkout-form-list mb-30">
                                                <InputGroup
                                                  name="phoneNumber"
                                                  id="phoneNumber"
                                                  label="Số điện thoại"
                                                  errors={errors.phoneNumber}
                                                  values={values.phoneNumber}
                                                  handleBlur={handleBlur}
                                                  handleChange={handleChange}
                                                  disabled={edit}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                              <div className="checkout-form-list mb-30">
                                                <InputGroup
                                                  name="email"
                                                  id="email"
                                                  label="Email"
                                                  type="email"
                                                  errors={errors.email}
                                                  values={values.email}
                                                  handleBlur={handleBlur}
                                                  handleChange={handleChange}
                                                  disabled={edit}
                                                />
                                              </div>
                                            </div>
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
                                                    disabled={edit}
                                                  >
                                                    <option value="">Chọn 1 tỉnh</option>
                                                    {provinces.map((province, i) => (
                                                      <option value={province.codename} key={"province" + i}>
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
                                                    disabled={edit}
                                                  >
                                                    <option value="">Chọn 1 quận huyện</option>
                                                    {getDistrictByProvinces(values.province).map((district, i) => (
                                                      <option value={district.codename} key={"district" + i}>
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
                                                    disabled={edit}
                                                  >
                                                    <option value="">Chọn 1 phường xã</option>
                                                    {getWardsByDistrict(values.district).map((ward, i) => (
                                                      <option value={ward.codename} key={"wards" + i}>
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

                                            <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
                                              <div className="checkout-form-list mb-30">
                                                <InputGroup
                                                  name="street"
                                                  id="street"
                                                  label="Địa chị cụ thể"
                                                  placeholder="Địa chỉ cụ thể"
                                                  errors={errors.street}
                                                  values={values.street}
                                                  handleBlur={handleBlur}
                                                  handleChange={handleChange}
                                                  disabled={edit}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="order-button-payment mt-20">
                                        {edit ? 
                                        <button
                                          type="submit"
                                          className="bt-btn theme-btn"
                                          onClick={(e) => setEdit(!edit)}
                                        >
                                          Chỉnh sửa
                                        </button> :
                                          <button
                                            type="button"
                                            className="bt-btn theme-btn"
                                            onClick={(e) => setEdit(!edit)}
                                          >
                                            Lưu
                                          </button>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  {/* /row */}
                                </form>
                              </div>
                              {/* /container */}
                            </div>
                          )}
                        </Formik>
                      </div>
                      {/* /container */}
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
export default connect(null, { getCustomerAddress, createCustomerAddress, updateCustomerAddress })(withAuth(MyAccount));

