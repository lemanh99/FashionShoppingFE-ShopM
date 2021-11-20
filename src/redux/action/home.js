import axiosIntance from "../../helpers/axios";
import { fatchData } from "../../utils/fatchData";
import {
  BRAND,
  CATEGORY_1,
  CATEGORY_2,
  CATEGORY_3,
  HOME_1,
  HOME_2,
  HOME_3,
  TESTIMONIAL,
} from "./type";

export const getHome1 = () => async (dispatch) => {
  dispatch({
    type: HOME_1,
    payload: await fatchData("/static/home1.json"),
  });
};

export const getHome2 = () => async (dispatch) => {
  dispatch({
    type: HOME_2,
    payload: await fatchData("/static/home2.json"),
  });
};

export const getHome3 = () => async (dispath) => {
  dispath({ type: HOME_3, payload: await fatchData("/static/home3.json") });
};

export const getBrand = () => async (dispatch) => {
  dispatch({
    type: BRAND,
    payload: await fatchData("/static/brand.json"),
  });
};
export const getTestimonial = () => async (dispatch) => {
  dispatch({
    type: TESTIMONIAL,
    payload: await fatchData("/static/testimonial.json"),
  });
};
export const getCategory_1 = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_1,
    payload: await fatchData("/static/catagory.json"),
  });
};
export const getCategory_2 = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_2,
    payload: await fatchData("/static/catagory.json"),
  });
};

export const getCategory_3 = () => async (dispatch) => {
  const res = await axiosIntance.get(`/product/category/public/`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: CATEGORY_3,
      payload: data,
    });
  } else {
    dispatch({
      type: CATEGORY_3,
      payload: [],
    });
  }
  // dispatch({
  //   type: CATEGORY_2,
  //   payload: await fatchData("/static/catagory.json"),
  // });
};
