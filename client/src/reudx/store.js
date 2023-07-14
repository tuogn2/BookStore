import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/Auth/authSlice";
import inforSlice from "../pages/Auth/inforSlice";
import productsSlice from "~/pages/Detailproduct/productsSlice";
import storeSlice from "~/pages/Storeproduct/StoreSlice";
import CartSlice from "~/pages/Storeproduct/CartSlice";


const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        inforuser:inforSlice.reducer,
        products:productsSlice.reducer,
        store:storeSlice.reducer,
        cart:CartSlice.reducer
    }
})


export default store;