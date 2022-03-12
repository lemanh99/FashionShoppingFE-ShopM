import { fatchData } from "../../utils/fatchData";
import { GET_PRODUCT, GET_PRODUCT_FLASH_SELL, GET_PRODUCT_MOST_PURCHASE, GET_PRODUCT_RECOMMENDED, GET_PRODUCT_REQUEST, GET_SINGLE, GET_SINGLE_REQUEST } from "./type";
import axiosIntance from "../../helpers/axios";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });
  const res = await axiosIntance.get(`/product/public/?page=${1}&record_limit=12000`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT,
      payload: [],
    });
  }
};
export const getProductFilterByApi = (filters) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });
  const page = filters && filters.page?filters.page:1;
  const category_name = filters && filters.category_name?filters.category_name:"";
  const search_keyword = filters && filters.search_keyword?filters.search_keyword:"";
  const color_name = filters && filters.color_name?filters.color_name:"";
  const size_name = filters && filters.size_name?filters.size_name:"";
  const tag = filters && filters.tag?filters.tag:"";
  const res = await axiosIntance.get(`/product/public/?category_name=${category_name}&search_keyword=${search_keyword}&color_name=${color_name}&size_name=${size_name}&tag=${tag}&page=${page}&record_limit=12000`)
  if (res && res.status === 200) {
    const { data } = res.data;
    console.log(data);
    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT,
      payload: [],
    });
  }
};
export const getProductByParams = (query, page) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });
  const page_number = page?page:1
  const res = await axiosIntance.get(`/product/public/${query}&page=${page_number}&record_limit=12000`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT,
      payload: [],
    });
  }
};
export const getSingleProduct = (id) => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/detail/${id}`);

  const { data } = res.data;
  if (res && res.status === 200) {
    dispatch({
      type: GET_SINGLE,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_SINGLE,
      payload: {},
    });
  }

};

export const getSingleProductBySlug = (slug) => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/detail/slug/${slug}`);
  dispatch({
    type: GET_SINGLE_REQUEST
  });
  const { data } = res.data;
  if (res && res.status === 200) {
    dispatch({
      type: GET_SINGLE,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_SINGLE,
      payload: {},
    });
  }

};


export const getProductRecommend = () => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/recommend`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT_RECOMMENDED,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT_RECOMMENDED,
      payload: [],
    });
  }
};

export const getProductFlashSell = () => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/flash-sell`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT_FLASH_SELL,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT_FLASH_SELL,
      payload: [],
    });
  }
};

export const getProductMostPurchase = () => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/most-buy`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT_MOST_PURCHASE,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PRODUCT_MOST_PURCHASE,
      payload: [],
    });
  }
};

