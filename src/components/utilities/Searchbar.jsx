/* eslint-disable react/prop-types */
import "./Searchbar.css";
import { useState } from "react";

const SearchBar = ({ getUserQuery }) => {
  const [query, setQuery] = useState("");
  const getQuery = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    getUserQuery(query);
  };
  return (
    <div className="searchbar_holder">
      <form onSubmit={submitHandler}>
        <input type="text" className="search_bar" onChange={getQuery} />
        <button className="search_icon_btn">
          <img
            src="https://i.ibb.co/svbn908/search-1.png"
            alt="search-1"
            border="0"
            className="search_icon"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
