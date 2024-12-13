import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart-slice";


const rootStore = configureStore({
    reducer: {
        cart: CartSlice.reducer
    }
});

export default rootStore;