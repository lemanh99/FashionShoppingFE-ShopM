import { Fragment } from "react";

const InputGroup = ({
  label,
  handleChange,
  handleBlur,
  values,
  errors,
  placeholder,
  id,
  type,
  name,
}) => {
  return (
    <Fragment>
      <label htmlFor={id}>
        {label} <span className="required">*</span>
      </label>
      <input
        id={id}
        type={type ? type : "text"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        placeholder={placeholder}
        className="form-control primary-bg2 border-gray mb-0"
      />
      <div
        id="val-username1-error"
        className="invalid-feedback animated fadeInUp mb-3"
        style={{ display: "block" }}
      >
        {errors && errors}
      </div>
    </Fragment>
  );
};

export default InputGroup;
