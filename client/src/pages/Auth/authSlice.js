import { createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:true,
    reducers:{
        arowlogin:(state,acction)=>{
            return true;
        },
        arowlogout:(state,acction)=>{
            return false;
        }
    }
})


export default authSlice;