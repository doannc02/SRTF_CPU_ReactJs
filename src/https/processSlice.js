import { createSlice } from "@reduxjs/toolkit";

const process = createSlice({
    name: "process",
    initialState:{
        listPro:{
            pro: []
        }

    },
    reducers:{
        fetchApiSucess : (state, action) =>{
            state.listPro.pro = action.payload
        }
    }
})

export const {
    fetchApiSucess
} = process.actions

export default process.reducer