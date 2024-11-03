import { Link } from "react-router-dom";
import StoreHook from "../../customHook/StoreHook";
import Button from "../ui/Button";
import "./SummaryPage.css";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
const SummaryPage = () => {
  const [load, setLoad] = useState(true);
  const state = StoreHook()[0];
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);
  let totalCost;
  let content;
  if (load) {
    return <Loader />;
  } else {
    content = state.cart.map((cartItem) => (
      <div key={cartItem.id} className="product_summary_card">
        <h4 className="final_title">{cartItem.title}</h4>
        {/* <b> */}
        <h5 className="final_price">
          ₹ {Math.trunc(cartItem.price * 80 - (cartItem.price * 80) / 10)}
        </h5>
        <h5 className="final_qty">Quantity : {cartItem.qty}</h5>
        {/* </b> */}
      </div>
    ));
    totalCost = state.cart.reduce(
      (acc, cur) =>
        Math.trunc(cur.price * 80 - (cur.price * 80) / 10) * cur.qty + acc,
      0
    );
  }
  return (
    <div className="summary_page">
      <Link to="/">
        <Button size="medium" custStyle="back_btn">
          <img
            className="nav_back_img"
            src="https://i.ibb.co/JcQ2wkX/backward.png"
            alt="backward"
            border="0"
          />
        </Button>
      </Link>
      <h1>Summary</h1>
      <h2>Products</h2>
      {content}
      <h3>Total: ₹ {totalCost}</h3>
      <hr size="5"></hr>
      <h2>Payment Method</h2>
      <div className="pay_btns">
        <button className="pay_button">Cash on delivery</button>
        <button className="pay_button">UPI</button>
        <button className="pay_button">Card</button>
      </div>
      <Button btnCont="Place order" size="large" />
    </div>
  );
};

export default SummaryPage;
