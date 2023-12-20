import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const secretKey = "hari123";

const getUserInfo = () => {
  const encryptedUserInfo = localStorage.getItem("userInfo");
  if (!encryptedUserInfo) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(encryptedUserInfo, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

const initialState = {
  userInfo: getUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(
        "userInfo",
        CryptoJS.AES.encrypt(
          JSON.stringify(action.payload),
          secretKey
        ).toString()
      );
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
