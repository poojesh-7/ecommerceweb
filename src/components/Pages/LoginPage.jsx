import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./LoginPage.css";
import Notification from "../utilities/Notification";
import StoreHook from "../../customHook/StoreHook";
import Button from "../ui/Button";
let firstTime = false;
const LoginPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(false);
  const userName = useRef(null);
  const userPassword = useRef(null);
  const userEmail = useRef(null);
  const [validDetails, setValidDetails] = useState({
    name: false,
    email: false,
    password: false,
  });
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  const switchToSignUp = () => {
    setNewUser((prev) => !prev);
    firstTime = false;
  };

  const submitHandler = (e) => {
    firstTime = true;
    e.preventDefault();
    const pass = userPassword.current.value;
    const email = userEmail.current.value;
    const name = newUser && userName.current.value;
    let isValidEmail = email.trim().includes("@");
    let isValidPassword = pass.trim() !== "" && pass.trim().length > 6;
    let isValidName = newUser && name.trim() !== "" && name.trim().length > 6;

    if (newUser) {
      if (isValidName && isValidEmail && isValidPassword) {
        const existedUser = localStorage.getItem("userEmail");

        if (existedUser === email) {
          dispatchFn("SET_NOTIFICATION", {
            message: "User Exists, switch to login",
            type: "yellow",
            show: true,
          });
        } else {
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("password", pass);
          localStorage.setItem("token", true);
          dispatchFn("LOGIN", true);

          dispatchFn("SET_NOTIFICATION", {
            message: "Successfully signed in",
            type: "green",
            show: true,
          });
          setTimeout(() => {
            navigate("address");
          }, 4000);
        }
      }
      // else {
      //   dispatchFn("SET_NOTIFICATION", {
      //     message: "Successfull",
      //     type: "green",
      //     show: true,
      //   });
      // }
    } else {
      if (isValidEmail && isValidPassword) {
        const existedUser = localStorage.getItem("userEmail");
        if (existedUser?.toLowerCase() === email) {
          dispatchFn("SET_NOTIFICATION", {
            message: "Successfully logged in",
            type: "green",
            show: true,
          });
          dispatchFn("LOGIN", true);
          localStorage.setItem("token", true);
          setTimeout(() => {
            navigate("address");
          }, 4000);
        } else {
          dispatchFn("SET_NOTIFICATION", {
            message: "User doesn't exist. Please Sign in",
            type: "red",
            show: true,
          });
        }
      }
    }
    setValidDetails({
      name: isValidName,
      email: isValidEmail,
      password: isValidPassword,
    });
  };
  console.log(state.login);
  return (
    <div className="login-page">
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
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h2>{newUser ? "SIGN UP" : "LOGIN"}</h2>
            <div className="underline-title"></div>
          </div>
          <form onSubmit={submitHandler} className="form">
            {newUser && (
              <>
                <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
                  &nbsp;Name
                  {firstTime && !validDetails.name && (
                    <p className="inp_error">{`Enter name of length > 6`}</p>
                  )}
                </label>
                <input
                  id="user-name"
                  className="form-content"
                  ref={userName}
                  name="name"
                  autoComplete="on"
                />
                <div className="form-border"></div>
              </>
            )}

            <label htmlFor="user-email" style={{ paddingTop: "13px" }}>
              &nbsp;Email{" "}
              {firstTime && !validDetails.email && (
                <p className="inp_error">invalid email</p>
              )}
            </label>
            <input
              id="user-email"
              className="form-content"
              ref={userEmail}
              type="email"
              name="email"
              autoComplete="on"
            />
            <div className="form-border"></div>

            <label htmlFor="user-password" style={{ paddingTop: "22px" }}>
              &nbsp;Password{" "}
              {firstTime && !validDetails.password && (
                <p className="inp_error">{`Enter password of length > 6`}</p>
              )}
            </label>
            <input
              id="user-password"
              className="form-content"
              ref={userPassword}
              type="password"
              name="password"
            />
            <div className="form-border"></div>

            {newUser || (
              <a href="#">
                <legend id="forgot-pass">Forgot password?</legend>
              </a>
            )}
            <input
              disabled={state.login}
              style={{ background: `${state.login ? "gray" : ""}` }}
              id="submit-btn"
              type="submit"
              name="submit"
              value={newUser ? "SIGN UP" : "LOGIN"}
            />
            <p onClick={switchToSignUp} id="signup">
              {newUser ? "Switch to login" : "Don't have account yet?"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
