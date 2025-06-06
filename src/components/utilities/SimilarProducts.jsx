/* eslint-disable react/prop-types */
import "./SimilarProducts.css";
import { useEffect } from "react";
import { fetchSingleProduct } from "../../customHook/Api";
import HttpHook from "../../customHook/HttpHook";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
const SimilarProducts = ({ id }) => {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const { status, data, error, sendReq } = HttpHook(fetchSingleProduct, id);
  useEffect(() => {
    // setTimeout(() => {
    sendReq();
    // }, 2000);
  }, [sendReq]);
  // let suggestedProducts = [];
  let content;
  if (status === "pending") {
    return <p>loading .. .. .. ..</p>;
  }
  if (data !== null) {
    const suggestedProducts = [data];
    // .filter((product) => product.title !== productTitle)
    // .slice(0, 2);
    content = suggestedProducts.map((product) => (
      <div key={product.id} className="sp_card">
        <img src={product.image} className="sp_img" />
        <div className="sp_content">
          <p className="sp_title">{product.title}</p>
          <p>₹{Math.trunc(product.price * 80)}</p>
          <Link to={"/" + product.id}>
            <Button clickEvent={moveToTop} btnCont="View" size="small" />
          </Link>
        </div>
      </div>
    ));
  }
  return (
    <>
      {status === "pending" ? (
        <p>load</p>
      ) : (
        <div className="similar_products">
          <h2>Similar Products</h2>

          {content}
        </div>
      )}
    </>
  );
};

export default SimilarProducts;
