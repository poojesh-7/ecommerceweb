import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Hamburger from "../ui/Hamburger";
import Slider from "../ui/Slider";
import StoreHook from "../../customHook/StoreHook";
const navNames = [
  { name: "Home", address: "" },
  { name: "Favourites", address: "fav" },
  { name: "Cart", address: "cart" },
  { name: "Login", address: "login" },
  { name: "Profile", address: "profile" },
];
const Navigation = () => {
  const state = StoreHook()[0];
  const dispatchFn = StoreHook(false)[1];
  const showSlider = () => {
    dispatchFn("OPEN_SLIDER", true);
    if (state.shouldShow) {
      dispatchFn("CLOSE_SLIDER", false);
    }
  };
  let updatedNavNames = [...navNames];
  if (state.login) {
    updatedNavNames = updatedNavNames.filter(
      (navName) => navName.name !== "Login"
    );
  } else {
    updatedNavNames = updatedNavNames.filter(
      (navName) => navName.name !== "Profile"
    );
  }
  const displayNavLinks = updatedNavNames.map((navLink) => (
    <NavLink
      key={navLink.name}
      className={({ isActive }) => (isActive ? "nav act" : "nav")}
      to={navLink.address}
    >
      <div onClick={showSlider} className="nav_p">
        <p>{navLink.name}</p>
        <div className="nav_line"></div>
      </div>
    </NavLink>
  ));
  return (
    <>
      <div className="navigation">
        <img
          src="https://i.ibb.co/x3VrLkP/bag.png"
          alt="bag"
          border="0"
          className="logo"
        />
        <Hamburger />
      </div>
      <Slider>{displayNavLinks}</Slider>
    </>
  );
};

export default Navigation;
