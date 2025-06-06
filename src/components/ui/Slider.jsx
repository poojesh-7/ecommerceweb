/* eslint-disable react/prop-types */
// import { Modal } from "bootstrap";
import "./Slider.css";
import ModalCover from "./Modal";
import StoreHook from "../../customHook/StoreHook";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const Slider = (props) => {
  const navigate = useNavigate();
  const state = StoreHook()[0];
  const dispathcFn = StoreHook(false)[1];
  const logout = (e) => {
    e.preventDefault();
    dispathcFn("LOGOUT", false);
    dispathcFn("CLOSE_SLIDER", false);
    localStorage.setItem("token", false);
    navigate("/");
  };

  return (
    <>
      <ModalCover></ModalCover>
      <div className={state.shouldShow ? "slider slide_open" : "slider"}>
        {props.children}
        {state.login && (
          <form onSubmit={logout}>
            <button className="logout_user_btn">Logout</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Slider;
