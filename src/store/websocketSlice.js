// NOT USING THIS FILE --

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wsURL } from "../apis.constants";

export const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    ws: null,
  },
  reducers: {
    connectWS: (state) => {
      state.ws = new WebSocket(wsURL);

      state.ws.onopen = (e) => {
        console.log("WebSocket Connected", e);
      };
    },
    subscribe: (state, action) => {
      console.log(action.payload?.event_code);
      const request = {
        method: "subscribe",
        events: ["MK"],
      };

      state.ws.send(JSON.stringify(request));

      state.ws.onmessage = (e) => {
        const { data } = JSON.parse(e.data);
        console.log(data);
      };
    },
  },
});

export const subscribeThunk = createAsyncThunk("DS", (_, thunkAPI) => {
  // console.log(action.payload?.event_code);
  const state = thunkAPI.getState();
  console.log(state.ws);

  const request = {
    method: "subscribe",
    events: ["MK"],
  };

  state.ws.send(JSON.stringify(request));

  state.ws.onmessage = (e) => {
    const { data } = JSON.parse(e.data);
    console.log(data);
  };

  // const request = {
  //   method: "subscribe",
  //   events: ["MK"],
  // };

  // state.ws.send(JSON.stringify(request));

  // state.ws.onmessage = (e) => {
  //   const { data } = JSON.parse(e.data);
  //   console.log(data);
  //   // thunkAPI.dispatch(
  //   //   setDataInChannel({ channelName: "Markets", channelData: data })
  //   // );
  // };
});

export const { connectWS, subscribe } = websocketSlice.actions;

export const selectWS = (state) => state.ws.ws;

export default websocketSlice.reducer;
