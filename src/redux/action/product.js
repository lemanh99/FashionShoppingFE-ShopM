import { fatchData } from "../../utils/fatchData";
import { GET_PRODUCT, GET_SINGLE } from "./type";
import axiosIntance from "../../helpers/axios";

export const getProducts = () => async (dispatch) => {
  const res = await axiosIntance.get(`/product/public/`)
  if (res && res.status === 200) {
    const { data } = res.data;
    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  }else{
    dispatch({
      type: GET_PRODUCT,
      payload: [],
    });
  }

};
export const getSingleProduct = (id) => async (dispatch) => {
  const data = await fatchData("/static/product.json");
  dispatch({
    type: GET_SINGLE,
    payload: data.find((data) => data.id === Number(id)),
  });
};
