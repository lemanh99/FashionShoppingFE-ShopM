import { updateCart } from "../../utils/filterProduct";
import { setLocalStorage } from "../../utils/localstorage";
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
  REMOVE_CART_ALL,
  REMOVE_COMPARE,
} from "../action/type";

const initialState = {
  carts: [],
  compares: [],
  wishlist: [],
  checkoutData: null,
};
const utilis = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CARTS:
      return {
        ...state,
        carts: payload,
      };
    case ADD_TO_CART:
      return updateCart(state, payload, "+");
    case DECREASE_CART:
      return updateCart(state, payload, "-");
    case REMOVE_CART_ALL:
      setLocalStorage("shopm-ecommerce", []);
      return {
        ...state,
        carts: []
      }
    case REMOVE_CART:
      const removeItem = state.carts.filter((cart) => (cart.product_sku_id !== payload));
      setLocalStorage("shopm-ecommerce", removeItem);
      return {
        ...state,
        carts: removeItem,
      };
    case ADD_WISHLIST:
      const wishlist = state.wishlist.find(
        (wishlist) => wishlist.id === payload.id
      )
        ? state.wishlist.filter((wishlist) => wishlist.id !== payload.id)
        : [...state.wishlist, payload];
      setLocalStorage("shopm-wishlist", wishlist);
      return {
        ...state,
        wishlist: wishlist,
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: payload,
      };
    case GET_COMPARE:
      return {
        ...state,
        compares: payload,
      };

    case COMPARE:
      const compare = state.compares.find(
        (compares) => compares.id === payload.id
      )
        ? state.compares.filter((compares) => compares.id !== payload.id)
        : [...state.compares, payload];
      setLocalStorage("shopm-compares", compare);
      return {
        ...state,
        compares: compare,
      };
    case REMOVE_COMPARE:
      const compareremove = state.compares.filter(
        (compare) => compare.id !== payload.id
      );
      setLocalStorage("shopm-compares", compareremove);
      return {
        ...state,
        compares: compareremove,
      };

    case CHECKOUT_USER:
      return {
        ...state,
        checkoutData: payload,
      };

    default:
      return state;
  }
};
export default utilis;
