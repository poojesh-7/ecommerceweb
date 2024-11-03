import { Outlet } from "react-router-dom";
import Navigation from "../utilities/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navigation></Navigation>
      <Outlet />
    </>
  );
};

export default RootLayout;
