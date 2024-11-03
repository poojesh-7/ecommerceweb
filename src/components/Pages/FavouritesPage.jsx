import "./FavouritesPage.css";
import StoreHook from "../../customHook/StoreHook";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import Notification from "../utilities/Notification";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";

const DateFormatter = (date) => {
  const isoDate = new Date(date);
  const formattedDate = `${isoDate.getUTCDate()}-${
    isoDate.getMonth() + 1
  }-${isoDate.getFullYear()}`;
  return formattedDate;
};
const FavouritesPage = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);
  const [state, dispatchFn] = StoreHook();

  const removeFromFavs = (id) => {
    dispatchFn("REMOVE_FROM_FAV", id);
    dispatchFn("SET_NOTIFICATION", {
      message: "Removed from Favorites",
      type: "red",
      show: true,
    });
  };

  const addToCart = (item) => {
    dispatchFn("ADD_TO_CART", {
      ...item,
      isFav: false,
      isInCart: true,
      date: new Date(),
    });
    dispatchFn("REMOVE_FROM_FAV", item.id);
    dispatchFn("SET_NOTIFICATION", {
      message: "Added to cart",
      type: "green",
      show: true,
    });
  };

  let content;

  if (load) {
    return <Loader />;
  } else {
    content =
      state.fav.length === 0 ? (
        <h1 className="no_products">No Products</h1>
      ) : (
        state.fav.map((item) => (
          <div className="fp_card_cover" key={item.id}>
            <div className="fp_card">
              <div className="fp_img_cover">
                <img src={item.image} className="fp_img" />
              </div>
              <div className="fp_content">
                <h2 className="fp_title">{item.title}</h2>
                <p className="fp_price">
                  ₹ {Math.trunc(item.price * 80 - (item.price * 80) / 10)}
                </p>
                <p className="fp_date">
                  Added on<b> {DateFormatter(item.date)}</b>
                </p>
              </div>
            </div>
            <div className="fp_btn_cover">
              <Button
                btnCont="Add to cart"
                size="large"
                custStyle="custStyle1"
                clickEvent={addToCart.bind(null, item)}
              />
              <Button
                btnCont="Remove"
                custStyle="custStyl2"
                clickEvent={removeFromFavs.bind(null, item.id)}
                size="medium"
              />
            </div>
          </div>
        ))
      );
  }
  return (
    <div className="fav_page">
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
      <h1 className="fp_page_title">Favourites</h1>
      {content}
      <Link to="/cart">
        <Button btnCont="Cart" size="large" />
      </Link>
    </div>
  );
};

export default FavouritesPage;
