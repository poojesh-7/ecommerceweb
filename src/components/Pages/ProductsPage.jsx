import "./ProductsPage.css";

import { useEffect, useState, lazy, Suspense } from "react";
import HttpHook from "../../customHook/HttpHook";
// import ProductCard from "./ProductCard";
import Categories from "../utilities/Categories";
import SearchBar from "../utilities/Searchbar";
import { fetchProducts } from "../../customHook/Api";
import FilterHolder from "../utilities/Filter";
import Pagination from "../utilities/Pagination";
import Notification from "../utilities/Notification";
import StoreHook from "../../customHook/StoreHook";
import Loader from "../ui/Loader";
const ProductCard = lazy(() => import("././ProductCard"));

const ProductsPage = () => {
  const [userQuery, setUserQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [filterVal, setFilterVal] = useState(null);
  const [pageno, setPageNo] = useState(1);
  const state = StoreHook()[0];
  const pagination = (pageno) => {
    setPageNo(pageno);
  };
  const getUserQuery = (val) => {
    setCat("all");
    setUserQuery(val);
    setFilterVal(null);
    setPageNo(1);
  };
  const getFilterVal = (val) => {
    setFilterVal(val);
  };

  const getCategory = (cat) => {
    setCat(cat);
    setUserQuery("");
    setFilterVal(null);
    setPageNo(1);
  };
  const { status, data, error, sendReq } = HttpHook(
    fetchProducts,
    cat,
    userQuery,
    filterVal
  );
  useEffect(() => {
    sendReq();
  }, [sendReq]);
  let content;

  const totalProductsPerPage = 4;
  const firstProduct = pageno * totalProductsPerPage - totalProductsPerPage;
  const lastProduct = pageno * totalProductsPerPage;
  if (status === "pending") {
    return <Loader />;
  }
  if (data.length === 0) {
    content = <h1>No Products found</h1>;
  }
  if (data?.length !== 0) {
    let fitleredData = [...data];
    // if (userQuery === "") {
    //   fitleredData = filterByUserQuery(data, userQuery, filterVal);
    //   console.log([...filterByUserQuery(data, userQuery, filterVal)]);
    // } else {
    // }

    content = fitleredData
      ?.slice(firstProduct, lastProduct)
      .map((product) => <ProductCard key={product.id} productData={product} />);
    // const cont = data?.map((product) => product.rating.count);
    // console.log(Math.max(...cont));
    // console.log(cont);
  }
  return (
    <div className="products_page">
      <div className="discount">
        <div className="discount_sec1">
          <h1 className="discount_text">10% discount on the first order</h1>
          <button className="shop_now_btn">Shop now</button>
        </div>

        <img src="https://i.ibb.co/gMHkpHH/Frame-2.png" className="cloth_img" />
      </div>
      <Categories data={data} getCategory={getCategory} />
      <div className="search_filter">
        <SearchBar getUserQuery={getUserQuery} />
        <FilterHolder userFilterVal={getFilterVal} />
      </div>
      <div className="products_holder">
        {state.notiState.show && <Notification />}
        <Suspense fallback={<Loader />}>{content}</Suspense>
      </div>
      <Pagination
        curPage={pageno}
        pagination={pagination}
        totalNoOfITems={data?.length}
      />
    </div>
  );
};

export default ProductsPage;
