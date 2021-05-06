import { combineReducers } from "redux";

import itemsReducer from "./itemsReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  item: itemReducer,
});

export default rootReducer;
