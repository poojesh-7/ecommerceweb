import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import "./AddressFormPage.css";
let firstTime = true;
const AddressFormPage = () => {
  const navigate = useNavigate();
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const zipRef = useRef(null);
  const countryRef = useRef(null);
  const mobNoRef = useRef(null);
  const [validInputs, setValidInputs] = useState({
    "street/apartment": false,
    city: false,
    "zip code": false,
    "mobile no": false,
  });
  const details = [
    {
      name: "street/apartment",
      errorText: "Enter Valid street name, char length > 10",
      type: "text",
      refVal: streetRef,
    },
    {
      name: "city",
      errorText: "Enter valid city name",
      type: "text",
      refVal: cityRef,
    },
    {
      name: "zip code",
      errorText: "Enter valid Pincode (560065)",
      type: "number",
      refVal: zipRef,
    },
    { name: "country", val: "India", refVal: countryRef },
    {
      name: "mobile no",
      errorText: "Enter valid Phone number (3472324322)",
      type: "number",
      refVal: mobNoRef,
    },
  ];

  const content = details.map((detail, i) => (
    <div className="address_item_inp_lab" key={i}>
      <label>{detail.name}</label>
      <input
        defaultValue={detail.val}
        disabled={detail.val === "India"}
        ref={detail.refVal ? detail.refVal : ""}
        type={detail.type}
        placeholder={detail.name}
      />
      <p className="input_error">
        {!firstTime && !validInputs[detail.name] && detail.errorText}
      </p>
    </div>
  ));
  const submitHandler = (e) => {
    e.preventDefault();
    firstTime = false;
    const street = streetRef.current.value;
    const city = cityRef.current.value;
    const zip = zipRef.current.value;
    const mob = mobNoRef.current.value;
    const isValidStreet = street.trim().length > 10;
    const isValidCity = city.trim().length > 5;
    const isValidZip = typeof +zip === "number" && zip.trim().length === 6;
    const isValidMob = typeof +mob === "number" && mob.trim().length === 10;
    setValidInputs({
      "street/apartment": isValidStreet,
      city: isValidCity,
      "zip code": isValidZip,
      "mobile no": isValidMob,
    });

    if (isValidStreet && isValidCity && isValidZip && isValidMob) {
      navigate("/checkout");
      localStorage.setItem("userAddress", `${street}, ${city}, ${zip}`);
      localStorage.setItem("userMobno", +mob);
    }
  };
  return (
    <div className="address_page">
      <h1>Address</h1>
      <form onSubmit={submitHandler} className="address_input_holder">
        {content}
        <Button btnCont="Save" size="medium" custStyle="address_sub_btn" />
      </form>
    </div>
  );
};

export default AddressFormPage;
