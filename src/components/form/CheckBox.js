const CheckBox = ({
  errors,
  handleBlur,
  handleChange,
  values,
  name,
  label,
  extraOff,
}) => {
  return (
    <div className="login-action mb-20 fix">
      <span className="log-rem f-left">
        <input
          id="remember"
          type="checkbox"
          name={name ? name : "tandc"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values}
          className="mb-0"
        />

        <label htmlFor="remember" className="mb-0">
          {label ? label : "Remember me!"}
        </label>
        <div
          id="val-username1-error"
          className="invalid-feedback animated fadeInUp"
          style={{ display: "block" }}
        >
          {errors && errors}
        </div>
      </span>

      <span className="forgot-login f-right">
        <a href="#">Lost your password?</a>
      </span>
    </div>
  );
};

export default CheckBox;
