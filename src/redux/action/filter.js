import {
  FILTER_BRAND,
  FILTER_CATAGORY,
  FILTER_COLOR,
  FILTER_NAME,
  FILTER_PRICE,
  FILTER_SIZE,
  FILTER_TAG,
} from "./type";

export const filterByName = (value) => (dispatch) => {
  dispatch({
    type: FILTER_NAME,
    payload: value,
  });
};

export const filterByBrand = (value) => (dispatch) => {
  dispatch({
    type: FILTER_BRAND,
    payload: value,
  });
};

export const filterByCatagory = (value) => (dispatch) => {
  dispatch({
    type: FILTER_CATAGORY,
    payload: value,
  });
};
export const filterBySize = (value) => (dispatch) => {
  dispatch({
    type: FILTER_SIZE,
    payload: value,
  });
};

export const filterByPrice = (value) => (dispatch) => {
  dispatch({
    type: FILTER_PRICE,
    payload: value,
  });
};

export const filterByColor = (value) => (dispatch) => {
  dispatch({ type: FILTER_COLOR, payload: value });
};
export const filterByTags = (value) => (dispatch) => {
  dispatch({ type: FILTER_TAG, payload: value });
};
