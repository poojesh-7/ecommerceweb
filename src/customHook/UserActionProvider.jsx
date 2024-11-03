import { initHook } from "./StoreHook";

export const UserActionProvider = () => {
  const actions = {
    ADD_TO_FAV: (state, action) => {
      const newFav = [...state.fav, action];

      return {
        fav: newFav,
        cart: state.cart,
      };
    },
    REMOVE_FROM_FAV: (state, action) => {
      const newFav = [...state.fav].filter((fav) => fav.id !== action);
      return {
        fav: newFav,

        cart: state.cart,
      };
    },
    ADD_TO_CART: (state, action) => {
      const newCart = [...state.cart, action];
      const newFav = [...state.fav].filter((fav) => fav.id !== action.id);
      return {
        fav: newFav,
        cart: newCart,
      };
    },
    REMOVE_FROM_CART: (state, action) => {
      const newCart = [...state.cart].filter((item) => item.id !== action);
      return {
        fav: state.fav,
        cart: newCart,
      };
    },
    INCREASE_QTY: (state, action) => {
      let itemIndex = [...state.cart].findIndex((item) => item.id === action);
      state.cart[itemIndex].qty = state.cart[itemIndex].qty + 1;
      return {
        fav: state.fav,
        cart: state.cart,
      };
    },
    DECREASE_QTY: (state, action) => {
      let itemIndex = [...state.cart].findIndex((item) => item.id === action);
      state.cart[itemIndex].qty = state.cart[itemIndex].qty - 1;

      return {
        fav: state.fav,
        cart: state.cart,
      };
    },
  };
  initHook({ fav: [], cart: [] }, actions);
};
