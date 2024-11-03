// import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import RootLayout from "./components/Pages/RootLayout";
import ProductsPage from "./components/Pages/ProductsPage";
import ViewProduct from "./components/Pages/ViewProduct";
import FavouritesPage from "./components/Pages/FavouritesPage";
import CartPage from "./components/Pages/CartPage";
import AddressFormPage from "./components/utilities/AddressFormPage";
import LoginPage from "./components/Pages/LoginPage";
import SummaryPage from "./components/Pages/SummaryPage";
import Error404 from "./components/utilities/Error404";
import StoreHook from "./customHook/StoreHook";
import ProfilePage from "./components/Pages/ProfilePage";
// import SimilarProducts from "./components/utilities/SimilarProducts";
// const RootLayout = lazy(() => import("./components/Pages/RootLayout"));
// const ProductsPage = lazy(() => import("./components/Pages/ProductsPage"));
// const ViewProduct = lazy(() => import("./components/Pages/ViewProduct"));
// const FavouritesPage = lazy(() => import("./components/Pages/FavouritesPage"));
// const CartPage = lazy(() => import("./components/Pages/CartPage"));
// const LoginPage = lazy(() => import("./components/Pages/LoginPage"));
// const AddressFormPage = lazy(() =>
//   import("./components/utilities/AddressFormPage")
// );
// const SummaryPage = lazy(() => import("./components/Pages/SummaryPage"));
// const Error404 = lazy(() => import("./components/utilities/Error404"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <ProductsPage /> },
      {
        path: ":id",
        element: <ViewProduct />,
      },
      { path: "/fav", element: <FavouritesPage /> },
      { path: "/cart", element: <CartPage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      { path: "/login/address", element: <AddressFormPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/checkout", element: <SummaryPage /> },
    ],
  },
]);
function App() {
  const dispatchFn = StoreHook(false)[1];
  let userLogin = localStorage.getItem("token");
  window.addEventListener("load", () => {
    if (userLogin) {
      dispatchFn("LOGIN", true);
    } else {
      dispatchFn("LOGOUT", false);
    }
  });
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
