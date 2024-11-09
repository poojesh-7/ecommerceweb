import { initHook } from "./StoreHook";

const NotificationProvider = () => {
  const actions = {
    SET_NOTIFICATION: (curState, payload) => {
      // console.log(payload.type);
      const newNotiState = {
        message: payload.message,
        type: payload.type,
        show: payload.show,
      };
      return {
        notiState: newNotiState,
        login: curState.login,
      };
    },
    UNDO_NOTIFICATION: (curState, payload) => {
      const newNotiState = {
        message: null,
        type: null,
        show: false,
      };
      return {
        notiState: newNotiState,
        login: curState.login,
      };
    },
    LOGIN: (curState, payload) => {
      const userLog = payload;
      return {
        notiState: curState.notiState,
        login: userLog,
      };
    },
    LOGOUT: (curState, payload) => {
      const userLog = payload;
      console.log(payload);
      return {
        notiState: curState.notiState,
        login: userLog,
      };
    },
  };
  initHook(
    { notiState: { message: null, type: null, show: false }, login: false },
    actions
  );
};
export default NotificationProvider;
