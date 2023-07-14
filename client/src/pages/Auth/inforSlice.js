
import { createSlice } from "@reduxjs/toolkit";

const inforSlice = createSlice({
    name: 'inforuser',
    initialState: {
        state: false,
        infor: {}
    },
    reducers: {
        login: (state, acction) => {
            const infor = acction.payload
            const { password, ...newinfor } = infor
            return { state: true, infor: newinfor };
        },
        logout: (state, acction) => {
            localStorage.clear();
            return {
                state: false,
                infor: {}
            }
        }
    }
})


export default inforSlice;