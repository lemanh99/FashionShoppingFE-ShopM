import { GET_PRODUCT, GET_PRODUCT_FLASH_SELL, GET_PRODUCT_MOST_PURCHASE, GET_PRODUCT_RECOMMENDED, GET_PRODUCT_REQUEST, GET_SINGLE, GET_SINGLE_REQUEST } from "../action/type";

const initState = {
  products: [],
  loading: false,
  loading_single: false,
};

const product = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case GET_SINGLE_REQUEST:
      return {
        ...state,
        loading_single:true,
      };
    case GET_SINGLE:
      return {
        ...state,
        loading_single:false,
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
