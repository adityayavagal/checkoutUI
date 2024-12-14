import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  progress: "",
  couponData: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    resetCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.progress = "CART"
    },
    closeCart: (state) => {
      state.progress = "";
    },
    openCheckout: (state) => {
      state.progress = "CHECKOUT";
    },
    closeCheckout: (state) => {
      state.progress = "";
    },
    applyCoupon: (state, action) => {
      state.couponData = action.payload.couponData;
    }
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
