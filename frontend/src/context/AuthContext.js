import { createContext, useEffect, useReducer } from "react";
import AuthReducer from './AuthReducer.js';
import Searchreducer from './Searchreducer.js';
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) ||null,
  isFetching: false,
  error: false, 
};

const  searched_intial_state={
  searchedvalue:"",
  issearched:false,
}
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [searchedstate,searchdispatch] =useReducer(Searchreducer,searched_intial_state);
    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    
    return (
        <AuthContext.Provider
          value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            searchedvalue:searchedstate.searchedvalue,
            issearched:searchedstate.issearched,
            searchdispatch,
            dispatch,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
};