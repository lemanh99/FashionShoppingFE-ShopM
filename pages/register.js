import { Formik } from "formik";
import DatePicker from "react-datepicker";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { signup } from "../src/redux/action/auth";
import { registerSchema } from "../src/utils/yupModal";
import "react-datepicker/dist/react-datepicker.css";
import { convert_datetime_to_day } from "../src/utils/time";

const Register = () => {
  const Router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [submitForm, setSumitForm] = useState(false);
  const [birthDay, setBirthDay] = useState(new Date());
  const dispatch = useDispatch();
  
  const submit = (users) => {
    const user = {
      first_name: users.firstName,
      last_name: users.lastName,
      phone_number: users.phoneNumber,
      email: users.email,
      password: users.password,
      gender_id: users.gender,
      birth_date: convert_datetime_to_day(birthDay)
    };
    dispatch(signup(user));
  }

  useEffect(() => {
    setSumitForm(false);
  }, [])

  useEffect(() => {
    if (auth.register&&submitForm) {
      Router.push("/login")
    }
  }, [auth])

  return (
    <Layout>
      <main>
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-45">Đăng ký tài khoản</h3>
                  {submitForm && auth && auth.app_status?(
                    <div>
                      <label className="notification-message">{auth.app_status=="ERROR_USER_EMAIL_ALREADY_EXIST"?("Tài khoản email đã tồn tại"):("Thông tin nhập không hợp lệ")}</label>
                    </div>
                  ):null}
                  <Formik
                    initialValues={registerSchema.initialValue}
                    validationSchema={registerSchema.schema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        submit(values);
                        setSubmitting(false);
                        setSumitForm(true);
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
                      <form onSubmit={handleSubmit}>
                        <InputGroup
                          label="Email"
                          id="email"
                          name="email"
                          type="string"
                          placeholder="Enter Email address..."
                          values={values.email}
                          errors={errors.email}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <div className="row">
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            <InputGroup
                              label="Họ"
                              id="firstName"
                              name="firstName"
                              type="string"
                              placeholder="Họ"
                              values={values.firstName}
                              errors={values.errors}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                          </div>
                          {/* /col */}
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            <InputGroup
                              label="Tên"
                              id="lastName"
                              name="lastName"
                              type="string"
                              placeholder="Tên"
                              values={values.lastName}
                              errors={values.errors}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                          </div>
                          {/* /col */}
                        </div>
                        <div className="row">
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">
                            <div className="country-select">
                              <label>
                                Giới tính <span className="required">*</span>
                              </label>
                              <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender}
                                name="gender"
                                className="nice-select w-100 primary-bg2 mb-20 mb-0"
                                style={{ height: '60px', fontSize: '15px' }}
                              >
                                <option value="1">Nam</option>
                                <option value="2"> Nữ</option>
                                <option value="3"> Khác</option>
                                <div
                                  id="val-username1-error"
                                  className="invalid-feedback animated fadeInUp mb-3"
                                  style={{ display: "block" }}
                                >
                                  {errors.district2}
                                </div>
                              </select>
                            </div>
                          </div>
                          {/* /col */}
                          <div className="col-xl-6  col-lg-6  col-md-6  col-sm-12 col-12">

                            <label>
                              Ngày sinh <span className="required">*</span>
                            </label>
                            <DatePicker
                              style={{ width: 180 }}
                              selected={birthDay}
                              onChange={(date) => setBirthDay(date)}
                              mode="date"
                              format="YYYY-MM-DD"
                              maxDate={Date.now.toString()}
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              showIcon={true}
                              customStyles={{
                                dateInput: {
                                  marginLeft: 0,
                                  borderColor: "#fff"
                                }
                              }}
                            // onDateChange={date => setFieldValue("dueDate", date)}
                            // onTouch={setFieldTouched}
                            />
                          </div>
                          {/* /col */}
                        </div>


                        <InputGroup
                          label="Số điện thoại"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          placeholder="Số điện thoại"
                          values={values.phoneNumber}
                          errors={values.errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <InputGroup
                          label="Mật khẩu"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Nhập mật khẩu..."
                          values={values.password}
                          errors={errors.password}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <button
                          disabled={isSubmitting}
                          className="bt-btn theme-btn-2 w-100"
                        >
                          Đăng ký
                        </button>
                        <div className="or-divide">
                          <span>or</span>
                        </div>
                        <Link href="/login">
                          <a className="bt-btn bt-btn-black w-100 text-center">
                            Đăng nhập
                          </a>
                        </Link>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Register;
