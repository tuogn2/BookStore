import { URL } from "~/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const storeSlice = createSlice({
    name: 'Store',
    initialState: [],
    reducers: {
        clearStore: (state, action) => {
            return []
        },
        DeleteAItem: (state, action) => {
            const newProduct =state[0].products.filter((item) => {
                if (item.productID === action.payload) {
                    return false
                }
                return true
            })
            state[0].products =newProduct
            return state
        },
        AddAQuantity:(state,action)=>{
            const newProduct = state[0].products.map((item)=>{
                if (item.productID === action.payload) {
                    console.log('hi')
                    item.quantity+=1;
                }
                return item
            })
            state[0].products =newProduct
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getYourStore.pending, (state, action) => {
                return state
            })
            .addCase(getYourStore.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
            .addCase(addProduct.pending, (state, action) => {
                return state;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state = [action.payload]
                return state
            })
            .addCase(addProduct.rejected, (state, action) => {
                return state;
            })
    }
})


export default storeSlice;


export const getYourStore = createAsyncThunk('store/getYourStore', () => {
    return fetch(`${URL}/store/getcartofuser/${localStorage.id}`)
        .then(res => res.json())
        .then(value => value)
        .catch(err => err);
});


export const addProduct = createAsyncThunk('store/addProduct', (dispatch) => {
    return fetch(`${URL}/store/addcart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dispatch)
    })
        .then(res => res.json())
        .then(value => {
            return value
        })
        .catch(err => err);
});