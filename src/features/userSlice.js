import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// appApi
import appApi from "../services/appApi";

const initialState = null;




export const userSlice = createSlice(
  {
    name: "products",
    initialState,
    reducers: {
      logout: () => initialState,
      addNotification: (state, action) => {
        state.notifications.unshift(action.payload);
      },
      resetNotifications: (state) => {
        state.notifications.forEach((obj) => {
          obj.status = "read";
        });
      },
    },
    extraReducers: (builder) => {
      builder.addMatcher(
        appApi.endpoints.signup.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.login.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.addToCart.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.removeFromCart.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.increaseCartProduct.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.decreaseCartProduct.matchFulfilled,
        (_, { payload }) => payload
      );
      builder.addMatcher(
        appApi.endpoints.createOrder.matchFulfilled,
        (_, { payload }) => payload
      );
    },
  },
  {
    name: "auth",
    initialState: { user: null },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
  },
  {
    nname: 'profile',
    initialState,
    reducers: {
        updateProfiles: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.updateProfile.matchFulfilled, (_, { payload }) => payload);
    },
  }
);
export const { logout, addNotification, setUser, clearUser, updateProfiles } =
  userSlice.actions;



export default userSlice.reducer;
