import { FETCH_ONE_ITEM, LOADING_ITEM } from "../actionTypes";

const initState = {
  item: {},
  isLoading: true,
};

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case FETCH_ONE_ITEM:
      return {
        ...state,
        item: action.payload.item,
        isLoading: false,
      };
    case LOADING_ITEM:
      return {
        ...state,
        isLoading: true,
      };
  }
};

export default itemReducer;
