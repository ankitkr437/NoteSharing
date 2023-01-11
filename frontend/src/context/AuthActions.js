
//userCredentials is that credentials entered by user in login form
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  

  //here user is that after fetching data from api
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload:error,
  });
  
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const SearchingNotes = (searchedvalue) => ({
  type: "SEARCHING_NOTES",
  payload: searchedvalue,
});