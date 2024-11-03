/* eslint-disable react/prop-types */
import "./ProductCard.css";
import Button from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import StoreHook from "../../customHook/StoreHook.jsx";
// import Notification from "../utilities/Notification.jsx";
const ProductCard = ({ productData }) => {
  const dispatchFn = StoreHook(false)[1];
  const state = StoreHook()[0];
  const addToCart = (item) => {
    dispatchFn("ADD_TO_CART", { ...item, qty: 1 });
    dispatchFn("SET_NOTIFICATION", {
      message: "Added to cart",
      type: "green",
      show: true,
    });
  };
  let isInCart = state?.cart.findIndex(
    (cartItem) => cartItem.id === productData.id
  );
  return (
    <div key={productData.id} className="product_card">
      <div className="pc_img_cover">
        <img src={productData.image} className="pc_img" />
      </div>
      <div className="pc_content">
        <div className="title_rating">
          <h1 className="pc_title">{productData.title}</h1>
          <p className="pc_rating">
            <b>{productData.rating.rate}</b>
            <img
              src="https://i.ibb.co/b1Xgj7W/star.png"
              alt="star"
              className="pc_star"
            />
          </p>
        </div>
        <h2 className="pc_price">
          ₹ {Math.trunc(productData.price * 80 - (productData.price * 80) / 10)}
        </h2>
        <p style={{ color: "green", fontWeight: "bold" }}>In Stock</p>
        <div className="pc_btn_holder">
          <Link to={"/" + productData.id}>
            <Button btnCont="View" size="medium" />
          </Link>
          <Button
            clickEvent={addToCart.bind(null, productData)}
            isdisabled={isInCart !== -1 ? true : false}
            btnCont={isInCart !== -1 ? "Added to cart" : "Add to cart"}
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
