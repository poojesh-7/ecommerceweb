/* eslint-disable react/prop-types */
import "./Button.css";
const Button = (props) => {
  const { size, btnCont, clickEvent, isdisabled, custStyle = "" } = props;

  return (
    <button
      disabled={isdisabled}
      onClick={clickEvent}
      className={"cust_btn " + size + " " + custStyle}
    >
      {btnCont || props.children}
    </button>
  );
};
export default Button;
