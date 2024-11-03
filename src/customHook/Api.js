import { filterByUserQuery } from "./QueryFunctions";
export const fetchProducts = async (cat, query, filter) => {
  let urlParam = cat === "all" ? "" : "/category/" + cat;

  const res = await fetch("https://fakestoreapi.com/products" + urlParam);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  let transformedData = [];
  if (!query || !filter) {
    transformedData = filterByUserQuery(data, query, filter);
  } else {
    transformedData = [...data];
  }

  return transformedData;
};

export const fetchSingleProduct = async (id) => {
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  const transformedData = {
    ...data,
    isFav: false,
    isInCart: false,
    qty: 1,
  };

  return transformedData;
};
