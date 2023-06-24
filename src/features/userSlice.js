import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi, { useUpdateProfileMutation } from "../services/appApi";

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
    name: "user",
    initialState: { name: "", email: "", photoURL: "" },
    reducers: {
      updateProfile: (state, action) => {
        const { name, email, photoURL } = action.payload;
        state.name = name;
        state.email = email;
        state.photoURL = photoURL;
      },
    },
  }
);
export const {
  logout,
  addNotification,
  resetNotifications,
  updateProfile,
  setUser,
  clearUser,
} = userSlice.actions;


export const updateProfileAsync = (body) => async (dispatch) => {
    try {
      const { data } = await useUpdateProfileMutation(body);
      dispatch(updateProfile(data));
    } catch (error) {
      console.error(error);
    }
  };

export default userSlice.reducer;
