
const { createSlice } = require("@reduxjs/toolkit");


const CartSlice = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        getCart: (state, action) => {
            state = action.payload
            return state
        },
        CheckAllCart: (state, action) => {

            return state.map((product) => {
                return {
                    ...product,
                    isCheck: true,
                };
            })
        },
        NotCheckAllCart: (state, action) => {

            return state.map((product) => {
                return {
                    ...product,
                    isCheck: false,
                };
            })
        },
        CheckAProduct: (state, action) => {

            return state.map((product) => {

                if (product.product._id === action.payload.id) {
                    return {
                        ...product,
                        isCheck: action.payload.isCheck
                    }
                }
                return product;
            })
        },
        DeleteProduct: (state, action) => {

            const NewState = state.filter((product) => {
                if (product.product._id === action.payload) {
                    return false
                }
                return true;
            })
            return NewState
        },
        DeleteCart: (state, action) => {
            return []
        },
        AddQuantity: (state, action) => {
            const newState = state.map((item) => {
                if (item.product._id === action.payload) {
                    item.quantitys += 1;
                }
                return item
            })
            return newState
        },
        MinusQuantity: (state, action) => {
            const newState = state.map((item) => {
                if (item.product._id === action.payload) {
                    item.quantitys -= 1;
                }
                return item
            })
            return newState
        }
    }
})


export default CartSlice;


