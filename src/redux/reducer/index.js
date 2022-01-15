import { combineReducers } from "redux";
import blog from "./blog";
import filter from "./filter";
import home from "./home";
import product from "./product";
import utilis from "./utilis";
import auth from "./auth";
import order from "./order";
import rate from "./rate";
import user from "./user";
import notification from "./notification";

export default combineReducers({
  auth,
  blog,
  product,
  filter,
  home,
  utilis,
  order,
  rate,
  user,
  notification,
});
