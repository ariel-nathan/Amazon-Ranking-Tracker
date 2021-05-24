const base_url = "https://amazon-rankings-fetcher.herokuapp.com/";

export const fetchItemsURL = `${base_url}items`;

export const fetchLatestItemsURL = `${base_url}items-latest`;

export const fetchOneItemURL = (asin) => `${base_url}items/${asin}`;
