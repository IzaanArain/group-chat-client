import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionOut: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //pending
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          switch (action.type) {
            default:
              state.isLoading = true;
              state.isError = false;
              console.log("Unknown action");
              break;
          }
        }
      )
      //fulfilled
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          switch (action.type) {
            case "signin/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] =
                action.payload.data.data.token;
              toast.success(`${action?.payload?.data?.message}`, {
                position: toast.POSITION.TOP_RIGHT,
              });
              break;
            default:
              console.log("Unknown action");
              break;
          }
        }
      )
      //rejected
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (action.payload.status == 400) {
            state.isError = true;
            console.error("error", action?.payload?.data?.message);
            toast.error(`${action?.payload?.data?.message}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            switch (action.type) {
              default:
                state.isError = true;
                console.log("Unknown action");
                break;
            }
          }
        }
      );
  },
});

export const { sessionOut } = authSlice.actions;
export default authSlice.reducer;
