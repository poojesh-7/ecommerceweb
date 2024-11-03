import "./CartPage.css";
import StoreHook from "../../customHook/StoreHook";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Notification from "../utilities/Notification";
import Loader from "../ui/Loader";
import { useEffect, useState } from "react";

const CartPage = () => {
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  const increaseQty = (id) => {
    dispatchFn("INCREASE_QTY", id);
  };
  const decreaseQty = (id) => {
    dispatchFn("DECREASE_QTY", id);
  };
  const removeFromCart = (id) => {
    dispatchFn("REMOVE_FROM_CART", id);
    dispatchFn("SET_NOTIFICATION", {
      message: "Removed from cart",
      type: "red",
      show: true,
    });
  };
  let content;
  if (load) {
    return <Loader />;
  } else {
    content = state?.cart.map((cartItem) => (
      <div key={cartItem.id} className="crt_card_cover">
        <div className="crt_card">
          <div className="crt_img_cover">
            <img
              src={cartItem.image}
              alt={cartItem.title}
              className="crt_image"
            />
          </div>
          <div className="crt_content">
            <h1 className="crt_title">{cartItem.title}</h1>
            <p>
              ₹ {Math.trunc(cartItem.price * 80 - (cartItem.price * 80) / 10)}
            </p>
          </div>
          <div className="in_de_qty">
            <button
              disabled={cartItem.qty === 3}
              onClick={increaseQty.bind(null, cartItem.id)}
            >
              +
            </button>
            <div className="crt_qty">
              <b>{cartItem.qty || 1}</b>
            </div>
            <button
              disabled={cartItem.qty === 0}
              onClick={decreaseQty.bind(null, cartItem.id)}
            >
              -
            </button>
          </div>
        </div>
        <div className="crt_btn_cover">
          <Button
            btnCont="Remove"
            size="medium"
            clickEvent={removeFromCart.bind(null, cartItem.id)}
          ></Button>
        </div>
      </div>
    ));
  }
  return (
    <div className="crt_section">
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
      {state.notiState.show && <Notification />}
      <h1>Cart</h1>
      {state.cart.length === 0 ? (
        <h1 className="no_products">No products added</h1>
      ) : (
        content
      )}
      {/* <div className="cart_back"> */}
      <Link to={`${state.login ? "/checkout" : "/login"}`}>
        <Button
          btnCont="Proceed"
          isdisabled={state.cart.length === 0}
          size="medium"
        />
      </Link>
      {/* <Link to="..">
          <Button btnCont="Back" size="medium" />
        </Link> */}
      {/* </div> */}
    </div>
  );
};

export default CartPage;
