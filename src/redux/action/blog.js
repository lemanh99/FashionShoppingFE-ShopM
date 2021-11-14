import { fatchData } from "../../utils/fatchData";
import { GET_BLOG, GET_SINGLE_BLOG, NEXT_POST, PREV_POST } from "./type";

export const getBlog = () => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: GET_BLOG,
    payload: data,
  });
};

export const getSingleBlog = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: GET_SINGLE_BLOG,
    payload: {
      single: data.find((d) => Number(d.id) === Number(id)),
      blogs: data,
    },
  });
};

export const nextPost = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: NEXT_POST,
    payload: data.find((d) => Number(d.id) === Number(id)),
  });
};
export const prevPost = (id) => async (dispatch) => {
  const data = await fatchData("/static/blog.json");
  dispatch({
    type: PREV_POST,
    payload: data.find((d) => Number(d.id) === Number(id)),
  });
};
