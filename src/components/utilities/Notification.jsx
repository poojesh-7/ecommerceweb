/* eslint-disable react/prop-types */
import "./Notification.css";
import StoreHook from "../../customHook/StoreHook";
import { useEffect } from "react";
let firstTime = true;
const Notification = () => {
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  // if (firstTime) {
  //   firstTime = false;
  // } else {
  // }
  useEffect(() => {
    setTimeout(() => {
      dispatchFn("UNDO_NOTIFICATION");
    }, 4000);
  }, []);
  // console.log("yo");
  return (
    <div
      // className={  "n_card n_card_slide" : "n_card"}
      className="n_card"
      style={{
        backgroundColor: `${
          state.notiState.type === "red" ? "rgb(254, 61, 61)" : "lightgreen"
        }`,
      }}
    >
      <p>{state.notiState.message}</p>
    </div>
  );
};

export default Notification;
