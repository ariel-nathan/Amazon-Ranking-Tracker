import axios from "axios";
import { FETCH_ONE_ITEM, LOADING_ITEM } from "../actionTypes";
import { fetchOneItemURL } from "../../api";

export const loadDetail = (asin) => async (dispatch) => {
  dispatch({ type: LOADING_ITEM });

  const itemData = await axios.get(fetchOneItemURL(asin));

  dispatch({
    type: FETCH_ONE_ITEM,
    payload: {
      item: itemData,
    },
  });
};
