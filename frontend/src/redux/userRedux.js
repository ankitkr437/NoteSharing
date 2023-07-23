import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    searchedValue:null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error=false;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
    },
   registerStart: (state) => {
      state.isFetching = true;
    },
   registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error=false;
    },
   registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   logout: (state) => {
      state.currentUser=null;
    },
    search:(state,action)=>{
      state.searchedValue=action.payload;
    },
    follow:(state,action)=>{
        state.currentUser.followings=[...state.currentUser.followings, action.payload]
    },
    unFollow:(state,action)=>{
    
      state.currentUser.followings= state.currentUser.followings.filter(
              (following) => following !== action.payload);
        
    }
  },
});

export const { registerStart, registerSuccess, registerFailure,loginStart, loginSuccess, loginFailure,logout,search,follow,unFollow} = userSlice.actions;
export default userSlice.reducer;