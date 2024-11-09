import { Link } from "react-router-dom";
import "./Error404.css";
import Button from "../ui/Button";
const Error404 = () => {
  return (
    <div className="error_page">
      <h1>Error </h1>
      <h3>Page not found</h3>
      <Link to="/">
        <Button btnCont="Home page" size="large" custStyle="home_nav_btn" />
      </Link>
    </div>
  );
};

export default Error404;
