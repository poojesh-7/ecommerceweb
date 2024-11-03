/* eslint-disable react/prop-types */
import StoreHook from "../../customHook/StoreHook";
import "./Hamburger.css";
const Hamburger = () => {
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  const showSlider = () => {
    dispatchFn("OPEN_SLIDER", true);
    if (state.shouldShow) {
      dispatchFn("CLOSE_SLIDER", false);
    }
  };
  return (
    <button onClick={showSlider} className="hamburger">
      <div className={state.shouldShow ? "ham ham_l1_t" : "ham ham_l1"}></div>
      <div className={state.shouldShow ? "ham ham_l2_t" : "ham ham_l2"}></div>
      <div className={state.shouldShow ? "ham ham_l3_t" : "ham ham_l3"}></div>
    </button>
  );
};

export default Hamburger;
