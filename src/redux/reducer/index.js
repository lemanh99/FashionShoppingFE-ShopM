import { combineReducers } from "redux";
import blog from "./blog";
import filter from "./filter";
import home from "./home";
import product from "./product";
import utilis from "./utilis";

export default combineReducers({
  blog,
  product,
  filter,
  home,
  utilis,
});
