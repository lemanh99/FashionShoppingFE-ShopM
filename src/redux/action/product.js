import { fatchData } from "../../utils/fatchData";
import { GET_PRODUCT, GET_SINGLE } from "./type";
import axiosIntance from "../../helpers/axios";
// import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  // const res = await axiosIntance.get(`/product/public/`)
  // if (res && res.status === 200) {
  //   const { data } = res.data;
  //   console.log(data);
  //   dispatch({
  //     type: GET_PRODUCT,
  //     payload: data,
  //   });
  // }else{
  //   dispatch({
  //     type: GET_PRODUCT,
  //     payload: [],
  //   });
  // }
  dispatch({
    type: GET_PRODUCT,
    payload: await fatchData("/static/product.json"),
  });

};
export const getSingleProduct = (id) => async (dispatch) => {
  const data = await fatchData("/static/product.json");
  dispatch({
    type: GET_SINGLE,
    payload: data.find((data) => data.id === Number(id)),
  });
};
