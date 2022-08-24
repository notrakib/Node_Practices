import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedin: +new Date() < localStorage.getItem("logoutTime") ? true : false,
  token: localStorage.getItem("token"),
  logoutTime: localStorage.getItem("logoutTime"),
};

const SigninSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("logoutTime", action.payload.logoutTime);
      state.signedin = true;
      state.token = localStorage.getItem("token");
      state.logoutTime = localStorage.getItem("expiresIn");
    },
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("logoutTime");
      state.signedin = false;
      state.token = null;
      state.logoutTime = null;
    },
  },
});

export const signedinAction = SigninSlice.actions;
export default SigninSlice.reducer;
