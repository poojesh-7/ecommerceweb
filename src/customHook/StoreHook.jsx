import { useCallback, useEffect, useState } from "react";

let actions = {};
let listeners = [];
let globalState = {};

const StoreHook = (isSubscriber = true) => {
  const setState = useState(globalState)[1];
  const dispatchFn = useCallback((actionFn, payload) => {
    const newState = actions[actionFn](globalState, payload);
    globalState = { ...globalState, ...newState };
    for (let listener of listeners) {
      // if (isSubscriber) {
      // }
      listener(globalState);
    }
  }, []);
  useEffect(() => {
    if (isSubscriber) {
      listeners.push(setState);
    }

    return () => {
      if (isSubscriber) {
        listeners = listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState]);
  return [globalState, dispatchFn];
};

export default StoreHook;

export const initHook = (initialState, userActions) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
