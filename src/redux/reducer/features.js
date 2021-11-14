import { GET_FEATURES } from "../action/type";

const features = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FEATURES:
      return payload;

    default:
      return state;
  }
};
export default features;
