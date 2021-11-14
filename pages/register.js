import { Formik } from "formik";
import Link from "next/link";
import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { registerSchema } from "../src/utils/yupModal";

const Register = () => {
  return (
    <Layout>
      <main>
        <PageBanner title="Register" pageName="Register" />
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Signup From Here</h3>
                  <Formik
                    initialValues={registerSchema.initialValue}
                    validationSchema={registerSchema.schema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
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
                          label="Username"
                          id="username"
                          name="username"
                          type="string"
                          placeholder="Enter Username ..."
                          values={values.username}
                          errors={errors.username}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <InputGroup
                          label="Email Address"
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
                          label="Password"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter password..."
                          values={values.password}
                          errors={errors.password}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <button
                          disabled={isSubmitting}
                          className="bt-btn theme-btn-2 w-100"
                        >
                          Register Now
                        </button>
                        <div className="or-divide">
                          <span>or</span>
                        </div>
                        <Link href="/login">
                          <a className="bt-btn bt-btn-black w-100 text-center">
                            Login Now
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
