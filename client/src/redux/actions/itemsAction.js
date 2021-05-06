import axios from "axios";
import { FETCH_ITEMS } from "../actionTypes";
import { fetchItemsURL, fetchLatestItemsURL } from "../../api";

export const getItems = () => async (dispatch) => {
  const itemsData = await axios.get(fetchItemsURL);
  const latestItemsData = await axios.get(fetchLatestItemsURL);

  dispatch({
    type: FETCH_ITEMS,
    payload: {
      latestItems: latestItemsData.data,
      allItems: itemsData.data,
    },
  });
};
