import { GET_PRODUCT, GET_PRODUCT_FLASH_SELL, GET_PRODUCT_MOST_PURCHASE, GET_PRODUCT_RECOMMENDED, GET_SINGLE } from "../action/type";

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
    case GET_PRODUCT_RECOMMENDED:
      return {
        ...state,
        recommended: payload,
      };

    case GET_PRODUCT_FLASH_SELL:
      return {
        ...state,
        flash_sell: payload,
      };

    case GET_PRODUCT_MOST_PURCHASE:
      return {
        ...state,
        most_purchase: payload,
      };
    default:
      return state;
  }
};
export default product;
