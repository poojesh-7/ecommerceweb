import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.status === "pending") {
    return {
      ...state,
    };
  }
  if (action.status === "complete") {
    return {
      status: action.status,
      data: action.httpData,
      error: null,
    };
  }
  if (action.status === "error") {
    return {
      status: "complete",
      data: null,
      error: action.errorData,
    };
  }
};
const HttpHook = (reqFn, payload, query, filter) => {
  const [httpState, dispatchFn] = useReducer(httpReducer, {
    status: "pending",
    data: null,
    error: null,
  });
  const sendReq = useCallback(async () => {
    dispatchFn({ status: "pending", data: null, error: null });
    try {
      const data = await reqFn(payload, query, filter);

      dispatchFn({ status: "complete", httpData: data, error: null });
    } catch (e) {
      dispatchFn({ status: "error", data: null, errorData: e });
    }
  }, [reqFn, payload, query, filter]);
  return { ...httpState, sendReq };
};

export default HttpHook;
