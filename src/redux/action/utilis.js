import { getLocalStorage } from "../../utils/localstorage";
import {
  ADD_TO_CART,
  ADD_WISHLIST,
  CHECKOUT_USER,
  COMPARE,
  DECREASE_CART,
  GET_CARTS,
  GET_COMPARE,
  GET_WISHLIST,
  REMOVE_CART,
  REMOVE_COMPARE,
} from "./type";

export const getCarts = () => (dispatch) => {
  dispatch({
    type: GET_CARTS,
    payload: getLocalStorage("shopm-ecommerce"),
  });
};

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};

export const removeCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: id,
  });
};

export const decreaseCart = (product) => (dispatch) => {
  dispatch({
    type: DECREASE_CART,
    payload: product,
  });
};

export const addWishlist = (product) => (dispatch) => {
  dispatch({
    type: ADD_WISHLIST,
    payload: product,
  });
};

export const getWishlist = () => (dispatch) => {
  dispatch({
    type: GET_WISHLIST,
    payload: getLocalStorage("shopm-wishlist"),
  });
};
export const getCompare = () => (dispatch) => {
  dispatch({
    type: GET_COMPARE,
    payload: getLocalStorage("shopm-compares"),
  });
};

export const compare = (product) => (dispatch) => {
  dispatch({
    type: COMPARE,
    payload: product,
  });
};
export const removeCompare = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_COMPARE,
    payload: product,
  });
};

export const setCheckoutData = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_USER,
    payload: data,
  });
};
