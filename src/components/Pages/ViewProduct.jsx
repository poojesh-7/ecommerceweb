import "./ViewProduct.css";
import { Link, Outlet, useParams } from "react-router-dom";
import HttpHook from "../../customHook/HttpHook";
import Button from "../ui/Button";
import { fetchProducts, fetchSingleProduct } from "../../customHook/Api";
import { useEffect, useState } from "react";
import Comments from "../utilities/Comments";
import SimilarProducts from "../utilities/SimilarProducts";
import StoreHook from "../../customHook/StoreHook";
import Notification from "../utilities/Notification";
import Loader from "../ui/Loader";
const sizesClothes = ["S", "M", "L"];
const sizesElectronics = ["256 GB", "512 GB", "1 TB"];
const ViewProduct = () => {
  const { id } = useParams();

  const { status, data, error, sendReq } = HttpHook(fetchSingleProduct, id);

  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  // const addedToFav = () => {};
  useEffect(() => {
    // setTimeout(() => {
    // }, 1000);
    sendReq();
  }, [sendReq]);
  let content;
  let availableOptions = [];
  let availableColors = [];
  const addToFavs = (item) => {
    dispatchFn("ADD_TO_FAV", { ...item, isFav: true, date: new Date() });
    dispatchFn("SET_NOTIFICATION", {
      message: "Added to Favourites",
      type: "green",
      show: true,
    });
  };
  const addToCart = (item) => {
    dispatchFn("ADD_TO_CART", {
      ...item,
      isInCart: true,
      isFav: false,
      date: new Date(),
    });
    dispatchFn("REMOVE_FROM_FAV", item.id);
    dispatchFn("SET_NOTIFICATION", {
      message: "Added to cart",
      type: "green",
      show: true,
    });
  };

  let isInFavorites;
  let isInCart;
  if (status === "pending") {
    return <Loader />;
  }
  if (data !== null) {
    isInFavorites = state?.fav.findIndex((fav) => fav.id === data.id);
    isInCart = state?.cart.findIndex((cartItem) => cartItem.id === data.id);
    content = (
      <div className="vp_cover">
        <div className="vp_image_cover">
          <img src={data.image} className="vp_image" />
        </div>
        <div className="vp_content">
          <h1 className="vp_title">{data.title}</h1>
          <p className="vp_rating">
            <b>{data.rating.rate}</b>
            <img
              src="https://i.ibb.co/b1Xgj7W/star.png"
              alt="star"
              className="pc_star"
              style={{ width: "20px", height: "20px" }}
            />
          </p>
          <p className="vp_price">
            <b className="vp_price_1">Price : </b>₹{" "}
            <del>{Math.trunc(data.price * 80)}</del>
          </p>
          <div className="deal">
            <p>10 % off on first orders</p>
          </div>
          <p className="vp_discount">
            ₹ {Math.trunc(data.price * 80 - (data.price * 80) / 10)}
          </p>

          <div className="seperate_line"></div>
          <h2>Description</h2>
          <p className="vp_description">{data.description}</p>
        </div>
      </div>
    );
    if (data.category.includes("clothing")) {
      availableOptions = sizesClothes;
      availableColors = [
        { color: "Red", hex: "#ff0000" },
        { color: "Green", hex: "#00ff00 " },
        { color: "Blue", hex: "#0000ff" },
        { color: "Orange", hex: "#ffA500" },
      ];
    } else if (data?.category === "electronics") {
      availableOptions = sizesElectronics;
    } else {
      availableOptions = [];
    }
  }

  return (
    <>
      {status === "pending" ? (
        <p>load</p>
      ) : (
        <div className="view_product_page">
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
          <button
            onClick={addToFavs.bind(null, data)}
            className={
              isInFavorites === -1
                ? "heart_btn"
                : "heart_btn  heart_btn_clicked"
            }
            // className={"heart_btn"}
            disabled={isInCart !== -1 || isInFavorites !== -1 ? true : false}
          ></button>
          {content}
          <Button
            btnCont={isInCart !== -1 ? "Added to cart" : "Add to cart"}
            size="large"
            clickEvent={addToCart.bind(null, data)}
            isdisabled={isInCart !== -1 ? true : false}
          />
          {data.category !== "jewelery" && (
            <div className="modifications">
              {
                <div className="sizes">
                  <div className="mydict">
                    {availableOptions?.map((availOpt) => (
                      <label key={availOpt}>
                        <input type="radio" name="radio" />
                        <span>{availOpt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              }
              {
                <div className="colors">
                  <div className="mydict">
                    {availableColors?.map((availCol) => (
                      <label key={availCol.color}>
                        <input type="radio" name="color" />
                        <span className="lable_spec">
                          {availCol.color}
                          <div
                            style={{
                              position: "absolute",
                              right: "43%",
                              top: 0,
                              float: "top",
                              marginTop: "4px",
                              borderRadius: "50%",
                              width: "15px",
                              height: "15px",
                              backgroundColor: `${availCol.hex}`,
                            }}
                          ></div>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              }
            </div>
          )}

          <div className="comments_similarProducts">
            <Comments rating={data?.rating.rate} />
            <SimilarProducts
              id={parseInt(id) === 4 ? parseInt(id) - 1 : parseInt(id) + 1}
              // id={Math.trunc(Math.random() * 3 + 1) + 1}
              // category={data?.category}
              // productTitle={data?.title}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
