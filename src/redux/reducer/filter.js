import { updateState } from "../../utils/utils";
import {
  FILTER_BRAND,
  FILTER_CATAGORY,
  FILTER_COLOR,
  FILTER_NAME,
  FILTER_PRICE,
  FILTER_SIZE,
  FILTER_TAG,
} from "../action/type";

const initialState = {
  search: "",
  price: { min: 0, max: 200 },
  brand: [],
  size: [],
  colors: [],
  tags: [],
  category: [],
};

const filter = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FILTER_NAME:
      return {
        ...state,
        search: payload,
      };
    case FILTER_BRAND:
      return {
        ...state,
        brand: updateState(state.brand, payload),
      };
    case FILTER_CATAGORY:
      return {
        ...state,
        category: updateState(state.category, payload),
      };
    case FILTER_SIZE:
      return {
        ...state,
        size: updateState(state.size, payload),
      };
    case FILTER_COLOR:
      return {
        ...state,
        colors: updateState(state.colors, payload),
      };
    case FILTER_TAG:
      return {
        ...state,
        tags: updateState(state.tags, payload),
      };
    case FILTER_PRICE:
      return {
        ...state,
        price: payload,
      };

    default:
      return state;
  }
};

export default filter;
