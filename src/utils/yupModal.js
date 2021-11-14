import * as Yup from "yup";

const username = Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password = Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
  email = Yup.string().email().required("Please provide your email"),
  tandc = Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  country = Yup.string().required("Please provide your country name"),
  fName = Yup.string().required("Please provide your first name"),
  lName = Yup.string().required("Please provide your last name"),
  cName = Yup.string().required("Please provide your company name"),
  address = Yup.string().required("Please provide your address"),
  city = Yup.string().required("Please provide your city"),
  state = Yup.string().required("Please provide your state"),
  zip = Yup.string().required("Please provide your zip"),
  phone = Yup.number().required("Please provide your phone"),
  defferentAddress = Yup.boolean(),
  country2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your country name"),
  }),
  fName2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your frist name"),
  }),
  lName2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your last name"),
  }),
  cName2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your company name"),
  }),
  address2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your address"),
  }),
  city2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your city"),
  }),
  state2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your seate name"),
  }),
  zip2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your zip code"),
  }),
  phone2 = Yup.number().when("defferentAddress", {
    is: true,
    then: Yup.number().required("Please provide your number"),
  }),
  email2 = Yup.string()
    .email()
    .when("defferentAddress", {
      is: true,
      then: Yup.string().email().required("Please provide your email"),
    }),
  createAccount = Yup.boolean(),
  password2 = Yup.string().when("createAccount", {
    is: true,
    then: Yup.string()
      .min(5, "Your password must be at least 5 characters long")
      .max(50, "Your password must be at least 5 characters long")
      .required("Please provide a password"),
  }),
  coupon = Yup.string().required("Please provide your coupon code");

export const loginSchema = {
  schema: Yup.object().shape({
    email,
    password,
    tandc,
  }),
  initialValue: { email: "", password: "", tandc: false },
};

export const registerSchema = {
  schema: Yup.object().shape({
    username,
    password,
    email,
  }),
  initialValue: { username: "", password: "", email: "" },
};

export const checkoutSchema = {
  schema: Yup.object().shape({
    country,
    fName,
    lName,
    address,
    state,
    country,
    cName,
    email,
    city,
    zip,
    phone,
    country2,
    fName2,
    lName2,
    address2,
    state2,
    country2,
    cName2,
    city2,
    zip2,
    phone2,
    email2,
    defferentAddress,
    createAccount,
    password2,
  }),
  initialValue: {
    country: "",
    fName: "",
    lName: "",
    address: "",
    state: "",
    country: "",
    cName: "",
    city: "",
    zip: "",
    phone: "",
    country2: "",
    fName2: "",
    lName2: "",
    address2: "",
    state2: "",
    country2: "",
    cName2: "",
    city2: "",
    zip2: "",
    phone2: "",
    email: "",
    email2: "",
    defferentAddress: false,
    createAccount: false,
  },
};

export const couponSchema = {
  schema: Yup.object().shape({
    coupon,
  }),
  initialValue: { coupon: "" },
};
