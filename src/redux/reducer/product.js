import { GET_PRODUCT, GET_SINGLE } from "../action/type";

const product = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case GET_SINGLE:
      return {
        ...state,
        singleProduct: payload,
      };

    default:
      return state;
  }
};
export default product;
