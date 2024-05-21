import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var initialState = {
    loader:false
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader: (state) => {
            return{
                ...state,
                loader: true
            }
        },
        resetLoader: (state) => {
            return{
                ...state,
                loader:false
            }
        },
    }
})

export const {setLoader, resetLoader} = loaderSlice.actions

export default loaderSlice