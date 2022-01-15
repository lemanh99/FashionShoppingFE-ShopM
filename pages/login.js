import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import { getPrevPath } from "../src/helpers/path";
import withoutAuth from "../src/HOC/withoutAuth";
import withoutAuthNotPath from "../src/HOC/withoutAuthNotPath";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { login } from "../src/redux/action/auth";
import { loginSchema } from "../src/utils/yupModal";

const Login = () => {
  const Router = useRouter();
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const dispatch = useDispatch();
  const submit = (users) => {
    const user = {
      username: users.email,
      password: users.password,
    };
    dispatch(login(user));
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (auth.authenticate && token) {
      Router.push("/")
      // const prevPath = getPrevPath()
      // if (prevPath && prevPath !== "null") {
      //   Router.push(`${prevPath}`)
      // } else {
      //   Router.push("/")
      // }
    }

  }, [auth])

  return (
    <Layout sticky textCenter footerBg container>
      <main>
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Đăng nhập tài khoản</h3>
                  <Formik
                    initialValues={loginSchema.initialValue}
                    validationSchema={loginSchema.schema}
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
                          placeholder="Nhập địa chỉ email"
                          values={values.email}
                          errors={errors.email}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <InputGroup
                          label="Mật khẩu"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Nhập mật khẩu"
                          values={values.password}
                          errors={errors.password}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <div className="login-action mb-20 fix ">
                          <span className="log-rem f-left">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember">Ghi nhớ tài khoản!</label>
                          </span>
                          <span className="forgot-login f-right ms-1">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Quên mật khẩu?
                            </a>
                          </span>
                        </div>

                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="bt-btn theme-btn-2 w-100"
                        >
                          Đăng nhập
                        </button>
                        <div className="or-divide">
                          <span>or</span>
                        </div>
                        <Link href="/register">
                          <a className="bt-btn bt-btn-black w-100 text-center">
                            Đăng ký tài khoản
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

export default withoutAuthNotPath(Login);
