import { configureStore } from "@reduxjs/toolkit";
import processSlice from "./processSlice";
export default configureStore({
    reducer:{
        process: processSlice,
    }
})