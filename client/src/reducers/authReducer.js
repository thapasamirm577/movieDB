import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authActions";

const initialState = {
    message: "",
    error: "",
    loading: false,
    data: [], 
    token: ""
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        removeToken: (state,action)=>{
            state.token = "";
        },
        removeMessage: (state, action)=>{
            state.message = "";
        }
    },
    extraReducers:{
        [registerUser.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        [registerUser.pending]: (state,action)=>{
            state.loading = true;
        },
        [loginUser.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
            state.token = action.payload.token;
            if(action.payload.token){
                localStorage.setItem("userToken", action.payload.token);
            }
            if(action.payload.data){
                const email = action.payload.data.email;
                const name = action.payload.data.name;
                const role = action.payload.data.role;
                const _id = action.payload.data._id
                const userInfo =  { email, name, role, _id}
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
            }
            
        },
        [loginUser.pending]: (state,action)=>{
            state.loading = true;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;