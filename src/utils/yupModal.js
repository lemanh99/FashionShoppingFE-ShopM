import * as Yup from "yup";

const username = Yup.string()
  .min(3, "Your username must consist of at least 3 characters ")
  .max(50, "Your username must consist of at least 3 characters ")
  .required("Please enter a username"),
  password = Yup.string()
    .min(5, "Mật khẩu có ít nhất có 5 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    // .matches(/[a-z1-9]/, 'Mật khẩu phải có chữ và số')
    .required("Bạn cần nhập password"),
  repassword = Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  email = Yup.string().email().required("Please provide your email"),
  tandc = Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  phoneNumber = Yup.number().required("Please provide your phone"),
  country = Yup.string().required("Please provide your country name"),
  province = Yup.string().required("Please provide your province name"),
  district = Yup.string().required("Please provide your district name"),
  wards = Yup.string().required("Please provide your wards name"),
  street = Yup.string().required("Please provide your street name"),
  firstName = Yup.string().required("Please provide your first name"),
  lastName = Yup.string().required("Please provide your last name"),

  defferentAddress = Yup.boolean(),
  firstName2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your frist name"),
  }),
  lastName2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your last name"),
  }),
  phoneNumber2 =  Yup.number().when("defferentAddress", {
    is: true,
    then: Yup.number().required("Please provide your phone"),
  }),
  province2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your province name"),
  }),
  district2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your district name"),
  }),
  wards2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your address"),
  }),
  street2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your street name"),
  }),
  address2 = Yup.string().when("defferentAddress", {
    is: true,
    then: Yup.string().required("Please provide your wards name"),
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
  }),
  initialValue: { email: "", password: "" },
};

export const registerSchema = {
  schema: Yup.object().shape({
    firstName,
    lastName,
    phoneNumber,
    password,
    email,
  }),
  initialValue: { password: "", email: "", firstName: "", lastName: "", phoneNumber: "" },
};

export const checkoutSchema = {
  schema: Yup.object().shape({
    province,
    district,
    wards,
    street,
    firstName,
    lastName,
    email,
    phoneNumber,
    province2,
    district2,
    wards2,
    street2,
    firstName2,
    lastName2,
    email2,
    phoneNumber2,
    defferentAddress,
  }),
  initialValue: {
    province:"",
    district:"",
    wards:"",
    street:"",
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    province2:"",
    district2:"",
    wards2:"",
    street2:"",
    firstName2:"",
    lastName2:"",
    email2:"",
    phoneNumber2:"",
    defferentAddress: false,
  },
};

export const couponSchema = {
  schema: Yup.object().shape({
    coupon,
  }),
  initialValue: { coupon: "" },
};

export const addressSchema = {
  schema: Yup.object().shape({
    province,
    district,
    wards,
    street,
    firstName,
    lastName,
    email,
    phoneNumber,
  }),
  initialValue: {
    province:"",
    district:"",
    wards:"",
    street:"",
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
  },
};

export const passwordShema = {
  schema: Yup.object().shape({
    password,
    repassword,
  }),
  initialValue: {
    password:"",
    repassword:"",
  },
};