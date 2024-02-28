import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  status: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionOut: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.status = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //pending
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.isLoading = true;
          state.isError = false;
          switch (action.type) {
            default:
              console.log("Unknown action/pending");
              break;
          }
        }
      )
      //fulfilled
      .addMatcher(
        (action) => {
          console.log(action.type);
          return action.type.endsWith("/fulfilled")
        },
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.status = null;
          switch (action.type) {
            case "signin/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common['Authorization'] = action.payload.data.data.token;
              break;
            case "completeProfile/fulfilled":
              state.user = action.payload.data.data;
              break;
            default:
              console.log("Unknown action/fulfilled");
              break;
          }
        }
      )
      //rejected
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isError = true;
          state.isLoading = false;
          if (action.payload.status == 401) {
            state.status = action.payload.status;
          } else {
            switch (action.type) {
              default:
                console.log("Unknown action/rejected");
                break;
            }
          }
        }
      );
  },
});

export const getUser = (state) => state?.auth?.user;
export const getUserStatus = (state) => state?.auth?.status;
export const { sessionOut } = authSlice.actions;
export default authSlice.reducer;
