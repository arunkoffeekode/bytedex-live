import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openOrders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOpenOrders(state, action) {
      state.openOrders = action.payload;
    },
  },
});

export const { setOpenOrders } = orderSlice.actions;
export default orderSlice.reducer;
export const selectOpenOrders = (state) => state.orders.openOrders;
