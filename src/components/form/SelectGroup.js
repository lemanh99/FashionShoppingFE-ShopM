import { Fragment } from "react";

const SelectGroup = ({
  handleBlur,
  handleChange,
  values,
  options,
  errors,
  name,
}) => {
  return (
    <Fragment>
      <label>
        Country <span className="required">*</span>
      </label>
      <select
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        name={name}
        className="nice-select w-100 primary-bg2 mb-20 mb-0"
      >
        <option value="">Select your country</option>
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
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

export default SelectGroup;
