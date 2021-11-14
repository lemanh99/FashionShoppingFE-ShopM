import { fatchData } from "../../utils/fatchData";
import { GET_PRODUCT, GET_SINGLE } from "./type";

export const getProducts = () => async (dispatch) => {
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
