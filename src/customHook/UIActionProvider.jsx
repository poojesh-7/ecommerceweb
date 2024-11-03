import { initHook } from "./StoreHook";

const UIActionProvider = () => {
  const actions = {
    OPEN_SLIDER: (_, payload) => {
      return {
        shouldShow: payload,
      };
    },
    CLOSE_SLIDER: (_, payload) => {
      return {
        shouldShow: payload,
      };
    },
  };
  initHook({ shouldShow: false }, actions);
};

export default UIActionProvider;
