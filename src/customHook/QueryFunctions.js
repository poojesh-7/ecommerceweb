export const filterByUserQuery = (array, query, filter = null) => {
  const queryVal = query?.trim().toLowerCase();

  let searchResults = [];
  // const menPattern = /men|male/i;
  // const womenPattern = /women|female/i;
  const menPattern = /\b(men|man|male)\b/i;
  const womenPattern = /\b(women|woman|female)\b/i;
  if (queryVal !== "") {
    if (menPattern.test(queryVal)) {
      searchResults = array.filter((item) => menPattern.test(item.category));
    } else if (womenPattern.test(queryVal)) {
      searchResults = array.filter((item) => womenPattern.test(item.category));
    } else if (!menPattern.test(queryVal) || !womenPattern.test(queryVal)) {
      searchResults = [...array].filter((product) => {
        if (product.category?.includes(queryVal)) {
          return product;
        }
        if (product.title?.toLowerCase().includes(queryVal)) {
          return product;
        }
        // if (product.description?.toLowerCase().includes(queryVal)) {
        //   return product;
        // }
      });
    } else {
      searchResults = "no product";
    }
  } else {
    searchResults = array;
  }
  if (filter !== null) {
    if (filter.name === "High to low") {
      searchResults = searchResults.sort((a, b) => b.price - a.price);
    } else if (filter.name === "Low to high") {
      searchResults = searchResults.sort((a, b) => a.price - b.price);
    } else if (filter.name === "3 to 4") {
      searchResults = searchResults.filter(
        (item) => item.rating.rate > 3 && item.rating.rate < 4
      );
    } else if (filter.name === "Above 4") {
      searchResults = searchResults.filter((item) => item.rating.rate > 4);
    }
  }
  //   switch (filter.name) {
  //     case "High to low":
  //       searchResults = [...searchResults].sort(function (a, b) {
  //         let price1 = +a.price;
  //         let price2 = +b.price;
  //         if (price1 > price2) return 1;
  //       });
  //       break;
  //     case "Low to high":
  //       searchResults = [...searchResults].sort(function (a, b) {
  //         let price1 = +a.price;
  //         let price2 = +b.price;
  //         if (price1 > price2) return 1;
  //       });
  //       break;
  //     default:
  //       searchResults;
  //   }
  return searchResults;
};
