import { URL } from "~/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



const productsSlice = createSlice({
    name:'products',
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getproducts.pending,(state,action)=>{
            return state;
        })
        .addCase(getproducts.fulfilled,(state,action)=>{
            state = action.payload;
            return state
        })
    }
})

export default productsSlice;


export const getproducts = createAsyncThunk('products/getproducts',()=>{
    return fetch(`${URL}/product`)
        .then(res=>res.json())
        .then(value=> value)
        .catch(err=>err)
})