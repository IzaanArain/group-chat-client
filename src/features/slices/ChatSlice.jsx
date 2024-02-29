import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isError: false,
    status: null,
    groups:[],
    chats: [],
    messages:[]
  };

  const groupChatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{},
    extraReducers:{}
  });

  export default groupChatSlice.reducer;