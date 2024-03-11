import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  status: null,
  groups: [],
  chats: null,
  messages: [],
};

const groupChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (action, state) => {
          state.isLoading = true;
          state.isError = false;
          switch (action.type) {
            default:
              console.log("Unknown action/pending");
              break;
          }
        }
      )
      .addMatcher(
        (action) => {
          console.log(action.type);
          return action.type.endsWith("/fulfilled")
        },
        (state,action) => {
          state.isLoading = false;
          state.isError = false;
          state.status = null;
          switch (action.type) {
            case "initiateChat/fulfilled":
              state.chats = action.payload.data.data;
              break;
            default:
              console.log("Unknown action/fulfilled");
              break;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (action, state) => {
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

export default groupChatSlice.reducer;
