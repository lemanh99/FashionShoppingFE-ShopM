import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { signup } from "../src/redux/action/auth";
import { registerSchema } from "../src/utils/yupModal";

const Register = () => {
  const Router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const submit = (users) => {
    const user = {
      first_name: users.firstName,
      last_name: users.lastName,
      phone_number: users.phoneNumber,
      email: users.email,
      password: users.password,
    };
    dispatch(signup(user));
  }
  useEffect(() => {
    if (auth.register) {
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
                  <h3 className="text-center mb-60">Đăng ký tài khoản</h3>
                  <Formik
                    initialValues={registerSchema.initialValue}
                    validationSchema={registerSchema.schema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        submit(values);
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
                        <InputGroup
                          label="Số điện thoại"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="number"
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
