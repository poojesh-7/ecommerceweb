/* eslint-disable react/prop-types */

import "./Modal.css";
import StoreHook from "../../customHook/StoreHook";
const ModalCover = (props) => {
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  const showSlider = () => {
    dispatchFn("OPEN_SLIDER", true);
    if (state.shouldShow) {
      dispatchFn("CLOSE_SLIDER", false);
    }
  };
  return (
    <div
      onClick={showSlider}
      className={state.shouldShow ? "modal_cover m_open" : "modal_cover"}
    >
      {props.children}
    </div>
  );
};

export default ModalCover;
