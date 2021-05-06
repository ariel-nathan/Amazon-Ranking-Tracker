import { FETCH_ITEMS } from "../actionTypes";

const initState = {
  latestItems: [],
  allItems: [],
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case FETCH_ITEMS:
      return {
        ...state,
        latestItems: action.payload.latestItems,
        allItems: action.payload.allItems,
      };
  }
};

export default itemsReducer;
