import { GET_BLOG, GET_SINGLE_BLOG } from "../action/type";

const blog = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG:
      return {
        ...state,
        blogs: payload,
      };
    case GET_SINGLE_BLOG:
      return {
        ...state,
        singleBlog: payload.single,
        blogs: payload.blogs,
      };
    default:
      return state;
  }
};
export default blog;
