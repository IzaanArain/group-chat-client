import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  status: null,
  groups: [],
  chats: [],
  messages: [],
};

const groupChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher (
        (action) => action.type.endsWith("/pending"),
        (state,action) => {
          state.isLoading = true;
          state.isError = false;
          switch (action.type) {
            default:
              // console.log("Unknown action/pending");
              break;
          }
        }
      )
      .addMatcher (
        (action) => {
          return action.type.endsWith("/fulfilled")
        },
        (state,action) => {
          state.isLoading = false;
          state.isError = false;
          state.status = null;
          switch (action.type) {
            case "initiateChat/fulfilled":
             const chatIds=state.chats.map((chat)=>chat._id);
             const chat=action.payload.data.data
             if(!chatIds.includes(chat._id)){
              state.chats.push(action.payload.data.data);
             }
              break;
            case "getAllChats/fulfilled":
              state.chats = action.payload.data.data.chats
              break;
            default:
              // console.log("Unknown action/fulfilled");
              break;
          }
        }
      )
      .addMatcher (
        (action) => action.type.endsWith("/rejected"),
        (state,action) => {
          state.isError = true;
          state.isLoading = false;
          if (action.payload.status == 401) {
            state.status = action.payload.status;
          } else {
            switch (action.type) {
              default:
                // console.log("Unknown action/rejected");
                break;
            }
          }
        }
      );
  },
});
    
export const getChatList = (state)=>state?.chat?.chats
export default groupChatSlice.reducer;
