import {
  BRAND,
  CATEGORY_1,
  CATEGORY_2,
  CATEGORY_3,
  CATEGORY_4,
  HOME_1,
  HOME_2,
  HOME_3,
  HOME_4,
  HOME_5,
  TESTIMONIAL,
} from "../action/type";

const home = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_1:
      return {
        ...state,
        home1: payload,
      };
    case HOME_2:
      return {
        ...state,
        home2: payload,
      };
    case HOME_3:
      return {
        ...state,
        home3: payload,
      };
    case HOME_4:
      return {
        ...state,
        home4: payload,
      };
    case HOME_5:
      return {
        ...state,
        home5: payload,
      };
    case BRAND:
      return {
        ...state,
        brand: payload,
      };
    case TESTIMONIAL:
      return {
        ...state,
        testimonial: payload,
      };
    case CATEGORY_1:
      return {
        ...state,
        category_1: payload.category1,
      };
    case CATEGORY_2:
      return {
        ...state,
        category_2: payload.category2,
      };
    case CATEGORY_3:
        return {
          ...state,
          category_3: payload,
        };

    case CATEGORY_4:
        return {
          ...state,
          category_4: payload,
        };
    default:
      return state;
  }
};
export default home;
