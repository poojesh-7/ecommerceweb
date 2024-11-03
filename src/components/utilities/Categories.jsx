/* eslint-disable react/prop-types */
import "./Categories.css";

let categories = [
  {
    id: "all_1",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: "all_2",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: "all_3",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },
  {
    id: "all_4",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  },
  {
    id: "all_5",
    category: "all",
    image: "https://i.ibb.co/Vx60R3s/all.png",
    class: "img_spc",
  },
];
const Categories = ({ getCategory }) => {
  // categories =
  //   data?.filter(
  //     (val, i, self) => i === self.findIndex((v) => v.category === val.category)
  //   ) || [];
  // categories = [
  //   ...categories,

  //   {
  //     id: "all_5",
  //     category: "all",
  //     image: "https://i.ibb.co/Vx60R3s/all.png",
  //     class: "img_spc",
  //   },
  // ];
  // console.log(categories);
  const content = categories?.map((cat) => (
    <button
      onClick={getCategory.bind(null, cat.category)}
      className="cat_btn"
      key={cat.id}
    >
      {/* <div className="cat"> */}
      <div className="cat_img_cover">
        <img className={cat.class ? "img_spc" : "cat_img"} src={cat.image} />
      </div>
      <p className="cat_name">{cat.category}</p>
      {/* </div> */}
    </button>
  ));
  return <div className="cat_holder">{content}</div>;
};

export default Categories;
